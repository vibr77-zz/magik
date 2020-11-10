const EventEmitter = require('events'); 
const Service=require('./service');
const Characteristic=require('./characteristic');
const {Formats,Perms,Status,Units,CharacteristicEventTypes,ServiceEventTypes,DeviceEventTypes} =require( '../cst');
const clone =require( 'clone')

const log =require( '../../logger');


const DEVICE_SCHEMA={
  "title": "Device Schema",
  "description": "Device Object",
  "type": "object",
  "properties": {
    "_id":{ "type":"string" },
    "isCached":{"type":"boolean"},
    "props":{
      "type": "object",
      "properties": {
        "displayName":{
          "type":"string",
          "pattern":"^[A-Za-z0-9_\-\\s]*$",
          "minLength": 1,
          "maxLength": 256
        },
        "description":{
          "type":"string",
          "pattern":"^[A-Za-z0-9_\-\\s]*$",
          "minLength": 1,
          "maxLength": 1024
        },
        "location":{
          "type":"string",
          "pattern":"^[A-Za-z0-9\\s]*$",
          "minLength": 1,
          "maxLength": 256
         }
      },
      "additionalProperties": false,
      "required": ["displayName","location"]    
    },
    "services":{"type":"array"}
  },
  "additionalProperties": false,
  "required":["props","_id"]
}

class Device extends EventEmitter {

  static schema=DEVICE_SCHEMA;

	constructor(_id,displayName,pluginName) {
		super();
		this._id=_id;
    this.pluginName=pluginName;

    this.status=Status.NONE;
    this.props={
      displayName:displayName,
      description:null,
      location:null
    }
    this.isCached=false; // Has been loaded from Cache
    this.services=[];
	}

  static hydrate(jsonDevice){ 
    try{
      let dv=new Device(jsonDevice._id,jsonDevice.props.displayName,jsonDevice.pluginName)

      for (let jsonSrv of jsonDevice.services){
        let srv=Service.hydrate(jsonSrv);
        if (srv){
          srv.on(ServiceEventTypes.CHARACTERISTIC_CHANGE, function(change){
            // make a new object with the relevant characteristic added, and bubble it up
            let eventMessage={
             _id: this._id,
             service: change
            }
            this.emit(DeviceEventTypes.CHARACTERISTIC_CHANGE, eventMessage);
          }.bind(dv)); // <-- important static function need to biind the new dv 

          dv.services.push(srv);
        }
      }
      return dv;

    }catch(e){
      log.info(e);
      return null;
    }
  }

  static dehydrate(dv){
    return {
      _id: dv._id,
      props: clone(dv.props),
      pluginName:clone(dv.pluginName),
      services: dv.services.map(function(srv){ return Service.dehydrate(srv)})
    }
  }

  addService(service, ...constructorArgs){

    if (typeof service === 'function') {
      
      let srv = new service(constructorArgs[0], constructorArgs[1],constructorArgs[2]);
      
      /*cx.on(CharacteristicEventTypes.GET, function(change){
        // make a new object with the relevant characteristic added, and bubble it up
        //this.emit(ServiceEventTypes.CHARACTERISTIC_CHANGE, clone(change, { characteristic: characteristic }));
      });*/

      srv.on(ServiceEventTypes.CHARACTERISTIC_CHANGE, (change) => {
        // make a new object with the relevant characteristic added, and bubble it up
        let eventMessage={
          _id: this._id,
          service: change
        }
        this.emit(DeviceEventTypes.CHARACTERISTIC_CHANGE, eventMessage /*clone(change, { characteristic })*/);
      });

      this.services.push(srv);

      return srv;
    }
    return null;
  }
	getService(name){
		if (name==null){
      log.warn('Device displayName:'+this.displayName+' getService:null');
      return null;
    }

    for (let index in this.services) {
      let srv = this.services[index];
      if (typeof name === 'string' && srv.displayName === name) {
        return srv;
      } else if (typeof name === 'function' && ((srv instanceof name) || (name.UUID === srv.UUID))) {
        return srv;
      }
    }

    if (typeof name==='string')
      log.warn('Device displayName:'+this.props.displayName+' getService:'+name+ " return:null");
    
    if (typeof name==='function')
      log.warn('Device displayName:'+this.props.displayName+' getService: Service.'+name.name+ " return:null");
    
    return null;
	};

  getServiceById(_id){

    if (_id==null){
      log.warn('Device displayName:'+this.props.displayName+' getServiceById _id:null');
      return null;
    }

    for (let srv of this.services) {
      if (typeof _id === 'string' && srv._id === _id) {
        return srv;
      }
    }
    return null;
  };

	chkService(name){
		if (name==null){
      log.warn('Device displayName:'+this.props.displayName+' chkService:null return:false');
      return false;
    }

    var index, srv;
    for (index in this.services) {
      srv = this.services[index];
      if (typeof name === 'string' && srv.props.displayName === name) {
        return true;
      } else if (typeof name === 'function' && ((srv instanceof name) || (name.UUID === srv.UUID))) {
        return true;
      }
    }
    return false;
  }
}

module.exports=Device