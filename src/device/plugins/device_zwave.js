"use strict";
import EventEmitter from 'events'; 

import Device from '../device';
import Service from '../service';
import Characteristic from '../characteristic';
import {Formats,Perms,Status,Units,CharacteristicEventTypes,DeviceEventTypes} from '../../cst'
import check from 'check-types';
import Ajv 		from 'ajv';

//import zData from '../zData.json';
import zMap  from './defaultmap.json'

//var OpenZWave = require('openzwave-shared');

const TAG='deviceZwave';
const VERSION='0.13';


import ZWAVE_SERVICE_CX_MAP from './mapschema.json';


const log =require( '../../../logger');


var ZWave = require('openzwave-shared');
var os = require('os');

class device_zwave extends EventEmitter{

	static tag=TAG
	static version=VERSION

	constructor (config,ctrl,callback){
		super();
		this.tag=TAG;		
		
		this._ctrl=ctrl;
		this.config=config;

		this.status=Status.NONE;
		this.devices=[];
		this.zvalueCxMap={};
		this.zwaveNetworkId=undefined;
		this.zwave=undefined;
		
		this.nodes = [];

		log.info("lss, zwave connecting to %s",config.zwave.SerialPort);
		
		//
		// RETURN
		//

		callback(null,this,this.devices);
		return;


		this.initZwaveStack()

		//Check the Mapping
		let ajv = new Ajv({allErrors: true});
	
		if (ajv.validate(ZWAVE_SERVICE_CX_MAP, zMap)==false){
			log.error(TAG+"Map Json is not validated by the schema");
		}
		// Last Method to Call when everything is ready
		callback(null,this,this.devices);
	}


	initZwaveStack(){

		this.zwave = new ZWave({
  		Logging: this.config.zwave.Logging,	
			SaveConfiguration: this.config.zwave.saveConfiguration,
			DriverMaxAttempts: this.config.zwave.driverMaxAttempts,
			PollInterval: this.config.zwave.pollInterval,
			/*	SuppressValueRefresh: config.zwave.SuppressValueRefresh,*/
			ConsoleOutput:this.config.zwave.consoleOutput,
			UserPath:this.config.zwave.userPath,
			NetworkKey:this.config.zwave.networkKey,
			RetryTimeout:this.config.zwave.retryTimeout
		});

		this.zwave.connect(this.config.zwave.serialPort);

		this.zwave.on('node added', function(nodeId) {
	  	log.info(TAG+" zwave node added %d",nodeId);

	  	this.nodes[nodeId]={};
	  	this.nodes[nodeId]._id=nodeId;
	  	this.nodes[nodeId].props={};
	  	this.nodes[nodeId].props._id=nodeId;
	  	this.nodes[nodeId].classes={};


		}.bind(this));
		
		this.zwave.on('node naming',function(nodeId,nodeInfo){
			for (let key in nodeInfo){
				this.nodes[nodeId].props[key]=nodeInfo[key];
			}

			if (this.nodes[nodeId].props['name']=='' ||this.nodes[nodeId].props['name']==undefined )
				this.nodes[nodeId].props['name']='node '+nodeId
		}.bind(this));

		this.zwave.on('value added', function(nodeId, comClass, value) {
		
			if (this.nodes[nodeId]==undefined)
				this.nodes[nodeId]={};
		
			if (!this.nodes[nodeId].classes[comClass])
	  		this.nodes[nodeId].classes[comClass] = {};
		
	  	let valueId=nodeId+"-"+comClass+"-"+value.instance+"-"+value.index;
	  	value['isValueTrusted']=false;
	  	this.nodes[nodeId].classes[comClass][valueId]=value;

		}.bind(this));

		this.zwave.on('node ready', function( nodeId, nodeInfo) {
			for (let key in nodeInfo){
				this.nodes[nodeId].props[key]=nodeInfo[key];
			}

			if (this.nodes[nodeId].props['name']=='' || this.nodes[nodeId].props['name']==undefined )
				this.nodes[nodeId].props['name']='node '+nodeId

			log.info('lss, zwave =================== NODE READY! ====================');

			log.info('lss, zwave node ready: node'+ nodeId);
			//console.log(this.nodes[nodeId]);
			this.processZdata(this.nodes[nodeId]);
			this.zwave.writeConfig();
		}.bind(this))

		this.zwave.on('node event', function(nodeid, data) {
	  	log.info('lss, zwave node%d event: Basic set %d', nodeid, data);
		}.bind(this));

		this.zwave.on('notification', function(nodeid, notif, help) {
			log.info('lss, zwave node%d: notification(%d): %s', nodeid, notif, help);
		});

		this.zwave.on('connected', function(homeid) {
			log.info('lss, zwave =================== CONNECTED! ====================');
		}.bind(this));

		this.zwave.on('driver ready', function(homeid) {
			this.status=Status.READY;
			log.info('lss, zwave =================== DRIVER READY! ====================');
			this.zwaveNetworkId=homeid;
		}.bind(this));

		this.zwave.on('notification', function(nodeid, notif, help) {
			log.info('lss, zwave node%d: notification(%d): %s', nodeid, notif, help);
		}.bind(this));

		this.zwave.on('scan complete', function() {
			log.info('lss, zwave =================== ZWAVE SCAN COMPLETE! ====================');
			this.status=Status.COMPLETED
			this.zwave.writeConfig();

		}.bind(this));

		this.zwave.on('value changed', function(nodeId, comClass, value) {
	 		log.info(TAG+" zwave notfication value changed nodeId:"+nodeId+" comClass:"+comClass+" value:"+value.value);
	 		//return;
	 		try{
		 		if (this.nodes[nodeId] && this.status==Status.COMPLETED){

		    	let valueId=nodeId+'-'+comClass+'-'+value.instance+'-'+value.index;
		    	
		    	console.log(valueId);

		    	this.nodes[nodeId].classes[comClass][valueId].oldValue=this.nodes[nodeId].classes[comClass][valueId].value
		      this.nodes[nodeId].classes[comClass][valueId].value=value.value;	
		      this.nodes[nodeId].classes[comClass][valueId].isConfigured=true;
		      
		      if (this.zvalueCxMap[valueId]){
		      	console.log(this.zvalueCxMap[valueId]);
		      	//return;
		    		for (let cx of this.zvalueCxMap[valueId]){
		     			let oldValue=this.nodes[nodeId].classes[comClass][valueId].oldValue;
		     			let newValue=this.nodes[nodeId].classes[comClass][valueId].value;
		     			console.log(oldValue);
		     			console.log(newValue);
		     			//return;
		     			cx.emit(CharacteristicEventTypes.CHANGE, 
		     					{ oldValue:oldValue, 
		     						newValue:newValue, context:null });
		     
		     		}
		     	}
		    }
	   	}catch(e){
	   		log.error(e);
	   }
	  }.bind(this));

	}

	registerDevices(){
		this.processZdata();
	}

	addDevice(device){
		this.devices.push(device);
		this.emit(DeviceEventTypes.ADD_DEVICE,this.tag,device._id);
	}

	removeDevice(config,_id){
		for (let idx in this.devices){
			let device=this.devices[idx];
			if (device._id==_id){
				console.log("found & splice");
				this.devices.splice(idx,1);
				device=null;
			}
		}
	}

	checkprops(mapobj,zobj){
		
		if (mapobj.props && check.nonEmptyObject(mapobj.props)){
			for (let key in mapobj.props){
				if (zobj.props){ // check if we are at device or value level
					if (zobj.props.hasOwnProperty(key)==false || zobj.props[key]!=mapobj.props[key]){
						return false;
						break;
					}
				}else{
					if (zobj.hasOwnProperty(key)==false || zobj[key]!=mapobj.props[key]){
						return false;
						break;
					}
				}
			}
		}
		return true;
	}

	addServiceAndCxFromString(device,serviceObj,zValue){
		
		try{
			let srvId=device._id+"-"+zValue.value_id;

			for (let srvName in Service){

				if (srvName==serviceObj.name){
					
					let srv=device.addService(Service[srvName],zValue.label,'',srvId);
					if (srv==null){
						//console.log("srv==null srvName="+srvName);
					}
					
					if (srv!=null){
						
						srv.props.key=zValue;

						for (let optCx of serviceObj.optCx){

							for (let cxName of srv.optionalCharacteristics){

								if(optCx.name==cxName.constructor.name){
									let cx=srv.addCharacteristic(Characteristic[optCx.name]);
									if (optCx.znode_value)
										cx.props.key=optCx.znode_value;
								}
							}
						}
						//console.log("srv=:"+JSON.stringify(srv.props.displayName));
						ZwaveDevice.configureService(this,srv);
					}
				}
			}
		}catch(e){
			console.log(e);
		}
	}

	processZdata(zNode){
		
		// First Add Accessory Information Service
		//let zwaveNetworkId='0xfd730e5e';
		//let ids=[14,17,25];
		//for (let id of ids){

		//if (zData[id]!=null){

			console.log("znode");
			console.log(zNode);
			
			if (zNode==undefined)
				return;
			
			let deviceId=this.zwaveNetworkId+'-'+zNode._id;

			// First Check if device exist


			for (let dv of this.devices){
				if (dv._id===deviceId){
					log.warn(TAG+" warning device already exist in devices repository (skipping) _id:"+deviceId);
					return false;
				}
			}

			// if (this._ctrl.isDeviceCached(this.tag,deviceId)==true){
			// 	let device=this._ctrl.hydrateCachedDevice(this.tag,deviceId);
			// 	// Still need to configure the device
			// 	for (let srv of device.services){
			// 		ZwaveDevice.configureService(this,srv);
			// 	}

			// 	if (device)
			// 		this.addDevice(device);
			// 	return;
			// }

			let device=new ZwaveDevice(this,zNode.props.name,deviceId,this.tag);

			// Start by filtering Device Props
			
			let goodMapping=[]; // List of rule match de props conditions
			let goodService=null; // Service according to the matching rule;
			
			for (let item of zMap){				
				// Check props at device level to filter
				if (this.checkprops(item.device,zNode)==true)
					goodMapping.push(item);
			}

			for(let classKey in zNode.classes) {
				goodService=null;
				
				for (let i in zNode.classes[classKey]) {
					let znode_value=zNode.classes[classKey][i];
					goodService=null; // important

					for (let item of goodMapping){ // iterate across the rules
						for (let cmd of item.device.commandclass){ // iterate all commandclass
							if (cmd.id==classKey && cmd.values){ // Check for valid commandclass			
								for (let zvalue of cmd.values){ // iterate all values

									if (!zvalue.props || check.emptyArray(zvalue.props)) //only value with non props
										continue;
									if(this.checkprops(zvalue,znode_value)==true){
										
										if (goodService==null){ // First Service
											goodService=zvalue.service;
											goodService.znode_value=znode_value;
											if (goodService.priority==null)
												goodService.priority=0;
											goodService.rule=item.rule;
										}else{
											if( zvalue.service.priority && (zvalue.service.priority>goodService.priority)){ // Replace the Service with the Highest priority
												goodService=zvalue.service;
												goodService.znode_value=znode_value;
												goodService.rule=item.rule;
											}
										}
									}
								}
							}	
						}
					}

					if(goodService!=null){
						log.info(TAG+" processZdata: a good Service at value level rule:"+goodService.rule+" serviceName:"+goodService.name);	
						if (goodService.optCx && check.nonEmptyArray(goodService.optCx)==true){ // If there is a values attached to OptCx find one in zdata
							for (let optCx of goodService.optCx){
								if (optCx.value && check.nonEmptyObject(optCx.value)==true){
									for (let j in zNode.classes[classKey]) {
										let znode_value_2=zNode.classes[classKey][j];

										if (this.checkprops(optCx.value,znode_value_2)==true){
											optCx.znode_value=znode_value_2;
											//console.log("a OptCX Good Value has been found");
											break;
										}
									}
								}
							}
						}
						//console.log(goodService);
						this.addServiceAndCxFromString(device,goodService,goodService.znode_value);
					}
				}
			
			
			if (goodService==null){ // If no service at value level let's try at commandclass
				
				for (let item of goodMapping){
					for (let cmd of item.device.commandclass){
							if (cmd.id==classKey && cmd.service){
								
								if (goodService==null){
									
									goodService=cmd.service;
									goodService.rule=item.rule;
									if (goodService.priority==null)
										goodService.priority=0;
									
									for (let j in zNode.classes[classKey]) {
										goodService.znode_value=zNode.classes[classKey][j];
										break;
									}
								}else{
									if( cmd.service.priority && (cmd.service.priority>goodService.priority)){ // Replace the Service with the Highest priority
										//console.log('Priority Check cmd.service.priority:'+cmd.service.priority+"?> goodService.priority:"+goodService.priority)
										goodService=cmd.service;
										goodService.rule=item.rule;
										for (let j in zNode.classes[classKey]) {
											goodService.znode_value=zNode.classes[classKey][j];
											break;
										}
									}
								}
							}
						}
					}
					if (goodService!=null){
						log.info(TAG+" processZdata: a good Service at cmdclass level rule:"+goodService.rule+" serviceName:"+goodService.name);							
						this.addServiceAndCxFromString(device,goodService,goodService.znode_value);
					}
				}
			}
		this.addDevice(device);
		}
	}


class ZwaveDevice extends Device{

	constructor(ctrl,displayName,_id,pluginName){
		super(_id,displayName,pluginName);
		this.ctrl=ctrl;

		let srv=this.addService(Service.AccessoryInformation,"AccessoryInformation",_id+"-01");
		ZwaveDevice.configureService(ctrl,srv);
	}

	static configureService(ctrl,service){

		for(let cx of service.characteristics){
      cx = ZwaveDevice.configureCharacteristic(ctrl,cx,service);
    }
	}

	static configureCharacteristic(ctrl,cx,service){

		let zv=cx.props.key || service.props.key;

		if(zv)
			log.info(TAG+" configure cx:"+cx.props.className+" key:"+zv.value_id);

		if (zv && ctrl.zvalueCxMap[zv.value_id]==null)
				ctrl.zvalueCxMap[zv.value_id]=[];

		if (zv)
			ctrl.zvalueCxMap[zv.value_id].push(cx);
		
		if(cx instanceof Characteristic.Name){

			cx.getDefaultValueFromPlugin=function(service){
				// By Default return the name of the service
				return service.props.displayName;
			}

			cx.value = cx.getDefaultValueFromPlugin(service);

			cx.on(CharacteristicEventTypes.GET, function(callback, context){
				this.value=cx.getDefaultValueFromPlugin(service);
				callback(null,this.value);
			});

			cx.isConfigured=true;
      return cx;		
		}

		// Power Meter
		if(cx instanceof Characteristic.PowerConsumptionResetCounter){
			
			cx.setValuetoZwave = function(data,newValue){
				console.log(newValue);
				let rValue=data.value; // Should be true oor false
				return rValue;
			}

			cx.on(CharacteristicEventTypes.SET, function(callback, context){
				callback(null,cx.getValueFromZwave(zv));
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.CurrentPowerConsumption){
			cx.props.storeAllValues=true;
			
			cx.getValueFromZwave = function(data){
				let rValue=data.value; // Should be true oor false
				return rValue;
			}
			cx.value = cx.getValueFromZwave(zv);

			cx.on(CharacteristicEventTypes.GET, function(callback, context){
				callback(null,cx.getValueFromZwave(zv));
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.TotalPowerConsumption){
			
			cx.props.storeAllValues=true;

			cx.getValueFromZwave = function(data){
				let rValue=data.value; // Should be true oor false
				return rValue;
			}
			cx.value = cx.getValueFromZwave(zv);

			cx.on(CharacteristicEventTypes.GET, function(callback, context){
				callback(null,cx.getValueFromZwave(zv));
			});

			cx.isConfigured=true;
			return cx;
		}

		// On // Brightness

		if(cx instanceof Characteristic.On){
			
			cx.props.storeAllValues=true;
			
			cx.getValueFromZwave = function(data){
				let rValue=false; // Should be true oor false
				
				if (data && data.type=='bool'){
					if (data.value && typeof data.value=='string'){
						if (data.value.toLowerCase()=="true")
							rValue=true;
					}
				}

				else if (data && data.type=='byte'){
					if (data.value && typeof data.value=='string' && /^\d+$/.test(data.value)){
						rValue=parseInt(data.value);
						if (rValue>0)
							rValue=true;
					}
				}else{
					log.warn(TAG+" unhandled Characteristic.On getValueFromZwave data.type:"+data.type);
				}

				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);

			cx.setValuetoZwave=function(data,newValue){
				let sValue=false;
				if (typeof newValue!="boolean")
					return false;

				if (data && data.type=='bool'){
					sValue=newValue;
				}

				else if(data && data.type=='byte' ){
					if (newValue==true)
						sValue=data.max;
					else
						sValue=data.min;
				}
				// Set the sValue to the Zwave driver
				return true;
			}

			cx.on(CharacteristicEventTypes.GET, function(callback, context){
				callback(null,cx.getValueFromZwave(zv));
			});

			cx.on(CharacteristicEventTypes.SET, function(newValue, callback){
				console.log("zwave setValue:"+newValue);
				if (cx.setValuetoZwave(zv,newValue)==true)
					callback(null,newValue);
				else
					callback(null,this.value);
			});

			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				this.value=change.newValue;
			});

			// setInterval(function(){
			//   	cx.emit(CharacteristicEventTypes.CHANGE,{oldValue:false, newValue:true});
			// }, 5*1000);
			
			cx.isConfigured=true;
			return cx;
		}

		
		if(cx instanceof Characteristic.CurrentRelativeHumidity){
			cx.getValueFromZwave = function(data){
				let rValue=parseInt(data.value); 
				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				console.log(change);
				this.value=change.newValue;
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.CurrentTemperature){
			cx.getValueFromZwave = function(data){
				let rValue=parseInt(data.value); 
				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				console.log(change);
				this.value=change.newValue;
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.ContactSensorState){
			cx.getValueFromZwave = function(data){
				let rValue=0; // Should be true or false
				
				if (data && data.type=='bool'){
					if (data.value && typeof data.value=='string'){
						if (data.value.toLowerCase()=="true")
							rValue=1;
					}else if(data.value && typeof data.value=="boolean" && data.value===true)
						rValue=1;
				}else{
					log.warn(TAG+" unhandled Characteristic.MotionDetected getValueFromZwave data.type:"+data.type);
				}

				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);

			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				console.log(change);
				this.value=change.newValue;
			});

			cx.isConfigured=true;
			return cx;
		}

		// BatteryService

		if(cx instanceof Characteristic.BatteryLevel){
			cx.getValueFromZwave = function(data){
				let rValue=parseInt(data.value); // Should be true or false
				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				console.log(change);
				this.value=change.newValue;
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.ChargingState){
			cx.getValueFromZwave = function(data){
				return Characteristic.ChargingState.NOT_CHARGEABLE;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.StatusLowBattery){
			cx.getValueFromZwave = function(data){
				return Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.CurrentAmbientLightLevel){
			cx.getValueFromZwave = function(data){
				let rValue=parseInt(data.value); // Should be true or false
				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				console.log(change);
				this.value=change.newValue;
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.MotionDetected){
			cx.getValueFromZwave = function(data){
				let rValue=false; // Should be true or false
				
				if (data && data.type=='bool'){
					if (data.value && typeof data.value=='string'){
						if (data.value.toLowerCase()=="true")
							rValue=true;
					}else if(data.value && typeof data.value=="boolean")
						rValue=data.value;
				}else{
					log.warn(TAG+" unhandled Characteristic.MotionDetected getValueFromZwave data.type:"+data.type);
				}
				return rValue;
			}

			cx.value = cx.getValueFromZwave(zv);
			cx.on(CharacteristicEventTypes.CHANGE, function(change, callback){
				console.log(change);
				this.value=change.newValue;
			});

			cx.isConfigured=true;
			return cx;
		}

		// Default 
		cx.isConfigured=false;
		return cx;
	}

}

module.exports=device_zwave;
