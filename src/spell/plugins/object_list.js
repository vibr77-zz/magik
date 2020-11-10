"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';
import SunCalc from 'suncalc';
import spellPlugin from '../plugin'
const {SpellCst} = require( '../../cst');
const createError = require('http-errors');
const log =require( '../../../logger');

const moment = require('moment');

const TAG='objectList';
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
  "description": "Time Object",
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
  		"enum":["emptyList","removeIndex","listWith","isEmpty","lengthOf","findFirst","findLast","getIdxFromStart","getIdxFromEnd","getFirst","getLast","getRandom",
  		"setIdxFromStart","setIdxFromEnd","setFirst","setLast","setRandom"]
  	},
  	"mode":{
  		"type":"string"
  	},
  	"args":{
  		"type":"array",
  		"minItems": 0,
  		"maxItems":SpellCst.SPELL_MAX_NESTED_ITEMS
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



class object_List extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.methodName=entry.methodName;
		this.args=entry.args;
		this.mode=entry.mode;

		//	
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["emptyList"]=this.emptyList.bind(this);
		this._method["removeIndex"]=this.removeIndex.bind(this);
		this._method["listWith"]=this.listWith.bind(this);
		this._method["isEmpty"]=this.isEmpty.bind(this);
		this._method["lengthOf"]=this.lengthOf.bind(this);
			
		this._method["getIdxFromStart"]=this.getIdxFromStart.bind(this);
		this._method["getIdxFromEnd"]=this.getIdxFromEnd.bind(this);
		this._method["getFirst"]=this.getFirst.bind(this);
		this._method["getLast"]=this.getLast.bind(this);
		this._method["getRandom"]=this.getRandom.bind(this);

		this._method["setIdxFromStart"]=this.setIdxFromStart.bind(this);
		this._method["setIdxFromEnd"]=this.setIdxFromEnd.bind(this);
		this._method["setFirst"]=this.setFirst.bind(this);
		this._method["setLast"]=this.setLast.bind(this);
		this._method["setRandom"]=this.setRandom.bind(this);
		
		this._status=checkEntry(entry);
	}
	_slp(ms) {
  	return new Promise(resolve => setTimeout(resolve, ms*1000));
	}

	parseMoment(args){
		return moment(args[0]+':'+args[1],'HH:mm');
	}
	
	async removeIndex(spell,logStack){

		let obj_0=null;
		let obj_1=null;
		try{
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		
		if (typeof this.args[1]=='object')
				obj_1= await spell.executeSingleSpellEntry(this.args[1],logStack);
		else
				obj_1=this.args[1];

		}catch(e){
			console.log(e);
		}

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{
			if (this.mode=="FIRST")
				obj_0.splice(0,1);
			else if (this.mode=="LAST")
				obj_0.pop()
			else{
				let len=obj_0.length-1;
				if (obj_1>len)
					obj_1=len;
				
				if (obj_1<0)
					obj_1=0;

				obj_0.splice(obj_1,1);
			}
		}
		return true;

	}
	async emptyList(spell,logStack){
		logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),results:{emptyList:[]}});
		log.info(this.tag+" _id:"+this._id+" emptyList");
		return [];
	}

	async listWith(spell,logStack){
		if (check.array(this.args)==false){
			logStack.push({_id:this._id,type:this.tag,status:createError(400, 'listWith error args is not an array'),timestamp:new Date()});
			throw this.tag+" Error: input arg not an array";
		}
		return this.args;
	}

	async isEmpty(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";
		return check.emptyArray(obj_0);
	}

	async lengthOf(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object'){
				logStack.push({_id:this._id,type:this.tag,status:createError(400, 'lengthOf error args[0] is not an array'),timestamp:new Date()});
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";
		
		logStack.push({_id:this._id,type:this.tag,status:true,timestamp:new Date(),results:{lengthOf:obj_0.length}});
		return obj_0.length;
	}

	async getFirst(spell,logStack){
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		
		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{
			if (this.mode=="GET")
				return obj_0[0];
			else if(this.mode="GET_REMOVE")
				return obj_0.splice(0,1);
			else 
				return obj_0.splice(0,1);
		}
	}

	async getLast(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{
			let len=obj_0.length-1;
			if (this.mode=="GET")
				return obj_0[len];
			else if(this.mode="GET_REMOVE")
				return obj_0.splice(len,1);
			else 
				return obj_0.splice(len,1);
		}
	}

	async getIdxFromStart(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{
			
			let len=obj_0.length-1;
			let idx=0;
			if (this.args[1]>len)
				idx=len;
			else
				idx=this.args[1];

			if (this.mode=="GET")
				return obj_0[idx];
			else if(this.mode="GET_REMOVE")
				return obj_0.splice(idx,1);
			else 
				return obj_0.splice(idx,1);
		}
	}

	async getIdxFromEnd(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{
			
			let len=obj_0.length-1;
			let idx=0;
			if (this.args[1]>len)
				idx=0;
			else
				idx=len-this.args[1];
			
			if (this.mode=="GET")
				return obj_0[idx];
			else if(this.mode="GET_REMOVE")
				return obj_0.splice(idx,1);
			else 
				return obj_0.splice(idx,1);

			//return obj_0[idx]; 
		}
	}

	async getRandom(spell,logStack){
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{
			let idx=0;
			let len=obj_0.length-1;
			if (len>0)
		 		idx=Math.floor(Math.random()*(len+1));
			
			if (this.mode=="GET")
				return obj_0[idx];
			else if(this.mode="GET_REMOVE")
				return obj_0.splice(idx,1);
			else 
				return obj_0.splice(idx,1);

			//return obj_0[idx]; 
		}
	}

	async setFirst(spell,logStack){

		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (typeof this.mode!="string" || (this.mode!="SET" && this.mode!="INSERT")){
			throw this.tag+" Error mode is invalid";
		}

		if (this.mode=="INSERT")
			obj_0.unshift(this.args[1])
		else if(this.mode=="SET")
			obj_0[0]=this.args[1];

		console.log(obj_0);
		return true;
	}

	async setLast(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (typeof this.mode!="string" || (this.mode!="SET" && this.mode!="INSERT")){
			throw this.tag+" Error mode is invalid";
		}

		let len=obj_0.length-1;

		if (this.mode=="INSERT")
			obj_0.push(this.args[1])
		else if(this.mode=="SET")
			obj_0[len]=this.args[1];

		console.log(obj_0);
	}

	async setIdxFromStart(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (typeof this.mode!="string" || (this.mode!="SET" && this.mode!="INSERT")){
			throw this.tag+" Error mode is invalid";
		}

		let obj_2=null
		if (typeof this.args[2]=='object')
				obj_2= await spell.executeSingleSpellEntry(this.args[2],logStack);
		else
				obj_2=this.args[2];

		if (typeof obj_2!="number")
			throw this.tag+" setIdxFromStart error: args[2] is not a number";

		let len=obj_0.length-1;
		if (obj_2>len)
				obj_2=len;

		if (this.mode=="INSERT")
			obj_0.splice(obj_2,0,this.args[1])
		else if(this.mode=="SET")
			obj_0[obj_2]=this.args[1];

		console.log(obj_0);
		return true; 
		
	}

	async setIdxFromEnd(spell,logStack){
		
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (typeof this.mode!="string" || (this.mode!="SET" && this.mode!="INSERT")){
			throw this.tag+" Error mode is invalid";
		}

		let obj_2=null
		if (typeof this.args[2]=='object')
				obj_2= await spell.executeSingleSpellEntry(this.args[2],logStack);
		else
				obj_2=this.args[2];

		if (typeof obj_2!="number")
			throw this.tag+" setIdxFromStart error: args[2] is not a number";

		let len=obj_0.length-1;
		if (obj_2>len)
			obj_2=0;
		else
			obj_2=len-obj_2;

		if (this.mode=="INSERT")
			obj_0.splice(obj_2,0,this.args[1])
		else if(this.mode=="SET")
			obj_0[obj_2]=this.args[1];

		console.log(obj_0);
		return true;  
		
	}

	async setRandom(spell,logStack){
		let obj_0=null;
		if (typeof this.args[0]=='object')
				obj_0= await spell.executeSingleSpellEntry(this.args[0],logStack);
		else
				obj_0=this.args[0];

		if (check.array(obj_0)==false)
			throw this.tag+" Error: input arg[0] not an array";

		if (check.emptyArray(obj_0)==true)
			return null;
		else{

			let idx=0;
			let len=obj_0.length-1;
			
			if (len>0)
		 		idx=Math.floor(Math.random()*(len+1));
			
		 	if (this.mode=="INSERT")
				obj_0.splice(idx,0,this.args[1])
			else if(this.mode=="SET")
				obj_0[idx]=this.args[1];
			return obj_0[idx]; 
		}
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

module.exports=object_List;