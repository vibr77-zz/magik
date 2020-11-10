"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'

const log =require( '../../../logger');

const TAG='objectSpell';
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
  "description": "Spell Object",
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
  	
  	"methodName":{
  		"type":"string",
  		"enum":["executeSpell","get","set"]
  	},
  	"args":{
  		"type":["array"]
  	}
  },
  "required": [ "_id", "type","methodName"],
  "additionalProperties": false
}

function checkEntry(entry){
	return spellPlugin.gcheckEntry(SCHEMA,entry);
}

function buildEntry(props){
	return spellPlugin.gbuildEntry(TPL,SCHEMA,props);
}

class object_Spell extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.methodName=entry.methodName;
		this.args=entry.args

		//
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["executeSpell"]=this.executeSpell.bind(this);
		this._method["get"]=this.get.bind(this);
		this._method["set"]=this.set.bind(this);

		this._status=checkEntry(entry);
	}
	async get(spell,logStack){
		
		if (check.nonEmptyString(this.args[0])){
			let spells=spell.spellController.spells
			let fName=this.args[1];
			
			for (let sp of spells){
				if (this.args[0]==sp._id){
					// args0 fieldName to value to be returned;
					if (this.args[1]!='_id' && sp.props[fName])
						return sp.props[fName]
					else if (fName=='_id') // May add additionnal field in the condition
						return sp[fName];
					break;
				}
			}
		}
		return null;
	}

	async set(spell,logStack){

	}

	async executeSpell(spell,logStack){
		//console.log(spell);
		return await spell.spellController.executeSpell(this.args[0],logStack);
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
			return await this._method[this.methodName](spell,logStack)
		}else{
			throw (this.tag+" execute unknown methodName:"+this.methodName);
		}
	}
}

module.exports=object_Spell;