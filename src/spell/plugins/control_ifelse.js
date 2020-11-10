"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const {SpellCst} = require( '../../cst');
const log =require( '../../../logger');

const TAG='controlIfelse';
const VERSION='0.3';

const TPL={
	_id:null,
	type:TAG,
	props:{
		toolTip:'',
		comment:''
	},
	objIf:{},
	doIf:[],
	doElse:[]
}

const SCHEMA={
	"title": TAG,
  "description": "Control If Else",
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
  	"objIf":{
  		"type":["object","boolean"]
  	},
  	"doIf":{
  		"type":"array",
  		"minItems":0,
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
  	},
  	"doElse":{
  		"type":"array",
  		"minItems":0,
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
  	}
  	
  },
  "required": [ "_id", "type","objIf","doElse","doIf"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class control_Ifelse extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		this.objIf=entry.objIf;
		this.doIf=entry.doIf;
		this.doElse=entry.doElse;

		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){
		
		//
		// TODO Manage Multiple Else IF BLock
		//


		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		//
		// Evaluate objIf Blocks
		//
		let lg={_id:this._id,type:this.tag,status:true,timestamp:new Date(),ifBlock:[],doIfBlock:[],doElseBlock:[]};
			
		let ret;
		try{
			if (typeof this.objIf=='object'){
				ret=await spell.executeSingleSpellEntry(this.objIf,lg.ifBlock);
			}else{
				ret=this.objIf;
			}
		}catch(e){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'error evaluating objIf exiting with false',{error:e}),timestamp:new Date()});
			log.error(this.tag+" execute evaluating leftValue error:"+e);
			return false;
		}

		if(typeof ret!="boolean"){
			logStack.push({_id:this._id,type:this.tag,status:400,error:createError(400, 'error evaluating objIf is not returning a boolean'),timestamp:new Date()});
			throw(this.tag+ " execute error objIf is not returning a boolean");
		}

		//
		// Execution of doIf / doElse Block
		//

		try{

			//logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),results:{objIf:ret}});
			log.info(this.tag+" _id:"+this._id+" execute ret:"+ret);

			if (ret===true){
				 await this.iterateBlock(spell,lg.doIfBlock,this.doIf);
			}else{
				 await this.iterateBlock(spell,lg.doElseBlock,this.doElse);
			}

			logStack.push(lg);
		
		}catch(e){
			logStack.push({_id:this._id,type:this.tag,status:createError(400, 'error executing doIf/doElse array exiting',{error:e}),timestamp:new Date()});
			log.error(this.tag+" execute evaluating leftValue error:"+e);
			return false;
		}
	}

	async iterateBlock(spell,logStack,block){
		let ret=null;
		if (check.nonEmptyArray(block)==true){
			for (let bl of block){
				ret=await spell.executeSingleSpellEntry(bl,logStack);

				if (bl.type=="controlFlow"){
					if (ret=="BREAK")
						return ret;
					else if (ret=="CONTINUE")
						break;
				}
			}
		}
	}
}

module.exports=control_Ifelse;