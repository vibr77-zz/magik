"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'

const log =require( '../../../logger');

const TAG='objectVariable';
const createError = require('http-errors');
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
  	"isGlobalScope":{
  		"type":"boolean",
  		"default":false
  	},
  	"methodName":{
 			"type":"string",
 			"enum":['setValue','getValue']
  	},
  	"args":{
  		"type":"array",
  		"minItems": 1
  	},
  	
  },
  "required": [ "_id", "type","args","methodName"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class object_Variable extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.args=entry.args;
		this.isGlobalScope=entry.isGlobalScope;
		this.methodName=entry.methodName;

		//
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["setValue"]=this.setValue.bind(this);
		this._method["getValue"]=this.getValue.bind(this);
		
		this._status=checkEntry(entry);
	}

	async setValue(spell,logStack){
		
		let val=null;
		try{
			if (typeof this.args[0]=="object"){
				val= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				val=this.args[0];
			}
		}catch(e){
			console.log(e);
			logStack.push({_id:this._id,type:this.tag,methodName:'setValue',status:500,error:createError(500, 'Error evaluating valueObj exiting '),timestamp:new Date(),props:this.props});
		}

		if (this.isGlobalScope==true)
			spell.setGlobalVariable(this.args[1],val);
		else{	
			spell.setLocalVariable(this.args[1],val);
		}

		return true;
	}

	getValue(spell,logStack){

		if (check.undefined(this.isGlobalScope) || this.isGlobalScope==false)
	 		return spell.getLocalVariable(this.args[0]);
	 	else
	 		return spell.getGlobalVariable(this.args[0]);
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
			return this._method[this.methodName](spell,logStack)
		}else{
			throw (this.tag+" execute unknown methodName:"+this.methodName);
		}
	}
}

module.exports=object_Variable;