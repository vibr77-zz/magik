"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';
import SunCalc from 'suncalc';
import spellPlugin from '../plugin'

var later = require('later');
const createError = require('http-errors');
const log =require( '../../../logger');
const {SpellCst} = require( '../../cst');
const moment = require('moment');

const TAG='objectTime';
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
  "description": "Time Object",
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
  	"methodName":{
  		"type":"string",
  		"enum":["timeComp","time","timeNow","timeBetween","timeAstro","timeOffset","timeDelay","timeTrigger","timeCron","timeWait","timeToString"]
  	},
  	"operator":{
  		"type":"string",
  		"enum":["before","equal","after"]
  	},
  	"args":{
  		"type":"array",
  		"minItems": 0
  	},
  	"objDo":{
  		"type":"array",
  		"minItems": 0
  	},
  	"trigger":{
  		"type":"boolean",
  		"default":false
  	},
  	"triggerEvents":{
  		"type":"array"
  	}
  },
  "required": [ "_id", "type","methodName"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}



class object_Time extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.methodName=entry.methodName;
		this.args=entry.args;
		this.operator=entry.operator;
		this.objDo=entry.objDo;

		//
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["timeComp"]=this.timeComp.bind(this);
		this._method["time"]=this.time.bind(this);
		this._method["timeNow"]=this.timeNow.bind(this);
		
		this._method["timeBetween"]=this.timeBetween.bind(this);
		this._method["timeAstro"]=this.timeAstro.bind(this);
		
		this._method["timeOffset"]=this.timeOffset.bind(this);
		this._method["timeDelay"]=this.timeDelay.bind(this);
		this._method["timeTrigger"]=this.timeTrigger.bind(this);
		this._method["timeCron"]=this.timeCron.bind(this);
		this._method["timeWait"]=this.timeWait.bind(this);
		this._method["timeToString"]=this.timeToString.bind(this);
		
		this._status=checkEntry(entry);
	}
	_slp(ms) {
  	return new Promise(resolve => setTimeout(resolve, ms*1000));
	}

	parseMoment(args){
		if (args[0]==undefined || args[1]==undefined)
			throw this.tag+" parseMoment invalid input";

		return moment(args[0]+':'+args[1],'HH:mm');
	}

	pad2(number) {
   return (number < 10 ? '0' : '') + number
	}

	async timeComp(spell,logStack){
		
		let obj_0;
		let obj_1;

		if(typeof this.args[0]==undefined || typeof this.args[1]==undefined)
			throw this.tag+" timeComp invalid input args";

		if (typeof this.args[0]=="object"){
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_0=this.args[0];
		}
		if (typeof this.args[1]=="object"){
				obj_1= await spell.executeSingleSpellEntry(this.args[1],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_1=this.args[1];
		}
		
		let moment_0=this.parseMoment(obj_0);
		let moment_1=this.parseMoment(obj_1);
		
		let ret=false;
		
		if (this.operator==="before"){
			 ret=moment(moment_0).isBefore(moment_1);
		}
		
		if (this.operator==="equal"){
			ret=moment(moment_0).isSame(moment_1);
		}

		if (this.operator==="after"){
			ret=moment(moment_0).isAfter(moment_1);
		}
		return ret
	}

	async time(spell,logStack){
		
		if(typeof this.args[0]==undefined || typeof this.args[1]==undefined)
			throw this.tag+" timeComp invalid input args null";

		if (typeof this.args[0]!="number" || typeof this.args[1]!="number")
			throw this.tag+" timeComp invalid input args not a number";

		if (this.args[0]>23)
			throw this.tag+" timeComp invalid input args hour is after 23";

		if (this.args[1]>59)
			throw this.tag+" timeComp invalid input args min is after 59";

		let ret=[this.args[0],this.args[1]];
		logStack.push({_id:this._id,methodName:"time",type:this.tag,status:true,timestamp:new Date(),output:ret});
		
		return ret;
	}

	async timeNow(spell,logStack){
		const dt = new Date();
		let h=dt.getHours();
		let m=dt.getMinutes();
		let ret=[h,m];
		logStack.push({_id:this._id,methodName:"timeNow",type:this.tag,status:true,timestamp:new Date(),output:ret});
		
		return ret;
	}

	async timeBetween(spell,logStack){
		let obj_0;
		let obj_1;
		let obj_2;

		if(typeof this.args[0]==undefined || typeof this.args[1]==undefined ||  typeof this.args[2]==undefined)
			throw this.tag+" timeBetween invalid input args null";

		let logObj0=[];
		let logObj1=[];
		let logObj2=[];
		try{
			if (typeof this.args[0]=="object"){
					obj_0= await spell.executeSingleSpellEntry(this.args[0],logObj0);
			}else{ // maybe need to manage boolean // need to test
					obj_0=this.args[0];
			}
			
			if (typeof this.args[1]=="object"){
					obj_1= await spell.executeSingleSpellEntry(this.args[1],logObj1);
			}else{ // maybe need to manage boolean // need to test
					obj_1=this.args[1];
			}

			if (typeof this.args[2]=="object"){
					obj_2= await spell.executeSingleSpellEntry(this.args[2],logObj2);
			}else{ // maybe need to manage boolean // need to test
					obj_2=this.args[2];
			}
		}catch(e){
			logStack.push({_id:this._id,methodName:"timeBetween",type:this.tag,status:400,error:createError(400, 'Error resulting obj_0 obj_1 obj_2'),timestamp:new Date()});
			return false;	
		}

		if (typeof obj_0[0]!="number" || obj_0[0]>24 || typeof obj_0[1]!="number" || obj_0[1]>59 ||
				typeof obj_1[0]!="number" || obj_1[0]>24 || typeof obj_1[1]!="number" || obj_1[1]>59 ||
				typeof obj_2[0]!="number" || obj_2[0]>24 || typeof obj_2[1]!="number" || obj_2[1]>59){

			logStack.push({_id:this._id,methodName:"timeBetween",type:this.tag,status:400,error:createError(400, 'Error resulting obj_0 obj_1 obj_2 is invalid exiting '),timestamp:new Date()});
			throw this.tag+" timeBetween resulting obj_0 obj_1 obj_2 is invalid exiting";
		}
			
		let moment_0=this.parseMoment(obj_0);
		let moment_1=this.parseMoment(obj_1);
		let moment_2=this.parseMoment(obj_2);

		// Manage if moment 1 is before or after moment 2

		let ret=false;
		if (moment(moment_1).isAfter(moment_2)){
			if (moment(moment_0).isAfter(moment_2) && moment(moment_0).isBefore(moment_1))
				ret=true
		}else{
			if (moment(moment_0).isAfter(moment_1) && moment(moment_0).isBefore(moment_2))
				ret=true
		}

		logStack.push({_id:this._id,methodName:"timeBetween",type:this.tag,status:true,timestamp:new Date(),obj0:logObj0,obj1:logObj1,obj2:logObj2,output:ret});
		log.info(this.tag+" timeBetween return:"+ret);
		return ret;
	}

	async timeOffset(spell,logStack){
		let obj_0;
		
		if(typeof this.args[0]==undefined || typeof this.args[1]==undefined ||  typeof this.args[2]==undefined)
			throw this.tag+" timeOffset invalid input args null";

		if(typeof this.args[1]!="number" ||  typeof this.args[2]!="number")
			throw this.tag+" timeOffset invalid input args[1] & args[2] not numbers";

		if (typeof this.args[0]=="object"){
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_0=this.args[0];
		}

		let moment_0=this.parseMoment(obj_0);
		let newMoment=moment(moment_0).add(this.args[1],"h").add(this.args[2],"m");

		logStack.push({_id:this._id,methodName:"timeOffset",type:this.tag,status:true,timestamp:new Date(),output:ret});
		
		let ret=[newMoment.hours(),newMoment.minutes()];
		return ret;
	}

	async timeAstro(spell,logStack){
		
		let obj_0;
		if (typeof this.args[0]=="object"){
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_0=this.args[0];
		}

		let sunTime=SunCalc.getTimes(new Date(),44.6333,-1.15);

		if (!sunTime || !sunTime[obj_0] || check.date(sunTime[obj_0])==false)
  		throw this.tag+" timeAstro error timeAstro not a date";

  	let ret=[sunTime[obj_0].getHours(), sunTime[obj_0].getMinutes()];
  	logStack.push({_id:this._id,methodName:"timeAstro",type:this.tag,status:true,Astro:obj_0,timestamp:new Date(),output:ret});
		
  	return ret;
	}

	async timeDelay(spell,logStack){
		
		let obj_0;
		
		if(typeof this.args[0]==undefined){
			logStack.push({_id:this._id,methodName:"timeDelay",type:this.tag,status:400,error:createError(400, 'int args null'),timestamp:new Date()});
			throw this.tag+" timeDelay invalid input args null";
		}
		
		try{
			if (typeof this.args[0]=="object"){
					obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{ // maybe need to manage boolean // need to test
					obj_0=this.args[0];
			}
		}catch(e){
			logStack.push({_id:this._id,methodName:"timeDelay",type:this.tag,status:400,error:createError(400, 'Error evaluating args[0] exiting ',{error:e}),timestamp:new Date()});
			log.error(this.tag+" timeDelay evaluating args[0] error:"+e);
			return false;
		}

		if (typeof obj_0!="number"){
			logStack.push({_id:this._id,methodName:"timeDelay",type:this.tag,status:400,error:createError(400, 'Resulting args=0 or not a number'),timestamp:new Date()});
			throw this.tag+" timeWait error resulting input args gives invalid input or 0, existing";
		}

		if (obj_0 > SpellCst.SPELL_MAX_TIMEDELAY_IN_MS){
			log.warn(this.tag+"timeWait duration exceed max allowed duration setting to max:"+SpellCst.SPELL_MAX_TIMEDELAY_IN_MS);
			obj_0=SpellCst.SPELL_MAX_TIMEDELAY_IN_MS;
		}

		let lg={_id:this._id,methodName:"timeDelay",type:this.tag,status:true,timestamp:new Date(),delay:obj_0,doBlock:[]}
		logStack.push(lg)

		await setTimeout(async function(){
			await this.iterateBlock(spell,lg.doBlock,this.objDo);
		}.bind(this),obj_0);
		return;
	}

	async timeWait(spell,logStack){
		let obj_0;
		
		if(typeof this.args[0]==undefined)
			throw this.tag+" timeOffset invalid input args null";
		
		try{
			if (typeof this.args[0]=="object"){
					obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{ // maybe need to manage boolean // need to test
					obj_0=this.args[0];
			}
		}catch(e){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'Error evaluating args[0] exiting ',{error:e}),timestamp:new Date()});
			log.error(this.tag+" timeWait evaluating args[0] error:"+e);
			return false;
		}

		if (typeof obj_0!="number"){
			log.warn(this.tag+" timeWait error resulting input args gives invalid input or 0, existing");
			logStack.push({_id:this._id,methodName:"timeWait",type:this.tag,status:400,error:createError(400, 'timeWait resulting args=0 or not a number'),timestamp:new Date()});
			throw this.tag+" timeWait error resulting input args gives invalid input or 0, existing";
		}

		if (obj_0 > SpellCst.SPELL_MAX_TIMEWAIT_IN_SEC){
			log.warn(this.tag+" timeWait duration exceed max allowed duration setting to max:"+SpellCst.SPELL_MAX_TIMEWAIT_IN_SEC);
			obj_0=SpellCst.SPELL_MAX_TIMEWAIT_IN_SEC;
		}

		logStack.push({_id:this._id,methodName:"timeWait",type:this.tag,status:true,timestamp:new Date(),wait:obj_0});
		log.info(this.tag+" timeWait sleep:"+obj_0);
	
		await this._slp(obj_0);
		return;
	}

	async timeToString(spell,logStack){
		let obj_0;
		
		if(typeof this.args[0]==undefined)
			throw this.tag+" timeToString invalid input args null";

		let subLg=[]
		if (typeof this.args[0]=="object"){
				obj_0= await spell.executeSingleSpellEntry(this.args[0],subLg);
		}else{ // maybe need to manage boolean // need to test
				obj_0=this.args[0];
		}

		if (typeof obj_0[0]!="number" || typeof obj_0[1]!="number")
			throw this.tag+" timeToString invalid input time in args[0]"

		let ret=this.pad2(obj_0[0])+":"+this.pad2(obj_0[1]);
		
		let lg={_id:this._id,methodName:"timeToString",type:this.tag,status:true,timestamp:new Date(),output:ret};
		lg.obj0=subLg;

		logStack.push(lg);
		return ret;
	}

	async timeTrigger(spell,logStack,event){

		if (event==null){
			log.info(this.tag+" timeTrigger event is null, returning (aka normal spell execution)");
			return false
		}

		if(typeof this.args[0]==undefined)
			throw this.tag+" timeTrigger invalid input args null";

		let obj_0;
		if (typeof this.args[0]=="object"){
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_0=this.args[0];
		}

		let moment_0=this.parseMoment(obj_0);
		let moment_event=this.parseMoment(event.time);

		return moment(moment_0).isSame(moment_event);
	}

	async timeCron(spell,logStack,event){

		if (event==null){
			log.info(this.tag+" timeCron event is null, returning (aka normal spell execution)");
			return false
		}

		let obj=[];

		for (let idx in this.args){
			let arg=this.args[idx];

			if (typeof arg=="object"){
				obj[idx]= await spell.executeSingleSpellEntry(arg,logStack);
			}else{ // maybe need to manage boolean // need to test
				obj[idx]=arg;
			}
		}
		let cronStr=obj[1]+" "+obj[2]+" "+obj[3]+" "+obj[4]+" "+obj[5];
		let d = new Date();
		later.date.localTime();
		var crn = later.parse.cron(cronStr);
		var valid = later.schedule(crn).isValid(d);

		return valid;
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

	async iterateBlock(spell,logStack,block){
		if (check.nonEmptyArray(block)==true){
			for (let bl of block){
				await spell.executeSingleSpellEntry(bl,logStack);
			}
		}
	}
}

module.exports=object_Time;