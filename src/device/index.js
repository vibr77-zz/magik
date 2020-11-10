const EventEmitter = require( 'events'); 

const Ajv=require('ajv');

const axon = require('pm2-axon');

const check = require('check-types');
const Device = require('./device');
const Service = require('./service');
const Characteristic = require('./characteristic');

const Types = require( './types');
const createError = require('http-errors');

const {Formats,Perms,Status,Units,CharacteristicEventTypes,DeviceEventTypes,Domain} = require( '../cst');

const log =require( '../../logger');
const clone =require( 'clone');

class deviceController extends EventEmitter{

	constructor(config,eventHandler,deviceHandler) {
		super();
		this.tag='deviceController';
		
		this._config=config;
		this._eventHandler=eventHandler;
		this._deviceHandler=deviceHandler;

		this._deviceControllers=[];
		this._devices={};
		this._pluginCached={};
		this.status=Status.NONE;

		this._pluginLeftToLoad=0;

		this._pluginController = require('require-all')({
  		dirname     :  __dirname + '/plugins',
  		excludeDirs :  /^\.(git|svn)$/,
  		recursive   : true,
  		filter: /^(?!.*\.(spec|test)\.js$).*\.js$/,
  		recursive   : true,
  		map: function (name, path) {
  			let name_1=name.replace(/\.[^/.]+$/, "")
    		return name_1.replace(/_([a-z])/g, function (m, c) {
      		return c.toUpperCase();
    		});
    	}
		});

		const sockDeviceEvent= axon.socket('pub-emitter');
		sockDeviceEvent.bind(config.app.sockDeviceEvent);
		this.sockDeviceEvent=sockDeviceEvent;

		const sockLssReq=axon.socket('rep');
		sockLssReq.bind(config.app.sockDeviceCommand);
		this.sockLssReq=sockLssReq;
		
		this.status=Status.INIT;

		for (let plugin in this._pluginController) {
    	log.info(this.tag+' loaded plugin:'+plugin+ ' tag:'+this._pluginController[plugin].tag+' version:'+this._pluginController[plugin].version );
			this._pluginLeftToLoad++;
		}
		
		//
		// Loading device from cache
		//

		for (let plugin in this._pluginController){
			deviceHandler.getOne({pluginName:plugin})
			.then(function(res){
				
				if (res)
					this._pluginCached[plugin]=clone(res);
				else
					this._pluginCached[plugin]=[];

				log.info(this.tag+" plugin:"+plugin+" loading device cache:ok");	

			}.bind(this))
			.catch(function(error) {
				log.error(this.tag+" plugin:"+plugin+" loading device cache:"+error);
			}.bind(this))
			.finally(function(){

				//
				// Check from cache if the module is to be load
				//
				
				if (this._pluginCached[plugin] && this._pluginCached[plugin].props.status && this._pluginCached[plugin].props.status==false){
					log.info(this.tag+' the module is disable:'+this._pluginController[plugin].tag);
				}else{
					log.info(this.tag+' finally instantiating deviceController:'+this._pluginController[plugin].tag);
					this._deviceControllers[plugin]=new this._pluginController[plugin](this._config,this,this._pluginLoadingCallBack.bind(this));

					// hydrating plugin
					if (this._pluginCached[plugin] && this._pluginCached[plugin].props){
						this._deviceControllers[plugin].props=clone(this._pluginCached[plugin].props);
					}
				}

			}.bind(this))
		}
	
		this.command();
	}

	// Managing Serialisation / Deserialisation
	// to store in cache / db the configured device per plugin
	// the cache is to be consulted after plugin initialization

	_dehydratePlugin(pluginName){ // serialize all device for one plugin
			return new Promise(function(resolve, reject){
				
				let res={};
				res.pluginName=pluginName;
				res.props=clone(this._deviceControllers[pluginName].props);
				res.services=[]; // TODO
				res.devices=this._devices[pluginName].map(function(dv){ return Device.dehydrate(dv)});
				//console.log(res);
				if (res.devices===null)
					return reject ("could not dehydrate plugin");
				else
					return resolve(res);
			}.bind(this));
	}

	_hydratePlugin(pluginName,data){
		if (data && check.nonEmptyArray(data)){
			for (let jsonDevice of data){
				let dv=Device.hydrate(jsonDevice);
				//log.info(JSON.stringify(dv, undefined, '\t'));
			}
		}
	}

	isDeviceCached(pluginName,_id){
		let ret=false;
		let plg=this._pluginCached[pluginName];
		if (plg && check.nonEmptyArray(plg.devices)){
			for (let dv of plg.devices){
				if (dv._id==_id)
					ret=true;
			}
		}
		return ret;
	}

	clearDeviceCache(pluginName,_id){ // To be Tested
		this._deviceHandler.getOne({pluginName:pluginName}).then(function(res){
			if (res && res.devices){
				for (let i in res.devices){
					let dv=res.devices[i];
					if (dv._id===_id){
						res.devices.splice(i,1);
						this._deviceHandler.save(res);
					}
				}
			}
		}.bind(this));
	}

	clearPluginCache(pluginName){
		this._deviceHandler.dropOne({pluginName:pluginName});
		return;
	}

	hydrateCachedDevice(pluginName,_id){
		let hydratedDevice=null;
		let plg=this._pluginCached[pluginName];
		for (let dv of plg.devices){
			if (dv._id===_id){
				log.info(this.tag+" hydrateCachedDevice plugin:"+pluginName+" device _id:"+_id+" has been loaded from cache");
				
				hydratedDevice=Device.hydrate(dv);
				if (hydratedDevice)
					hydratedDevice.isCached=true;
				return hydratedDevice;
			}
		}
		return null;
	}

	_savePluginDeviceToCache(pluginName,data){
		
		this._deviceHandler.save(data)
		.then(function(){
			log.info(this.tag+" _savePluginDeviceToCache pluginName:"+pluginName+" status:OK");
		}.bind(this))
		.catch(function(err){
			log.error(this.tag+" _savePluginDeviceToCache pluginName:"+pluginName+" error:"+eerr)
		});
		return;
	}

	_pluginLoadingCallBack(err,deviceCtrl){
		this._pluginLeftToLoad--;
		
		if (err){
			log.info(this.tag+' _pluginLoadingResult:'+deviceCtrl.tag+" status:"+deviceCtrl.status);
			return;
		}

		log.info(this.tag+' _pluginLoadingResult:'+deviceCtrl.tag+" status:"+deviceCtrl.status);

		if (this._pluginLeftToLoad==0){
			this.status=Status.READY;
			log.info(this.tag+' _pluginLoadingResult:Completed');
		}
	
		this._devices[deviceCtrl.tag]=deviceCtrl.devices;

		deviceCtrl.addListener(DeviceEventTypes.ADD_DEVICE,function(pluginName,deviceId){
			for (let device of this._devices[pluginName]){
				if (device._id==deviceId){
					this._subscribeToEvent(device);
					break;
				}
			}
		}.bind(this));

		deviceCtrl.registerDevices();

		this._dehydratePlugin(deviceCtrl.tag)
		.then(function(dhy){
			this._savePluginDeviceToCache(deviceCtrl.tag,dhy)
		}.bind(this))
		.catch(function(err){
			log.error("could not save device to handler error:"+err);
		});

		let pluginName=deviceCtrl.tag;
		this._testCallback(deviceCtrl,this._devices[pluginName]);
		return;
	}

	_subscribeToEvent(device){

		if (device){

			device.on(DeviceEventTypes.DEVICE_CONFIGURATION_CHANGE,function(change){
				log.info(this.tag," event Device configuration change");
				
				this._dehydratePlugin(device.pluginName)
					.then(function(dhy){
						this._savePluginDeviceToCache(device.pluginName,dhy)
					}.bind(this))
					.catch(function(err){
						log.error("could not save device to handler error:"+err);
					});
				this.sockDeviceEvent.emit(DeviceEventTypes.DEVICE_CONFIGURATION_CHANGE, change); // bubble up outside this controller

			}.bind(this));

			device.on(DeviceEventTypes.CHARACTERISTIC_CHANGE,(change)=>{
				// Event has bubbled up = require( the CX -> Service -> Device -> Controller (this);
				// Emit a new event to whom is listening
				// console.log(change);
				this.sockDeviceEvent.emit(DeviceEventTypes.CHARACTERISTIC_CHANGE, change);
				
				try{
					if (change.service.cx.props.storeAllValues==true){
						this._eventHandler.create({domain:Domain.DEVICE,eventType:DeviceEventTypes.CHARACTERISTIC_CHANGE,data:change});
					}
				}catch(e){
					log.error(this.tag+" _subscribeToEvent error:"+e);
				}
			});
		}
	}

	_unsubscribeToEvent(device){

	}
	
	_testCallback(deviceCtrl,devices){
			
			// Write current device list to 

			setTimeout(function(){
				
				this._dehydratePlugin(deviceCtrl.tag)
					.then(function(dhy){
						this._savePluginDeviceToCache(deviceCtrl.tag,dhy)
					}.bind(this))
					.catch(function(err){
						log.error("could not save device to handler error:"+err);
					});

					//this.clearDeviceCache("deviceLirc","deviceLirc");
					//this.clearPluginCache("deviceLirc");
			}.bind(this), 50*1000);

	}

	_getDeviceById(_id){
		for (let plg in this._devices){
			for (let dv of this._devices[plg]){
				if (dv._id==_id){
					return dv;
				}
			}					
		}
		return null;
	}

	command(){
		
		this.sockLssReq.on('message',function(data,reply){

			let err=null;
			let res={};
			let rep;
			let promises = [];


			if (data==null || data['method']==null){
				reply('invalid method',null);
				return;
			}

			if (data['method']=='ping'){
				res['method']='ping';
				res['result']='pong';
				reply(null,JSON.parse(JSON.stringify(res)));
				return;
			}

			if (this.status!=Status.READY){
				reply("LSS status not ready",null);
				return;
			}

			switch(data['method']){
				case 'clearPluginCache':
					rep=[];
					promises = [];
					this.clearPluginCache(data['pluginName']);
					reply(null,{status:"OK"});
				break;
				
				case 'getDevicePlugins':
					rep=[];
					promises = [];
					for (let plg in this._devices){	
						promises.push(this._dehydratePlugin(plg)
						.then(
							function(dhy){
								rep=rep.concat(dhy);
							})
						);
					}
					
					Promise.all(promises).then(() => {
						reply(null,rep);
					});



				break;
				case 'getDevices': // provide flat array of all device

					rep=[];
					promises = [];
					for (let plg in this._devices){	
						promises.push(this._dehydratePlugin(plg)
						.then(
							function(dhy){
								rep=rep.concat(dhy);
							})
						);
					}
					
					Promise.all(promises).then(() => {
						reply(null,rep);
					});
					
				break;

				case 'getDevice': // tested OK
						rep=false;
						if (data['pluginName'] && data['_id']){
							let pluginName=data['pluginName'];
							for (let dv of this._devices[pluginName]){
								if (dv._id==data['_id']){
									rep=true;
									return reply(null,Device.dehydrate(dv));
									break;
								}
							}
							return reply(createError(404,this.tag+" getDevice device not found"),null);
						}else if (data['_id']){
							let dv=this._getDeviceById(data['_id'])
							if (dv){
								rep=true;
								return reply(null,Device.dehydrate(dv));
								break;
							}
							return reply(createError(404,this.tag+" getDevice device not found"),null);
						}else{
							return reply(createError(400,this.tag+" getDevice bad request missing input args"),null);
						}
					
					return reply(createError(400,this.tag+" getDevice bad request"),null);
					
				break;

				case 'setDeviceProps':
					rep=false;
					let ajv = new Ajv({allErrors: true});
					if (ajv.validate(Device.schema.properties.props, data['props'])==true){
					
						if (data['_id']){
							for (let plg in this._devices){
								for (let dv of this._devices[plg]){
									if (dv._id==data['_id']){
										rep=true;
										dv.props=clone(data['props']);
										dv.emit(DeviceEventTypes.DEVICE_CONFIGURATION_CHANGE,data["props"]);
										reply(null,Device.dehydrate(dv));
										return;
									}
								}
								if (rep==true)
									break;
							}
						}
					}
					reply(ajv.errors,null);
				
				break;

				case 'setServiceProps':

					break;
				case 'setCxValue':
				
					if (data['deviceId'] && data['serviceId'] && data['cxId'] && data['value']){

						let cx=this._getDeviceById(data['deviceId'])?.getServiceById(data['serviceId'])?.getCharacteristicById(data['cxId']);
						if (cx){
							cx.setValue(data['value']);
							reply(null,"OK");
						}else{
							reply("cx not found", null);
						}
					}
					break;
				
				case 'getCx':
					if (data['deviceId'] && data['serviceId'] && data['cxId']){
						let cx=this._getDeviceById(data['deviceId'])?.getServiceById(data['serviceId'])?.getCharacteristicById(data['cxId']);
						if (cx){
							reply(null,Characteristic.dehydrate(cx))
						}else{
							reply("cx not found", null);
						}
					}

				break;

				default:
					log.warn(this.tag," unhandled sockLss method");
				break;
			}
		
		}.bind(this));
	}

}



module.exports = deviceController;