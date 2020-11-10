"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const log =require( '../../../logger');

const TAG='controlNegate';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	leftOp:null,
	rightOp:null,
	operator:''
	
}

const SCHEMA={
	"title": TAG,
  "description": "Control Negatee",
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
  		"items":{
  			"type":["object","number","boolean","string"],
  		},
  		"maxItems": 1,
  		"minItems": 1
  	},
  	"output":{
  		"type":"boolean",
  		"default":false
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

class control_Negate extends spellPlugin{

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
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		let leftValue=null;
		let lgobj0=[]
		if (typeof this.args[0]=='object'){
			leftValue= await spell.executeSingleSpellEntry(this.args[0],lgobj0);
		}else{
			leftValue=this.args[0]
		}

		if(typeof leftValue!="boolean")
			throw this.tag+" execute Error: leftvalue is not a boolean";

		logStack.push({_id:this._id,type:this.tag,status:true,obj0:lgobj0,output:ret,timestamp:new Date(),props:this.props})

		let ret=true;
		if (leftValue==true)
			ret=false;
		
		return ret;
	}

}

module.exports=control_Negate;