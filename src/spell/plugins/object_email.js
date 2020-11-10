"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
import nodemailer from "nodemailer";


const log =require( '../../../logger');
const {SpellCst} = require( '../../cst');
const TAG='objectEmail';
const VERSION='0.3';

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
  "description": "Spell Object",
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
  		"enum":["sendEmail"]
  	},
  	"args":{
  		"type":"array",
  		"minItems": 3,
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
  	}
  },
  "required": [ "_id", "type","args"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class object_Email extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.methodName=entry.methodName;
		this.spellId=entry.spellId

		//
		//	Bind the available methods to function 
		//
		this.args=entry.args;
		this._method={};
		this._method["sendEmail"]=this.sendEmail.bind(this);
		this.from=config.mailer.smtp_from;
		this._status=checkEntry(entry);

		this._transporter = nodemailer.createTransport({
    	host: config.mailer.smtp_host,
    	port: config.mailer.smtp_port,
    	secure: false, // true for 465, false for other ports 
  		tls: { rejectUnauthorized: false},
  		from: "vinceo@besson.be"
  	});
	}

	async sendEmail(spell,logStack){

		let mail={};
		let obj=[];
		
		for (let idx in this.args){
			let arg=this.args[idx];

			if (typeof arg=="object"){
				obj[idx]= await spell.executeSingleSpellEntry(arg,logStack);
			}else{ // maybe need to manage boolean // need to test
				obj[idx]=arg;
			}
		}
		console.log(obj);
		mail["from"]=this.from;
		mail["to"]=obj[0];
		mail["subject"]=obj[1];
		mail["text"]=obj[2];

		return await this._transporter.sendMail(mail, this._executionResult.bind(this))
	}

	_executionResult(err,info){
		
		console.log(err);
		console.log(info);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		//
		// According to the MethodName...
		//

		if (check.not.undefined(this._method[this.methodName])==true){
			return await this._method[this.methodName](spell,logStack)
		}else{
			throw (this.tag+" execute unknown methodName:"+this.methodName);
		}
	}
}

module.exports=object_Email;