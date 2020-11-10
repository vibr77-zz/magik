const EventEmitter = require('events'); 
const Characteristic=require('./characteristic');
const {CharacteristicEventTypes,ServiceEventTypes} =require( '../cst')
const clone =require( 'clone')
const log =require( '../../logger');

class Service extends EventEmitter {

  static RemoteControl // add By VIBR
  static RemoteTransmitter // add by VIBR
	static AccessControl
  static AccessoryInformation
  static AirPurifier
  static AirQualitySensor
  static AudioStreamManagement
  static BatteryService
  static BridgeConfiguration
  static BridgingState
  static CameraControl
  static CameraRTPStreamManagement
  static CarbonDioxideSensor
  static CarbonMonoxideSensor
  static ContactSensor
  static DataStreamTransportManagement
  static Door
  static Doorbell
  static Fan
  static Fanv2
  static Faucet
  static FilterMaintenance
  static GarageDoorOpener
  static HeaterCooler
  static HumidifierDehumidifier
  static HumiditySensor
  static InputSource
  static IrrigationSystem
  /**
   * @deprecated Removed in iOS 11. Use ServiceLabel instead.
   */
  static Label
  static LeakSensor
  static LightSensor
  static Lightbulb
  static LockManagement
  static LockMechanism
  static Microphone
  static MotionSensor
  static OccupancySensor
  static Outlet
  static Pairing
  static ProtocolInformation
  static Relay
  static SecuritySystem
  static ServiceLabel
  static Siri
  static Slat
  static SmokeSensor
  static SmartSpeaker
  static Speaker
  static StatefulProgrammableSwitch
  static StatelessProgrammableSwitch
  static Switch
  static TargetControl
  static TargetControlManagement
  static Television
  static TelevisionSpeaker
  static TemperatureSensor
  static Thermostat
  static TimeInformation
  static TunneledBTLEAccessoryService
  static Valve
  static Window
  static WindowCovering
  static CameraOperatingMode
  static CameraEventRecordingManagement
  static WiFiRouter
  static WiFiSatellite
  static PowerManagement
  static TransferTransportManagement
  
	constructor(displayName,UUID,subtype,_id) {
    super();
    this._id=_id;
    this.props={
      displayName:displayName,
      subtype:subtype,
      className:this.constructor.name,
      key:'',
      isHiddenService:false,
      isPrimaryService:false
    }
   
  	this.UUID=UUID;
    this.characteristics=[];
    this.optionalCharacteristics=[];  
  }

  static hydrate(jsonService){
    try{
      let srv=new Service[jsonService.props.className](jsonService.props.displayName,jsonService.props.subtype,jsonService._id);
      srv.props=clone(jsonService.props);
      
      for (let jsonCx of jsonService.characteristics){
        let rehydrated=false;

        for (let cx of srv.characteristics){
          if (cx.isConfigured==false && cx.constructor.name=== jsonCx.props.className){
            // The CX is not configured let's rehydrate
            cx.isConfigured=true;
            cx._id=jsonCx._id;      
            cx.props=clone(jsonCx.props);
            cx.value=jsonCx.value;
            cx.lastValuesStore=clone(jsonCx.lastValuesStore);
            rehydrated=true;
            break;
          }
        }

        if (rehydrated==false){  
          let cx=srv.addCharacteristic(Characteristic[jsonCx.props.className]);
          
          cx.isConfigured=true; 
          cx._id=jsonCx._id;       
          cx.props=clone(jsonCx.props);
          cx.value=jsonCx.value;
          cx.lastValuesStore=clone(jsonCx.lastValuesStore);
        }
      }
      return srv;
    
    }catch(error){
      log.error("hydrate service error:"+error);
      return null;
    }
  }

  static dehydrate(srv){
    return{

      _id: srv._id,
      props:clone(srv.props),
      characteristics: srv.characteristics.map(function(cx){ return Characteristic.dehydrate(cx)}),
      /*optionalCharacteristics: srv.optionalCharacteristics.map(function(cx){ return Characteristic.dehydrate(cx)})*/ // to be resassessed
    }
  }

  addCharacteristic(characteristic, ...constructorArgs){
    if (typeof characteristic === 'function') {
      let cx = new characteristic(constructorArgs[0], constructorArgs[1],null,constructorArgs[2]);
      cx.on(CharacteristicEventTypes.GET, function(change){
        // make a new object with the relevant characteristic added, and bubble it up
        let eventMessage={
          _id:this._id,
          type: this.constructor.name,
          props:this.props,
          cx:{
            type: cx.constructor.name,
            props: cx.props,
            change: change
          }
        }
        this.emit(ServiceEventTypes.CHARACTERISTIC_CHANGE, eventMessage);
      });

      cx.on(CharacteristicEventTypes.CHANGE, (change) => {

        let eventMessage={
          _id:this._id,
          type: this.constructor.name,
          props:this.props,
          cx:{
            type: cx.constructor.name,
            props: cx.props,
            change: change
          }
        }

        this.emit(ServiceEventTypes.CHARACTERISTIC_CHANGE, eventMessage );
      });

      this.characteristics.push(cx);
      return cx;
    }
    return null;
  }
  
  addOptionalCharacteristic(characteristic,...constructorArgs){
    if (typeof characteristic === 'function') {
      let cx = new characteristic(constructorArgs[0], constructorArgs[1]);
      this.optionalCharacteristics.push(cx);
    }
  }
  getCharacteristicById(_id){
    
    if (_id==null){
      log.warn('Device displayName:'+this.props.displayName+' getCharacteristicById _id:null');
      return null;
    }

    for (let cx of this.characteristics){
      if (cx._id===_id) {
        return cx;
      }
    }

    log.warn('Service displayName:'+this.props.displayName+' getCharacteristicById:'+id+ " return:null");
    return null;
  }

  getCharacteristic(name){
    if (name==null){
      log.warn('Service displayName:'+this.props.displayName+' getCharacteristic:null');
      return null;
    }

    for (let index in this.characteristics){
      let cx = this.characteristics[index];
      if (typeof name === 'string' && cx.props.className === name) {
        return cx;
      } else if (typeof name === 'function' && ((cx instanceof name) || (name.UUID === cx.UUID))) {
        return cx;
      }
    }

    if (typeof name==='string')
      log.warn('Service displayName:'+this.props.displayName+' getCharacteristic:'+name+ " return:null");
    
    if (typeof name==='function')
      log.warn('Service displayName:'+this.props.displayName+' getCharacteristic: Characteristic.'+name.name+ " return:null");
    
    return null;
  }

  chkCharacteristic (name){
    // checks for the existence of a characteristic object in the service
    
    if (name==null){
      log.warn('Service displayName:'+this.props.displayName+' chkCharacteristic:null return:false');
      return false;
    }

    for (let index in this.characteristics) {
      let cx = this.characteristics[index];
      if (typeof name === 'string' && cx.props.displayName === name) {
        return true;
      } else if (typeof name === 'function' && ((cx instanceof name) || (name.UUID === cx.UUID))) {
        return true;
      }
    }
    return false;
  }

  setCharacteristic(name, value,clbk){
    this.getCharacteristic(name).setValue(value,clbk);
    return this; 
  }

  // A function to only updating the remote value, but not firing the 'set' event.
  updateCharacteristic(name, value){
    this.getCharacteristic(name).updateValue(value);
    return this;
  }
}

module.exports=Service;
