"use strict";
import EventEmitter from 'events'; 

import Device from '../device';
import Service from '../service';
import Characteristic from '../characteristic';
import {Formats,Perms,Status,Units,CharacteristicEventTypes,DeviceEventTypes} from '../../cst'
import check from 'check-types';
import Ajv 		from 'ajv';

const TAG='deviceLirc';
const VERSION='0.19';

const log =require( '../../../logger');

const lirc = require('lircv0.9.4_node');

class device_lirc extends EventEmitter{

	static tag=TAG;
	static version=VERSION;

	constructor (config,ctrl,callback){
		super();
		this.tag=TAG;		
		this.devices=[];

		this._ctrl=ctrl;
		this.config=config;
		lirc.irsend.setSocket("/var/run/lirc/lircd");
		lirc.init();

		this.status=Status.READY;
  	callback(null,this,this.devices);
	}
	async processLircData(data){
		console.log("going in:"+this._ctrl.isDeviceCached(this.tag,this.tag));

		if (this._ctrl.isDeviceCached(this.tag,this.tag)==true){
			log.info(TAG+" load device from cache");
		 	let device=this._ctrl.hydrateCachedDevice(this.tag,TAG);
			// Still need to configure the device
		 	for (let srv of device.services){
		 		LircDevice.configureService(this,srv);
		 	}
		 	this.addDevice(device);
		 	return;
		}

		if (check.nonEmptyObject(data)){

			let device=new LircDevice(this,TAG,TAG,this.tag);
			for (let remote in data){
				let srvId=TAG+"-"+remote;
				let srv=device.addService(Service.RemoteControl,'Remote '+remote,'',srvId);
				for (let key of data[remote]){
					let cxId=TAG+"-"+remote+"-"+key;
					let cx=srv.addCharacteristic(Characteristic['RemoteKey'],cxId);
					if (cx){
						let keyprops={remote:remote,key:key};	
						cx.props.key=keyprops;
					}
				}
				
				LircDevice.configureService(this,srv);
			}
			let srvId=TAG+"-RemoteTransmitter";
			let srv=device.addService(Service.RemoteTransmitter,'Set IR transmitter','',srvId);
	
			this.addDevice(device);
		}
	}
	addDevice(device){
		this.devices.push(device);
		this.emit(DeviceEventTypes.ADD_DEVICE,this.tag,device._id);
	}

	removeDevice(config,_id){
		for (let idx in this.devices){
			let device=this.devices[idx];
			if (device._id==_id){
				this.devices.splice(idx,1);
				device=null;
			}
		}
	}
	registerDevices(){

		//this.processLircData(lirc.remotes);

		let tmp={
    	"tv": ["Power", "VolumeUp", "VolumeDown"],
    	"xbox360": ["Power", "A", "B"]
  	}

  	this.processLircData(tmp);
  	//console.log(this.devices);
	}
}

class LircDevice extends Device{

	constructor(ctrl,displayName,_id,pluginName){
		super(_id,displayName,pluginName);
		this.ctrl=ctrl;
	}

	static configureService(ctrl,service){
		for(let cx of service.characteristics){
      cx = LircDevice.configureCharacteristic(ctrl,cx,service);
    }
	}

	static configureCharacteristic(ctrl,cx,service){

		if(cx instanceof Characteristic.RemoteKey){

			cx.props.displayName=cx.props.key.key; // overide default displayName
			cx.props.storeAllValues=true;
			
			//cx.props.key => {remote:'Name of the Remote',key:'Key Name to send'};

			cx.value = false;

			cx.setValuetoLirc=function(data,newValue){
				
				if (newValue==true){
					// set the Value to LIRC
					lirc.irsend.send_once(data.remote, data.key, function() {
	  				log.info(TAG+" send IR key:"+data.key+" remote:"+data.remote);
					}.bind(this));
				}
				return true;
			}

			cx.on(CharacteristicEventTypes.GET, function(callback, context){
				callback(null,cx.value);
			});

			cx.on(CharacteristicEventTypes.SET, function(newValue, callback){
				console.log(TAG+" lirc setValue:"+newValue);
				if (cx.setValuetoLirc(cx.props.key,newValue)==true)
					callback(null,newValue);
				else
					callback(null,this.value);
			});

			cx.isConfigured=true;
			return cx;
		}

		if(cx instanceof Characteristic.CurrentTransmitter){

			cx.value=1; // by defualt
			cx.props.displayName="Current Transmitter";
			cx.setValuetoLirc=function(data,newValue){
				
				if (typeof newValue!="number"){
					console.log("CurrentTransmitter wrong newValue type")
					return cx.value;
				}
					
				// set the Value to LIRC
				lirc.irsend.set_transmitters(newValue,function(){
					cx.value=newValue;
					return cx.value;
				}.bind(this))
			}

			cx.on(CharacteristicEventTypes.SET, function(newValue, callback){
				console.log("lirc setValue:"+newValue);
				if (cx.setValuetoLirc(null,newValue)==true)
					callback(null,newValue);
				else
					callback(null,this.value);
			});

		}
	}
}

module.exports=device_lirc;

