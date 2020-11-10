
const CharacteristicEventTypes ={
  GET : "get",
  SET : "set",
  SUBSCRIBE : "subscribe",
  UNSUBSCRIBE : "unsubscribe",
  CHANGE : "change"
}

const ServiceEventTypes ={
  CHARACTERISTIC_CHANGE : "cxChange",
  SERVICE_CONFIGURATION_CHANGE : "serviceConfigurationChange",
}

const DeviceEventTypes ={
  CHARACTERISTIC_CHANGE : "deviceCxChange",
  DEVICE_CONFIGURATION_CHANGE : "deviceServiceConfigurationChange",
  ADD_DEVICE:"addDevice",
  REMOVE_DEVICE: 'removeDevice'
}

const SpellEventTypes={
  SPELL_EXECUTION:"spellEx",
  SPELL_CONFIGURATION_CHANGE : "SpellConfigurationChange",
  TIME_EVENT:"eventTime",
  SUNLIGHT_EVENT:"eventSunlight",
  DEVICE_EVENT:"eventDevice",
  WS_EVENT:"eventWs",
  VAR_EVENT:"eventVar"
}

const SpellCst={
  SPELL_MAX_NESTED_ITEMS:50,
  SPELL_MAX_WHILE_LOOP:100,
  SPELL_MAX_TIMEWAIT_IN_SEC:300,
  SPELL_MAX_TIMEDELAY_IN_MS:50000
}


const Status={
	NONE:"none",
	INITED:"init",
	READY:"ready",
	FAILED:"failed",
  COMPLETED:"completed",
}

const Formats={
  BOOL : 'bool',
  INT : 'int',
  FLOAT : 'float',
  STRING : 'string',
  UINT8 : 'uint8',
  UINT16 : 'uint16',
  UINT32 : 'uint32',
  UINT64 : 'uint64',
  DATA : 'data',
  TLV8 : 'tlv8',
  ARRAY : 'array', //Not in HAP Spec
  DICTIONARY : 'dict' //Not in HAP Spec

}

const Ops={
  ALWAYS:'always',
  EQUAL:'equal',
  CHANGE:'change',
  NOT_EQUAL:'not_equal',
  SUPEQ:'sup_equal',
  SUP:'sup',
  INFEQ:'inf_equal',
  INF:'inf'
}

const Perms={
  READ : 'pr', //Kept for backwards compatability
  PAIRED_READ : 'pr', //Added to match HAP's terminology
  WRITE : 'pw', //Kept for backwards compatability
  PAIRED_WRITE : 'pw', //Added to match HAP's terminology
  NOTIFY : 'ev', //Kept for backwards compatability
  EVENTS : 'ev', //Added to match HAP's terminology
  ADDITIONAL_AUTHORIZATION : 'aa',
  TIMED_WRITE : 'tw', //Not currently supported by IP
  HIDDEN : 'hd',
  WRITE_RESPONSE : 'wr'
}

const Units= {
  // HomeKit only defines Celsius, for Fahrenheit, it requires iOS app to do the conversion.
  CELSIUS :'celsius',
  PERCENTAGE : 'percentage',
  ARC_DEGREE : 'arcdegrees',
  LUX : 'lux',
  SECONDS : 'seconds'
}

const Domain={
  DEVICE:'device',
  SPELL:'spell'
}

module.exports={
	CharacteristicEventTypes,
  ServiceEventTypes,
  DeviceEventTypes,
  SpellEventTypes,
	Status,
	Formats,
	Perms,
	Units,
  Ops,
  Domain,
  SpellCst
}
