"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'

const log =require( '../../../logger');

const TAG='objectLogger';
const createError = require('http-errors');
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	logItem:''
	
}

const SCHEMA={
	"title": TAG,
  "description": "Control loop",
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
  	"logItem":{
 			"type":["string","object","number","boolean"]
  	},
  	"severity":{
 			"type":"string",
 			"enum":["INFO","WARN","ERROR"],
 			"default":"INFO"
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

class object_Logger extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);

		this.logItem=entry.logItem;
		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		let pLog='';
		let lg=[];

		try{
			if (typeof this.logItem=="object")
				pLog=pLog+await spell.executeSingleSpellEntry(this.logItem,lg);
			else
				pLog=pLog+this.logItem;
		}catch(e){
			logStack.push({_id:this._id,methodName:"execute",type:this.tag,status:400,error:createError(400, 'error evaluating args[0]'),timestamp:new Date()});
			throw (this.tag+" args[0] evaluation error");
		
		}

		logStack.push({_id:this._id,type:this.tag,timestamp:new Date(),info:pLog,obj:lg});
		log.info(pLog);

		return true;
	}
}

module.exports=object_Logger;