"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'

const createError = require('http-errors');
const {SpellCst} = require( '../../cst');
const log =require( '../../../logger');

const TAG='controlFlow';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	args:[]
}

const SCHEMA={
	"title": TAG,
  "description": "Control Break",
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
  	"args":{
  		"type":"array",
  		"minItems": 1,
  		"maxItems": 1
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

class control_Flow extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		this.args=entry.args
		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:false,timestamp:new Date(),props:this.props});
			return;
		}

		//
		// Add proper log management
		//

		if (typeof this.args[0]!="string"){
			logStack.push({_id:this._id,type:this.tag,status:createError(400, 'args[0 is not a string'),timestamp:new Date(),args:this.args});
			throw this.tag+" execute args[0] is not a string";
		}


		if (this.args[0]!="CONTINUE" && this.args[0]!="BREAK"){
			logStack.push({_id:this._id,type:this.tag,status:createError(400, 'args[0 is not either CONTINUE / BREAL'),timestamp:new Date(),args:this.args});
			throw this.tag+" execute args[0] wrong value between CONTINUE / BREAK"
		}

		logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),flow:this.args[0]});
		log.info(this.tag+" _id:"+this._id+" execute ret:"+this.args[0]);
		return this.args[0];
	}
}

module.exports=control_Flow;