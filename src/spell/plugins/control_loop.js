"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const {SpellCst} = require( '../../cst');
const log =require( '../../../logger');

const TAG='controlLoop';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	objCount:{},
	doLoop:[]
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
  	"objCount":{
  		"type":["object","number"]
  	},
  	"doLoop":{
  		"type":"array",
  		"minItems":0,
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
  	}
  },
  "required": [ "_id", "type","doLoop","objCount"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class control_Loop extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		this.objCount=entry.objCount;
		this.doLoop=entry.doLoop;

		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		let lgObjCount=[];
		let ret;
		try{

			if (typeof this.objCount=='object'){
				ret=await spell.executeSingleSpellEntry(this.objCount,lgObjCount);
			}else{
				ret=this.objCount;
			}
		}catch(e){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'error evaluating objCount exiting with false',{error:e}),timestamp:new Date()});
			log.error(this.tag+" execute evaluating objCount error:"+e);
			return false;
		}

		if(typeof ret!="number"){
			logStack.push({_id:this._id,type:this.tag,status:createError(400, 'error evaluating objCount is not returning a boolean'),timestamp:new Date()});
			throw(this.tag+ " execute error objCount is not returning a boolean");
		}

		let lg={_id:this._id,type:this.tag,status:true,timestamp:new Date(),objCount:lgObjCount,doLoopBlock:[]};
		log.info(this.tag+" _id:"+this._id+" execute count:"+ret);
		
		try{
			for (let i=0;i < this.objCount;i++){
				lg.doLoopBlock[i]={type:"iteration: "+i,iteration:i,block:[],timestamp:new Date()};
				let ret=await this.iterateBlock(spell,lg.doLoopBlock[i].block,this.doLoop)
				if (ret=="BREAK"){
					lg.doLoopBlock[i].push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),flow:"break"});
					return true;
				}
			}
			logStack.push(lg);
		}catch(e){
			lg.push({_id:this._id,type:this.tag,status:createError(500, 'error executing doLoop exiting',{error:e}),timestamp:new Date()});
			logStack.push(lg);
			log.error(this.tag+" execute evaluating doLoop error:"+e);
		}
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
						logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),flow:"continue"});
						break;
					}
				}
			}
		}
	}
}

module.exports=control_Loop;