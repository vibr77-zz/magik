"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'

const log =require( '../../../logger');
const createError = require('http-errors');
const TAG='objectString';
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
  "description": "String Object",
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
 			"enum":['concat','toUpperCase','toLowerCase','toTitleCase','contains','isEmpty','multiLine','match','textParser','textReverseParser']
  	},
  	"args":{
  		"type":"array",
  		"items":{
  			"type":["object","number","boolean","string","null"],
  		},
  		"minItems": 1
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

class object_String extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		
		this.valueObj=clone(entry.valueObj);
		this.varName=entry.varName;

		this.isGlobalScope=entry.isGlobalScope;
		this.methodName=entry.methodName;

		this.args=entry.args

		//
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["concat"]=this.concat.bind(this);
		this._method["toUpperCase"]=this.toUpperCase.bind(this);
		this._method["toLowerCase"]=this.toLowerCase.bind(this);
		this._method["toTitleCase"]=this.toTitleCase.bind(this);
		this._method["contains"]=this.contains.bind(this);
		this._method["match"]=this.match.bind(this);
		this._method["isEmpty"]=this.isEmpty.bind(this);
		this._method["multiLine"]=this.multiLine.bind(this);
		this._method["textParser"]=this.textParser.bind(this);
		this._method["textReverseParser"]=this.textReverseParser.bind(this);

		this._status=checkEntry(entry);
	}

	async textReverseParser(spell,logStack){
		
		let lgTxt=[];
		let objTxt=null;
		
		try{
			if (typeof this.args[0]=="object"){
				objTxt= await spell.executeSingleSpellEntry(this.args[0],lgTxt);
			}else{ // maybe need to manage boolean // need to test
				objTxt=this.args[0];
			}
			
		}catch(e){
			console.log(e);
			logStack.push({_id:this._id,methodName:"textParser",type:this.tag,status:400,error:createError(400, 'error evaluating arg0'),timestamp:new Date()});
			throw (this.tag+" error evaluating args0");
		}
		
		let listOfText = [];
		let reBrackets = /\{(.*?)\}/g;
		let found;
		while(found = reBrackets.exec(objTxt)) {
  		listOfText.push(found[1]);
		};
		
		let len=this.args.length;
		let lg=[];
		let j=0;
		for (let i=1;i < len; i++){
			if(listOfText[j]!=undefined){
				spell.setLocalVariable(this.args[i],listOfText[j]);
			}
			j++;
		}

		console.log(listOfText)
		return true;
	}


	async textParser(spell,logStack){
	

		let lgTxt=[];
		let objTxt=null;
		try{
			if (typeof this.args[0]=="object"){
				objTxt= await spell.executeSingleSpellEntry(this.args[0],lgTxt);
			}else{ // maybe need to manage boolean // need to test
				objTxt=this.args[0];
			}
			
		}catch(e){
			console.log(e);
			logStack.push({_id:this._id,methodName:"textParser",type:this.tag,status:400,error:createError(400, 'error evaluating arg0'),timestamp:new Date()});
			throw (this.tag+" error evaluating args0");
		}

		let len=this.args.length;
		let lg=[];
		let j=0;
		for (let i=1;i < len; i++){
			
			let objVal='';
			let objArg=this.args[i];
			lg[j]=[];

			try{
				if (typeof this.args[i+1]=="object"){
					objVal= await spell.executeSingleSpellEntry(this.args[i+1],lg[j]);
				}else{ // maybe need to manage boolean // need to test
					objVal=this.args[i+1];
				}

				if (objVal!=null)
					objTxt=objTxt.replace("{"+objArg+"}",objVal);
				i++;
				j++;
			}catch(e){
				console.log(e);
				logStack.push({_id:this._id,methodName:"textParser",type:this.tag,status:400,error:createError(400, 'error evaluating arg'),timestamp:new Date()});
				throw (this.tag+" error evaluating args");
			}
		}
		//console.log(objTxt);
		return objTxt;
	}

	async concat(spell,logStack){
	
		let retString='';

		let i=0;
		let lg=[];
		for (let obj of this.args){
			lg[i]={type:"iteration "+i,timestamp:new Date(),obj:[]}
			let objVal='';
			try{
				if (typeof obj=="object"){
					objVal= await spell.executeSingleSpellEntry(obj,lg[i].obj);
				}else{ // maybe need to manage boolean // need to test
					objVal=obj;
				}

				i++;
				if (objVal!=null)
					retString+=objVal;
			}catch(e){
				console.log(e);
				logStack.push({_id:this._id,methodName:"toUpperCase",type:this.tag,status:400,error:createError(400, 'error evaluating arg'),timestamp:new Date()});
				throw (this.tag+" error evaluating args");
			}
		}

		logStack.push({_id:this._id,methodName:"concat",type:this.tag,status:true,timestamp:new Date(),args:lg,output:retString});
		
		return retString
	}

	async toTitleCase(spell,logStack){
		
		let leftVal=null;
		if (typeof this.args[0]=="object"){
			leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{
			leftVal=this.args[0];
		}

		if(typeof(leftVal)!="string"){
			logStack.push({_id:this._id,methodName:"toTitleCase",type:this.tag,status:400,error:createError(400, 'leftVal is not a string'),timestamp:new Date()});
			throw (this.tag+" leftVal is not returning a string");
		}

		let ret=leftVal.replace(/\w\S*/g,function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
		
		logStack.push({_id:this._id,methodName:"toTitleCase",type:this.tag,status:true,timestamp:new Date(),output:ret});
		return ret;
	}

	async toUpperCase(spell,logStack){
		let leftVal=null;
		if (typeof this.args[0]=="object"){
			leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
		}else{
			leftVal=this.args[0];
		}

		
		if(typeof(leftVal)!="string"){
			logStack.push({_id:this._id,methodName:"toUpperCase",type:this.tag,status:400,error:createError(400, 'leftVal is not a string'),timestamp:new Date()});
			throw (this.tag+" leftVal is not returning a string");
		}

		let ret=leftVal.toUpperCase();
		logStack.push({_id:this._id,methodName:"toUpperCase",type:this.tag,status:true,timestamp:new Date(),output:ret});
		
		return ret;
	}

	async toLowerCase(spell,logStack){
		
		let leftVal=null;
		try{
			if (typeof this.args[0]=="object"){
				leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				leftVal=this.args[0];
			}
		}catch(e){

		}

		if(typeof(leftVal)!="string"){
			logStack.push({_id:this._id,methodName:"toLowerCase",type:this.tag,status:400,error:createError(400, 'leftVal is not a string'),timestamp:new Date()});
			throw (this.tag+" leftVal is not returning a string");
		}

		let ret=leftVal.toLowerCase();
		logStack.push({_id:this._id,methodName:"toLowerCase",type:this.tag,status:true,timestamp:new Date(),output:ret});
		return ret;
	}

	async contains(spell,logStack){
		let leftVal=null;
		let rightVal=null;

		try{
			if (typeof this.args[0]=="object"){
				leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				leftVal=this.args[0];
			}

			
			if (typeof this.args[1]=="object"){
				rightVal= await spell.executeSingleSpellEntry(this.args[1],logStack);
			}else{
				rightVal=this.args[1];
			}
		
		}catch(e){
			logStack.push({_id:this._id,methodName:"contains",type:this.tag,status:400,error:createError(400, 'leftVal / rightVal evaluatiion error'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		if(typeof(leftVal)!="string" || typeof(rightVal)!="string"){
			logStack.push({_id:this._id,methodName:"contains",type:this.tag,status:400,error:createError(400, 'leftVal / rightVal is not a string'),timestamp:new Date()});
			throw (this.tag+" leftVal is not returning a string");
		}

		let ret=leftVal.indexOf(rightVal)==-1 ? false:true;
		logStack.push({_id:this._id,methodName:"contains",type:this.tag,status:true,timestamp:new Date(),leftVal:leftVal,rightVal:rightVal,output:ret});
		
		return ret
	}

	async isEmpty(spell,logStack){
		let leftVal=null;
		try{
			if (typeof this.args[0]=="object"){
				leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				leftVal=this.args[0];
			}
		}catch(e){
			logStack.push({_id:this._id,methodName:"isEmpty",type:this.tag,status:400,error:createError(400, 'leftVal evaluation error'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		if(typeof(leftVal)!="string"){
			logStack.push({_id:this._id,methodName:"isEmpty",type:this.tag,status:400,error:createError(400, 'leftVal  is not a string'),timestamp:new Date()});
			throw (this.tag+" leftVal is not returning a string");
		}

		let ret=check.nonEmptyString(leftVal) ? false:true;
		logStack.push({_id:this._id,methodName:"isEmpty",type:this.tag,status:true,timestamp:new Date(),leftVal:leftVal,rightVal:rightVal,output:ret});
		
		return ret;
	}

	async multiLine(spell,logStack){
		let leftVal=null;
		try{
			if (typeof this.args[0]=="object"){
				leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				leftVal=this.args[0];
			}
		}catch(e){
			logStack.push({_id:this._id,methodName:"multiLine",type:this.tag,status:400,error:createError(400, 'leftVal evaluation error'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		if(typeof(leftVal)!="string"){
			logStack.push({_id:this._id,methodName:"multiLine",type:this.tag,status:400,error:createError(400, 'leftVal  is not a string'),timestamp:new Date()});
			throw (this.tag+" leftVal is not returning a string");
		}

		return leftVal;
	}

	async match(spell,logStack){
		let leftVal=null;
		let rightVal=null;
		try{
			if (typeof this.args[0]=="object"){
				leftVal= await spell.executeSingleSpellEntry(this.args[0],logStack);
			}else{
				leftVal=this.args[0];
			}

			
			if (typeof this.args[1]=="object"){
				rightVal= await spell.executeSingleSpellEntry(this.args[1],logStack);
			}else{
				rightVal=this.args[1];
			}
		}catch(e){
			logStack.push({_id:this._id,methodName:"contains",type:this.tag,status:400,error:createError(400, 'leftVal / rightVal evaluation error'),timestamp:new Date()});
			throw (this.tag+" leftVal / rightVal evaluation error");
		}

		if(typeof(leftVal)!="string" || typeof(rightVal)!="string"){
			logStack.push({_id:this._id,methodName:"match",type:this.tag,status:400,error:createError(400, 'leftVal / rightVal is not a string'),timestamp:new Date()});
			
			throw (this.tag+" leftVal / rightVal is not returning a string");
		}

		let reg=new RegExp(rightVal, "g");
		return leftVal.match(reg);
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

module.exports=object_String;