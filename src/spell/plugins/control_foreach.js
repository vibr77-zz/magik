"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'
const createError = require('http-errors');
const {SpellCst} = require( '../../cst');
const log =require( '../../../logger');

const TAG='controlForeach';
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
  	"args":{
  		"type":"array",
  		"minItems": 0
  	},
  	"doLoop":{
  		"type":"array",
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
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

class control_Foreach extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		this.args=entry.args
		this.doLoop=entry.doLoop;

		this._status=checkEntry(entry);
	}

	async execute(spell,logStack){

		if (this._status==false){
			log.warn(this.tag+' execute:'+this._id+' initialization status:false');
			logStack.push({_id:this._id,type:this.tag,status:'false',timestamp:new Date(),props:this.props});
			return;
		}

		//
		// Add proper log management
		// args[0]=varName;
		// args[1]=array of item;
		//
		
		let lgObj1=[];
		let obj_1=null;
		if (typeof this.args[1]=='object')
				obj_1= await spell.executeSingleSpellEntry(this.args[1],logStack);
		else
				obj_1=this.args[1];


		if (check.array(obj_1)==false)
			throw this.tag+" execute error input args[1] is not an array";

		if (typeof this.args[0]!='string')
			throw this.tag+" execute error args[0] is not a strring"

		let varName=this.args[0];

		for (let item of obj_1){
			spell.localVariable[varName]=item;
			let ret=await this.iterateBlock(spell,logStack,this.doLoop)
			if (ret=="BREAK")
				return true;
		}
		return true;
	}

	async iterateBlock(spell,logStack,block){
		let ret=null;
		if (check.nonEmptyArray(block)==true){
			for (let bl of block){
				ret=await spell.executeSingleSpellEntry(bl,logStack);
				if (ret=="BREAK" || ret=="CONTINUE")
					console.log(ret);
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

module.exports=control_Foreach;