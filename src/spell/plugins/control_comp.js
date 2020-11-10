"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const log =require( '../../../logger');

const TAG='controlComp';
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
  	"operator":{
  		"type":"string",
  		"enum":['equal','not_equal','inf','inf_equal','sup','sup_equal']
  	},
  	"args":{
  		"type":"array",
  		"items":{
  			"type":["object","number","boolean","string"]
  		},
  		"maxItems": 2,
  		"minItems": 2
  	},
  	"output":{
  		"type":"boolean",
  		"default":false
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

class control_Comp extends spellPlugin{

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
		// Evaluate left Operand

		let leftValue=null;
		let rightValue=null;
		
		let lgLeft=[];
		try{
			if (typeof this.args[0]=='object'){
				leftValue= await spell.executeSingleSpellEntry(this.args[0],lgLeft);
			}else{
				leftValue=this.args[0];
			}
		}catch(e){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'error evaluating leftValue returning false'),timestamp:new Date()});
			log.error(this.tag+" execute evaluating leftValue error:"+e);
			return false;
		}
		
		let lgRight=[];
		try{
			if (typeof this.args[1]=='object'){
				rightValue= await spell.executeSingleSpellEntry(this.args[1],lgRight);
			}else{
				rightValue=this.args[1];
			}
		}catch(e){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'error evaluating rightValue returning false'),timestamp:new Date()});
			log.error(this.tag+" execute evaluating rightValue error:"+e);
			return false;
		}

		let ret=false;
		switch(this.operator){
			case 'equal':
				ret=(leftValue===rightValue ? true : false)
			
			case 'not_equal':
				ret=(leftValue===rightValue ?false : true)

			case 'sup':
				if (typeof leftValue !="number" || typeof rightValue!="number" )
					throw (this.tag+" leftValue or rightValue is not a number")
				ret= (leftValue>rightValue ? true : false)
				break;
			case 'sup_equal':
				if (typeof leftValue !="number" || typeof rightValue!="number" )
					throw (this.tag+" leftValue or rightValue is not a number")
				ret= (leftValue>=rightValue ? true : false)
				break;
			case 'inf':
				if (typeof leftValue !="number" || typeof rightValue!="number" )
					throw (this.tag+" leftValue or rightValue is not a number")
				ret= (leftValue< rightValue ? true : false);
				break;
			case 'inf_equal':
				if (typeof leftValue !="number" || typeof rightValue!="number" )
					throw (this.tag+" leftValue or rightValue is not a number")
				ret= (leftValue<= rightValue ? true : false);
				break;
			default:
				ret=false;
				break;
		}
		logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),leftValue:lgLeft,rightValue:lgRight,output:ret,operator:operator});
		log.info(this.tag+" _id:"+this._id+" execute ret:"+ret+" leftValue:"+leftValue+" rightValue:"+rightValue+" operator:"+operator);
		
		return ret;
	}
}

module.exports=control_Comp;