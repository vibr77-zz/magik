"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const log =require( '../../../logger');

const TAG='objectDevice';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	methodName:'',
	isGlobalScope:false,
	varName:'',
	valueObj:null
}

const SCHEMA={
	"title": TAG,
  "description": "Device Object",
	"type": "object",
  "properties": {
  	"_id":{
  		"type":"string",
  		"pattern":"^[a-f\\d]{24}$"
  	},
  	"type":{
  		"const":TAG
  	},
  	"props":{
  		"type": "object",
      "properties": {
  			"toolTip":{
  				"type":"string",
  				"minLength": 0,
  				"maxLength": 512
  			},
  			"comment":{
  				"type":'string',
  				"minLength": 0,
  				"maxLength": 512
  			}
  		},
      "additionalProperties": false
  	},
  	"deviceId":{
  		"type":"string",
  	},
  	"methodName":{
  		"type":"string",
  		"enum":["deviceTrigger","getDevice","getSrv","getCx","setCx"]
  	},
  	"args":{
  		"type":["array"]
  	},
  	"trigger":{
  		"type":"boolean",
  		"default":false
  	},
  	"triggerEvents":{
  		"type":"array"
  	}
  },
  "required": [ "_id", "type"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class object_Device extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.methodName=entry.methodName;
		this.deviceId=entry.deviceId
		this.args=entry.args; // better to shift to an array of args...  
		this.triggerEvents=entry.triggerEvents;

		//
		//	Bind the available methods to function 
		//

		this._method={};
		
		this._method["deviceTrigger"]=this.deviceTrigger.bind(this);
		
		this._method["getDevice"]=this.getDevice.bind(this);
		this._method["getSrv"]=this.getSrv.bind(this);
		
		this._method["getProps"]=this.getProps.bind(this);
		this._method["setProps"]=this.setProps.bind(this);
		
		this._method["getServices"]=this.setProps.bind(this);
		this._method["getCxs"]=this.setProps.bind(this);
		
		this._method["setCx"]=this.setCx.bind(this);
		this._method["getCx"]=this.getCx.bind(this);

		this._status=checkEntry(entry);
	}

	async deviceTrigger(spell,logStack,event){
		if (event==null){
			log.info(this.tag+" deviceTrigger event is null, returning (aka normal spell execution)");
			return false
		}

		if(typeof this.args[0]==undefined)
			throw this.tag+" deviceTrigger invalid input args null";

		let obj_0;
		if (this.args[1]!=null && typeof this.args[0]=="object"){
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{ // maybe need to manage boolean // need to test
				throw this.tag+" deviceTrigger args[0] has to be an object to evaluate"
		}

		let obj_1;
		if (this.args[1]!=null && typeof this.args[1]=="object"){
				obj_1= await spell.executeSingleSpellEntry(this.args[1],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_1= this.args[1]
		}

		let obj_2;

		if (this.args[2]!=null && typeof this.args[2]=="object"){
				obj_2= await spell.executeSingleSpellEntry(this.args[2],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_2= this.args[2]
		}

		if (this.triggerEvents[0]=="eventDevice"){
			if (obj_0[0]!=null && event && event._id==obj_0[0])
				return true;
			else
				return false;
		}

		else if (this.triggerEvents[0]=="eventService"){
			if (obj_0[0]!=null && event && event._id===obj_0[0] && event.service && event.service._id===obj_0[1])
				return true;
			else
				return false;
		}
		else if (this.triggerEvents[0]=="eventCx"){

			if (obj_0[0]!=null && event && event._id===obj_0[0] && event.service && event.service._id===obj_0[1] && event.service.cx.type===obj_0[2]){
				
				// Lets process the operator
				if (obj_1==="ANY"){
					console.log("cond any return true");
					return true;
				}
				else if (obj_1==="EQ" && obj_2===event.service.cx.change.newValue){
					console.log("cond EQ return true");
					return true;
				}
				else if (obj_1==="NEQ" && obj_2!==event.service.cx.change.newValue){
					console.log("cond NEQ return true");
					return true;
				}
				else if(obj_1==="LT" && typeof obj_2=="number" && typeof event.service.cx.change.newValue=="number" && event.service.cx.change.newValue < obj_2 ){
					console.log("cond LT return true");
					return true;
				}
				else if(obj_1==="LTE" && typeof obj_2=="number" && typeof event.service.cx.change.newValue=="number" && event.service.cx.change.newValue <= obj_2 ){
					console.log("cond LTE return true");
					return true;
				}
				else if(obj_1==="GT" && typeof obj_2=="number" && typeof event.service.cx.change.newValue=="number" && event.service.cx.change.newValue > obj_2 ){
					console.log("cond GT return true");
					return true;
				}
				else if(obj_1==="GTE" && typeof obj_2=="number" && typeof event.service.cx.change.newValue=="number" && event.service.cx.change.newValue >= obj_2 ){
					console.log("cond GTE return true");
					return true;
				}
				else
					return false;
			}
		}
		else
			return false;
	}

	async getProps(spell,logStack){
		
		let sockCommand=spell.spellController.sockDeviceCommand;
		let arg0;
		if (check.nonEmptyArray(this.args)){
			arg0=this.args[0];
		}else{
			throw createError(400,TAG+" bad request missing arg0");
		}

		// Todo First Check if the socket is connected 
		
		return new Promise(function(resolve, reject) {
			sockCommand.send({method:'getDevice',_id:this.deviceId},function(err,result){
				if (result){
					if (check.nonEmptyString(this.arg0)){ // 
						if (arg0!='_id' && result.props[arg0]){
							return resolve(result.props[arg0]);
						}else if (arg0=='_id' && result[arg0]){
							return resolve(result[arg0]);
						}
					}
					// this.arg0 is empty
					return reject(createError(400,TAG+" bad request invalid arg0"));

				}else{
					return reject(err);
				}
				return null;

			}.bind(this))
		});
	}

	async setProps(spell,logStack){

	}

	async setCx(spell,logStack){
		
		let sockCommand=spell.spellController.sockDeviceCommand;
		let obj=[];
		let l=this.args.length;

		if (check.nonEmptyArray(this.args) && l==4){
			
			for (let i=0; i< l ;i++){
				if (typeof this.args[i]=='object')
					obj[i]= await spell.executeSingleSpellEntry(this.args[i],logStack);
			else
					obj[i]=this.args[i];
			}

		}else{
			throw createError(400,TAG+" bad request missing args or invalid number of args");
		}
	
		return new Promise(function(resolve, reject) {
			sockCommand.send({method:'setCxValue',deviceId:obj[0],serviceId:obj[1],cxId:obj[2],value:obj[3]},function(err,result){

				if (result)
					return resolve(result);
				else
					return reject(err);
			});
		});
	}

	async getCx(spell,logStack){


		//return await spell.spellController.executeSpell(this.spellId,logStack);

		return [this.args[0],this.args[1],this.args[2]];
	}

	async getSrv(spell,logStack){
		return [this.args[0],this.args[1]];
	}

	async getDevice(spell,logStack){
		return [this.args[0]];
	}

	async getCxs(spell,logStack){
		//return await spell.spellController.executeSpell(this.spellId,logStack);
	}

	async getServices(spell,logStack){
		//return await spell.spellController.executeSpell(this.spellId,logStack);
	}

	async execute(spell,logStack,...constructorArgs){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		//
		// According to the MethodName...
		//

		if (check.not.undefined(this._method[this.methodName])==true){
			return await this._method[this.methodName](spell,logStack,constructorArgs[0])
		}else{
			throw (this.tag+" execute unknown methodName:"+this.methodName);
		}
	}
}

module.exports=object_Device;