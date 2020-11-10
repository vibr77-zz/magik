"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
import nodemailer from "nodemailer";


const log =require( '../../../logger');
const spawn = require('cross-spawn');
const createError = require('http-errors');

const TAG='objectSms';
const VERSION='0.4';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	methodName:'',
	to:'',
	subject:'',
	body:''
}

const SCHEMA={
	"title": TAG,
  "description": "SMS Object",
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
  		"enum":["sendSms","smsTrigger","getSmsProps"]
  	},
  	"trigger":{
  		"type":"boolean",
  		"default":false
  	},
  	"triggerEvents":{
  		"type":"array"
  	},
  	"args":{
  		"type":"array",
  		"minItems": 0,
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

class object_Sms extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.methodName=entry.methodName;
		this.args=entry.args;

		//
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["sendSms"]=this.sendSms.bind(this);
		this._method["getSmsProps"]=this.getSmsProps.bind(this);
		this._method["smsTrigger"]=this.smsTrigger.bind(this);

		this._status=checkEntry(entry);
	}

	async sendSms(spell,logStack){
		
		let to=null;
		let msg=null;
		
		console.log("sendSms execution");

		try{
			if (typeof this.args[0]=="object"){
				to= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				to=this.args[0];
			}

			
			if (typeof this.args[1]=="object"){
				msg= await spell.executeSingleSpellEntry(this.args[1],logStack);
			}else{
				msg=this.args[1];
			}
		}catch(e){
			logStack.push({_id:this._id,methodName:"sendSms",type:this.tag,status:400,error:createError(400, 'to / msg evaluation error'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		if (typeof to!="string" || typeof msg!="string"){
			logStack.push({_id:this._id,methodName:"sendSms",type:this.tag,status:400,error:createError(400, 'to / msg are not string'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		//let gammu = spawn('gammu', ['-c', '/etc/gammu-smsdrc', 'sendsms', 'TEXT', '06xxxxxxxx', '-text', 'Bip bip']);
		let result = spawn('/usr/bin/gammu-smsd-inject', ['TEXT', to, '-text', msg], { stdio: 'inherit' });
		console.log(result);
		//return await spell.spellController.executeSpell(this.spellId,logStack);
		//return await this._transporter.sendMail(this, this._executionResult.bind(this))
		return true
	}

	async getSmsProps(spell,logStack){
		// args[0] -> sms object assign to variable
		// args[1] -> sms props
		let sms=null;
		let props=null;
		let lgObj0=[];
		try{

			if (typeof this.args[0]=="object"){
				sms= await spell.executeSingleSpellEntry(this.args[0],lgObj0);
			}else{
				sms=this.args[0];
			}

			if (typeof this.args[1]=="object"){
				props= await spell.executeSingleSpellEntry(this.args[1],logStack);
			}else{
				props=this.args[1];
			}

		}catch(e){
			logStack.push({_id:this._id,methodName:"getSmsProps",type:this.tag,status:400,error:createError(400, 'sms / props evaluation error'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		if (props==null || sms==null){
			logStack.push({_id:this._id,methodName:"getSmsProps",type:this.tag,status:400,error:createError(400, 'sms / props input are null'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		let ret=null;
		if(sms[props]!=null && sms[props]!=undefined)
			ret=sms[props]
		
		logStack.push({_id:this._id,methodName:"getSmsProps",type:this.tag,status:true,timestamp:new Date(),obj0:lgObj0,property:props,output:ret});
		
		return ret;
	}

	async smsTrigger(spell,logStack,event){

		if (event==null){
			logStack.push({_id:this._id,methodName:"smsTrigger",type:this.tag,status:200,msg:"event is null returning",timestamp:new Date()});
			log.info(this.tag+" smsTrigger event is null, returning (aka normal spell execution)");
			return false;
		}

		// args[0]=option setToVariable boolean,
		// args[1]=variable name sms
		// args[2]=msisdn txt / regex
		// args[3]=msisdn op
		// args[4]=msg
		// args[5]=msg op

		// op could be EQUAL / NOT EQUAL / COONTAINS / NOT CONTAINS / REGEX
		// Ya du boulot ;)

		// event structure is msisdn & msg

		// Step 0 precheck
		if (event.msisdn==null || event.msg==null){
			logStack.push({_id:this._id,methodName:"smsTrigger",type:this.tag,status:400,error:createError(400, 'event .msg || msisdn are null'),timestamp:new Date()});
			throw (this.tag+" smsTrigger event .msg || MSISDN ==null");
		}

		// Step 0A create SMS Object :

		let smsObj={};

		smsObj.from=clone(event.msisdn);
		smsObj.msg=clone(event.msg);
		smsObj.creationDate=new Date();
		smsObj.status="RECEIVED";


		// Step 1 manage setVariable Option

		if (this.args[0]==true){
			if (typeof this.args[1]=="string" && check.nonEmptyString(this.args[1]))
				spell.setLocalVariable(this.args[1],smsObj);
		}

		let obj_2;
		if (typeof this.args[2]=="object"){
				obj_2= await spell.executeSingleSpellEntry(this.args[2],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_2=this.args[2];
		}

		let obj_3;
		if (typeof this.args[3]=="object"){
				obj_3= await spell.executeSingleSpellEntry(this.args[3],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_3=this.args[3];
		}

		let ret_1=true; // Ok execute trigger by default

		if (obj_2!=null){
			switch (obj_3){
				case 'EQUAL':
					if (event.msisdn!==obj_2)
						ret_1=false;
				break;
				
				case 'NOT_EQUAL':
					if (event.msisdn===obj_2)
						ret_1=false;
				break;
				
				case 'CONTAINS':
					if (event.msisdn.indexOf(obj_2)===-1)
						ret_1=false;
				break;
				
				case 'NOT_CONTAINS':
					if (event.msisdn.indexOf(obj_2)!==-1)
						ret_1=false;
				break;
				
				case 'REGEX':
					let reg=new RegExp(obj_2, "g");
					if (event.msisdn.match(reg)==null)
						ret_1=false;
				break;
			}
		}

		let obj_4;
		if (typeof this.args[4]=="object"){
				obj_4= await spell.executeSingleSpellEntry(this.args[4],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_4=this.args[4];
		}

		let obj_5;
		if (typeof this.args[5]=="object"){
				obj_5= await spell.executeSingleSpellEntry(this.args[5],logStack);
		}else{ // maybe need to manage boolean // need to test
				obj_5=this.args[5];
		}

		let ret_2=true; // Ok execute trigger by default
		if(obj_4!=null){
			switch (obj_5){

				case 'EQUAL':
					if (event.msg!==obj_4)
						ret_2=false;
				break;
				
				case 'NOT_EQUAL':
					if (event.msg===obj_4)
						ret_2=false;
				break;
				
				case 'CONTAINS':
					if (event.msg.indexOf(obj_4)===-1)
						ret_2=false;
				break;
				
				case 'NOT_CONTAINS':
					if (event.msg.indexOf(obj_4)!==-1)
						ret_2=false;
				break;
				
				case 'REGEX':
					let reg=new RegExp(obj_4, "g");
					if (event.msg.match(reg)==null)
						ret_2=false;
				break;
			}
		}

		if (ret_1===true && ret_2===true)
			return true;
		else 
			return false;
	}
	

	async execute(spell,logStack,...constructorArgs){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		console.log(spell);
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

module.exports=object_Sms;