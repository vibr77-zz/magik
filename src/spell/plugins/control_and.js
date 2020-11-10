"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const log =require( '../../../logger');

const TAG='controlAnd';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	args:[],
	operator:''
	
}

const SCHEMA={
	"title": TAG,
  "description": "Control And",
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
  	"operator":{
  		"type":"string",
  		"enum":['AND','OR']
  	},
  	"args":{
  		"type":"array",
  		"items":{
  			"type":["object","number","boolean","string"],
  		},
  		"maxItems": 2,
  		"minItems": 2
  	},
  	"output":{
  		"type":"boolean",
  		"default":false
  	}
  },
  "required": [ "_id", "type","args","operator"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class control_And extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		this.args=entry.args
		this.operator=entry.operator;

		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		//
		// Evaluate Left & Right Operand

		let leftValue=false;
		let rightValue=false;
		
		let lgLeft=[];
		try{
			if (typeof this.args[0]=='object'){
				leftValue= await spell.executeSingleSpellEntry(this.args[0],lgLeft);
			}else{
				leftValue=this.args[0]
			}
		}catch(e){
			log.error(this.tag+" execute error:"+e);
			leftValue=false;
		}

		let lgRight=[];
		try{
			if (typeof this.args[1]=='object'){
				rightValue= await spell.executeSingleSpellEntry(this.args[1],lgRight);
			}else{
				rightValue=this.args[1];
			}
		}catch(e){
			log.error(this.tag+" execute error:"+e);
			rightValue=false;
		}

		if (typeof leftValue!="boolean" || typeof rightValue!="boolean"){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'resulting args[0] or args[1] not boolean'),timestamp:new Date(),args:this.args});
			throw createError(400, 'resulting args[0] or args[1] not boolean',{args:this.args})
		}

		let ret=false;
		if (this.operator==="AND" && leftValue===true && rightValue===true)
			ret=true;
		else if (this.operator==="OR" && (leftValue===true || rightValue===true))
			ret=true;
		
		logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),leftValue:lgLeft,rightValue:lgRight,output:ret,operator:operator});
		log.info(this.tag+" _id:"+this._id+" execute ret:"+ret+" leftValue:"+leftValue+" rightValue:"+rightValue+" operator:"+operator);
		return ret;
	}

}

module.exports=control_And;