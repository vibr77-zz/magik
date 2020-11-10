"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const {SpellCst} = require( '../../cst');
const log =require( '../../../logger');

const TAG='controlWhile';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	objWhile:{},
	doWhile:[]
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
  	"objWhile":{
  		"type":["object","boolean"]
  	},
  	"doWhile":{
  		"type":"array",
  		"minItems":0,
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
  	}
  },
  "required": [ "_id", "type","objWhile","doWhile"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class control_While extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.objWhile=entry.objWhile;
		this.doWhile=entry.doWhile;
	
		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		let ret=false;
		do{
			try{
				if (typeof this.objWhile=='object'){
					ret=await spell.executeSingleSpellEntry(this.objWhile,logStack);
				}else{
					ret=this.objWhile;
				}
			}catch(e){
				logStack.push({_id:this._id,type:this.tag,status:createError(400, 'error evaluating objWhile exiting with false',{error:e}),timestamp:new Date()});
				log.error(this.tag+" execute evaluating objWhile error:"+e);
				return false;
			}

			if (typeof ret!="boolean"){
				logStack.push({_id:this._id,type:this.tag,status:createError(400, 'error evaluating objWhile is not returning a boolean'),timestamp:new Date()});
				throw(this.tag+ " execute error objWhile is not returning a boolean");
			}
			let retDo=null;
			try{
				retDo=await this.iterateBlock(spell,logStack,this.

					doWhile);
			}catch(e){
				logStack.push({_id:this._id,type:this.tag,status:createError(500, 'error executing doWhile exiting',{error:e}),timestamp:new Date()});
				log.error(this.tag+" execute evaluating doWhile error:"+e);
				return;
			}

			if (retDo=="BREAK"){
				logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),results:{flow:"break"}});
				return true
			}

			i++;
			if (i > SpellCst.SPELL_MAX_WHILE_LOOP)
				throw(this.tag+" execute number of execution > SPELL_MAX_WHILE_LOOP");

		}
		while(ret===true);

		return;
	}

	async iterateBlock(spell,logStack,block){
		let ret=null;
		if (check.nonEmptyArray(block)==true){
			for (let bl of block){
				ret=await spell.executeSingleSpellEntry(bl,logStack);
				if (bl.type=="controlFlow"){
					if (ret=="BREAK")
						return ret;
					else if (ret=="CONTINUE"){
						logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),results:{flow:"continue"}});
						break;
					}
				}
			}
		}
	}
}

module.exports=control_While;