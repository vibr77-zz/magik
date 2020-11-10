const EventEmitter =require('events'); 
const {Formats,Perms,Status,Units,CharacteristicEventTypes} =require( '../cst');
const clone =require( 'clone')

const log =require( '../../logger');


class Characteristic extends EventEmitter {

	static On;
  static Name;
  static RemoteKey;
  static CurrentTransmitter;

	constructor(displayName,UUID,props,_id) {
    super();
    
    this._id=_id;
    this.UUID=UUID;
    // Runtime properties
    this.lastValuesStore=[];
    this.isConfigured=false;

    // Instanciation properties
    this.props = props || {
      className:this.constructor.name,
      displayName:displayName,
      format: null,
      unit: null,
      minValue: null,
      maxValue: null,
      minStep: null,
      perms: [],
      storeLastValues:true,
      maxStoredLastValues:150,
      storeAllValues:false,
      label:'',
      subLabel:'',
      key:null,   // Use to store external ref obj
      defaultValue:null
    }

    this.on(CharacteristicEventTypes.CHANGE,function(change){
      if (this.props.storeLastValues==true){
        this.addToLastValuesStore(change.newValue);
      }
    });
  }

  static dehydrate(cx){
    return {
      //className:cx.constructor.name,
      //displayName: cx.displayName,
      _id:cx._id,
      UUID: cx.UUID,
      props: clone(cx.props),
      value: cx.value,
      lastValuesStore:cx.lastValuesStore,
    }
  }

  addToLastValuesStore(newValue){
    if (newItem==null && this.props.storeLastValues!=true)
      return null;
    if (this.lastValuesStore.length>=this.props.maxStoredLastValues){
      while(this.lastValuesStore.length>=this.props.maxStoredLastValues){
        this.lastValuesStore.pop();
      }
    }

    let date=new Date();
    let newItem={
      timestamp:date,
      value:newValue
    }

    this.lastValuesStore.unshift(newItem);
    return this.lastValuesStore;
  }

  resetLastvaluesStore(){
    this.lastValuesStore=[];
  }

  setProps(props){
    for (let key in (props || {}))
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        this.props[key] = props[key];
      }
    return this;
  }

  getValue(callback, context){
    // Handle special event only characteristics.
    if (this.eventOnlyCharacteristic === true) {
      if (callback) {
        callback(null, null);
      }
      return;
    }

    if (this.listeners(CharacteristicEventTypes.GET).length > 0) {
      // allow a listener to handle the fetching of this value, and wait for completion
      this.emit(CharacteristicEventTypes.GET, function(err,newValue){
        this.status = err;
        if (err) {
          // pass the error along to our callback
          if (callback)
            callback(err);
        }
        else {
          newValue = this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
          if (newValue === undefined || newValue === null)
            newValue = this.getDefaultValue();
          // getting the value was a success; we can pass it along and also update our cached value
          var oldValue = this.value;
          this.value = newValue;
          
          if (callback)
            callback(null, newValue);

          // emit a change event if necessary
          if (oldValue !== newValue)
            this.emit(CharacteristicEventTypes.CHANGE, {oldValue: oldValue, newValue: newValue, context: context});
        }
      }.bind(this), context);
    } else {
      // no one is listening to the 'get' event, so just return the cached value
      if (callback)
        callback(this.status, this.value);
    }
  }
  
  getDefaultValue(){
    switch (this.props.format) {
      case Formats.BOOL:
        return false;
      case Formats.STRING:
        return "";
      case Formats.DATA:
        return null;
      case Formats.TLV8:
        return null;
      case Formats.DICTIONARY:
        return {};
      case Formats.ARRAY:
        return [];
      default:
        return this.props.minValue || 0;
    }
  }

  setValue (newValue,callback,context){
    
    newValue = this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
    var oldValue = this.value;
    
    if (this.listeners(CharacteristicEventTypes.SET).length > 0) {
      // allow a listener to handle the setting of this value, and wait for completion
      this.emit(CharacteristicEventTypes.SET, newValue,function(err, writeResponse){
        
        if (err) {
          // pass the error along to our callback
          if (callback)
            callback(err);
        } else {
          
          if (writeResponse !== undefined && this.props.perms.includes(Perms.WRITE_RESPONSE))
            newValue = writeResponse; // support write response simply by letting the implementor pass the response as second argument to the callback

          if (newValue === undefined || newValue === null)
            newValue = this.getDefaultValue();
          
          // setting the value was a success; so we can cache it now
          this.value = newValue;
          
          if (callback)
            callback(null,newValue);
          
          if (this.eventOnlyCharacteristic === true || oldValue !== newValue){
            this.emit(CharacteristicEventTypes.CHANGE, {oldValue: oldValue, newValue: newValue, context: context});
          }
        }
      }.bind(this), context);
    } else {
      if (newValue === undefined || newValue === null)
        newValue = this.getDefaultValue();
      // no one is listening to the 'set' event, so just assign the value blindly
      this.value = newValue;
      if (callback)
        callback(null,newValue);
      
      if (this.eventOnlyCharacteristic === true || oldValue !== newValue)
        this.emit(CharacteristicEventTypes.CHANGE, {oldValue: oldValue, newValue: newValue, context: context});
    }

    return this; // for chaining
  };

  updateValue(newValue, callback, context){
    
    if (newValue instanceof Error) {
      this.status = newValue;
    } else {
      this.status = null;
    }

    newValue = this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
    
    if (newValue === undefined || newValue === null)
      newValue = this.getDefaultValue();
    // no one is listening to the 'set' event, so just assign the value blindly
    var oldValue = this.value;
    this.value = newValue;
    
    if (callback)
      callback();
    
    if (this.eventOnlyCharacteristic === true || oldValue !== newValue)
      this.emit(CharacteristicEventTypes.CHANGE, {oldValue: oldValue, newValue: newValue, context: context});
    
    return this; // for chaining
  }

  validateValue(newValue){
    
    let isNumericType = false;
    let minValue_resolved = 0;
    let maxValue_resolved = 0;
    let minStep_resolved = undefined;
    let stepDecimals = 0;
    
    switch (this.props.format) {
      case Formats.INT:
        minStep_resolved = 1;
        minValue_resolved = -2147483648;
        maxValue_resolved = 2147483647;
        isNumericType = true;
        break;

      case Formats.FLOAT:
        minStep_resolved = undefined;
        minValue_resolved = undefined;
        maxValue_resolved = undefined;
        isNumericType = true;
        break;

      case Formats.UINT8:
        minStep_resolved = 1;
        minValue_resolved = 0;
        maxValue_resolved = 255;
        isNumericType = true;
        break;

      case Formats.UINT16:
        minStep_resolved = 1;
        minValue_resolved = 0;
        maxValue_resolved = 65535;
        isNumericType = true;
        break;

      case Formats.UINT32:
        minStep_resolved = 1;
        minValue_resolved = 0;
        maxValue_resolved = 4294967295;
        isNumericType = true;
        break;

      case Formats.UINT64:
        minStep_resolved = 1;
        minValue_resolved = 0;
        maxValue_resolved = 18446744073709551615;
        isNumericType = true;
        break;

      //All of the following datatypes return from this switch.
      case Formats.BOOL:
        if( typeof newValue=="string" && (newValue.toLowerCase()=="true" || newValue.toLowerCase()=="on" || newValue=="1"))
          return true;
        else if (newValue==true)
          return newValue;
        else
          return false;
        //return (newValue == true); //We don't need to make sure this returns true or false
        break;

      case Formats.STRING:
        let myString = newValue || ''; //If null or undefined or anything odd, make it a blank string
        myString = String(myString);
        var maxLength = this.props.maxLen;
        if (maxLength === undefined)
          maxLength = 64; //Default Max Length is 64.
        if (myString.length > maxLength)
          myString = myString.substring(0, maxLength); //Truncate strings that are too long
        return myString; //We don't need to do any validation after having truncated the string
        break;
      case Formats.DATA:
        var maxLength = this.props.maxDataLen;
        
        if (maxLength === undefined)
          maxLength = 2097152; //Default Max Length is 2097152.
        //if (newValue.length>maxLength) //I don't know the best way to handle this since it's unknown binary data.
        //I suspect that it will crash HomeKit for this bridge if the length is too long.
        return newValue;
        break;

      case Formats.TLV8:
        //Should we parse this to make sure the tlv8 is valid?
        break;
      default: //Datatype out of HAP Spec encountered. We'll assume the developer knows what they're doing.
        return newValue;
    };

    if (isNumericType) {
      if (newValue === false) {
        return 0;
      }
      if (newValue === true) {
        return 1;
      }
      if (isNaN(Number.parseInt(newValue, 10))) {
        return this.value;
      } //This is not a number so we'll just pass out the last value.
      
      if ((this.props.maxValue && !isNaN(this.props.maxValue)) && (this.props.maxValue !== null))
        maxValue_resolved = this.props.maxValue;
      if ((this.props.minValue && !isNaN(this.props.minValue)) && (this.props.minValue !== null))
        minValue_resolved = this.props.minValue;
      if ((this.props.minStep && !isNaN(this.props.minStep)) && (this.props.minStep !== null))
        minStep_resolved = this.props.minStep;
      if (newValue < minValue_resolved)
        newValue = minValue_resolved; //Fails Minimum Value Test
      if (newValue > maxValue_resolved)
        newValue = maxValue_resolved; //Fails Maximum Value Test
      if (minStep_resolved !== undefined) {
        //Determine how many decimals we need to display
        if (Math.floor(minStep_resolved) === minStep_resolved)
          stepDecimals = 0;
        else
          stepDecimals = minStep_resolved.toString().split(".")[1].length || 0;
        //Use Decimal to detemine the lowest value within the step.
        try {
          var decimalVal = new Decimal(parseFloat(newValue));
          var decimalDiff = decimalVal.mod(minStep_resolved);
          decimalVal = decimalVal.minus(decimalDiff);
          if (stepDecimals === 0) {
            newValue = parseInt(decimalVal.toFixed(0));
          } else {
            newValue = parseFloat(decimalVal.toFixed(stepDecimals)); //Convert it to a fixed decimal
          }
        } catch (e) {
          return this.value; //If we had an error, return the current value.
        }
      }
    }
    return newValue;
  }
}

module.exports=Characteristic;