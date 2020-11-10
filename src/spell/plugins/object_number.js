"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';

import spellPlugin from '../plugin'

const log =require( '../../../logger');

const TAG='objectNumber';
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
  "description": "objectNumber",
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
 			"enum":['modulo','root','neg','abs','sin','cos','tan','atan','asin','acos','add','power','multiply','divide','minus','square','round','random','roundUp','roundDown','Remainder','isOdd','isEven','isPrime','isWhole','isPositive','isNegative','isDivisibleBy']
  	},
  	"args":{
  		"type":"array",
  		"minItems": 1,
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

class object_Number extends spellPlugin{

	static tag=TAG;
	static version=VERSION;
	static checkEntry=checkEntry;
	static buildEntry=buildEntry;
	static eventTrigger=false;
	static schema=SCHEMA;

	constructor (config,spell,entry){
		super(config,spell,entry);
		this.args=entry.args;
		this.methodName=entry.methodName;

		//
		//	Bind the available methods to function 
		//

		this._method={};
		this._method["neg"]=this.neg.bind(this);
		this._method["abs"]=this.abs.bind(this);
		
		this._method["sin"]=this.sin.bind(this);
		this._method["cos"]=this.cos.bind(this);
		this._method["tan"]=this.tan.bind(this);
		
		this._method["asin"]=this.asin.bind(this);
		this._method["acos"]=this.acos.bind(this);
		this._method["atan"]=this.atan.bind(this);

		this._method["add"]=this.add.bind(this);
		this._method["minus"]=this.minus.bind(this);
		this._method["power"]=this.power.bind(this);
		this._method["multiply"]=this.multiply.bind(this);
		this._method["divide"]=this.divide.bind(this);
		this._method["square"]=this.square.bind(this);
		this._method["round"]=this.round.bind(this);
		this._method["roundUp"]=this.roundUp.bind(this);
		this._method["roundDown"]=this.roundDown.bind(this);
		this._method["random"]=this.random.bind(this);
		this._method["isOdd"]=this.isOdd.bind(this);
		this._method["isEven"]=this.isEven.bind(this);
		this._method["isPrime"]=this.isPrime.bind(this);
		this._method["isWhole"]=this.isWhole.bind(this);
		this._method["isPositive"]=this.isPositive.bind(this);
		this._method["isNegative"]=this.isNegative.bind(this);
		this._method["isDivisibleBy"]=this.isDivisibleBy.bind(this);


		this._method["ln"]=this.ln.bind(this);
		this._method["exp"]=this.exp.bind(this);
		this._method["root"]=this.root.bind(this);
		this._method["pow10"]=this.pow10.bind(this);
		this._method["modulo"]=this.modulo.bind(this);

		this._status=checkEntry(entry);
	}

	async evaluateArg(spell,arg,methodName,logStack,typechck){
		
		let argVal=null;
		try{
			if (typeof arg=="object"){
				argVal= await spell.executeSingleSpellEntry(arg,logStack);
			}else{
				argVal=arg;
			}
		}catch(e){
			console.log(e);
			logStack.push({_id:this._id,methodName:methodName,type:this.tag,status:400,error:createError(400, 'error evaluating args'),timestamp:new Date()});
			throw (this.tag+"arg evaluation error");
		}

		if(typechck && typeof(argVal)!=typechck){
			logStack.push({_id:this._id,methodName:methodName,type:this.tag,status:400,error:createError(400, 'arg is not a '+typechck),timestamp:new Date()});
			throw (this.tag+" arg is not returning a number");
		}
		return argVal;
	}

	async neg(spell,logStack){

		let leftVal=await this.evaluateArg(spell,this.args[0],"neg",logStack,"number");
		let ret=-leftVal;
		logStack.push({_id:this._id,methodName:"neg",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});
		return ret
	}

	async abs(spell,logStack){

		let leftVal=await this.evaluateArg(spell,this.args[0],"abs",logStack,"number");
		let ret=Math.abs(leftVal);
		logStack.push({_id:this._id,methodName:"abs",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async sin(spell,logStack){

		let leftVal=await this.evaluateArg(spell,this.args[0],"sin",logStack,"number");
		let ret=Math.sin(leftVal / 180 * Math.PI)
		logStack.push({_id:this._id,methodName:"sin",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret	
	}

	async cos(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"cos",logStack,"number");
		let ret=Math.cos(leftVal / 180 * Math.PI)
		logStack.push({_id:this._id,methodName:"cos",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async tan(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"tan",logStack,"number");
		let ret=Math.tan(leftVal / 180 * Math.PI)
		logStack.push({_id:this._id,methodName:"tan",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async asin(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"asin",logStack,"number");
		let ret=Math.asin(leftVal) / Math.PI * 180
		logStack.push({_id:this._id,methodName:"asin",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret

	}

	async acos(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"acos",logStack,"number");
		let ret=Math.acos(leftVal) / Math.PI * 180
		logStack.push({_id:this._id,methodName:"acos",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async atan(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"atan",logStack,"number");
		let ret=Math.atan(leftVal) / Math.PI * 180
		logStack.push({_id:this._id,methodName:"atan",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async ln(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"ln",logStack,"number");
		let ret=Math.log(leftVal);
		logStack.push({_id:this._id,methodName:"ln",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async exp(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"exp",logStack,"number");
		let ret=Math.exp(leftVal);
		logStack.push({_id:this._id,methodName:"exp",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret

	}

	async root(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"root",logStack,"number");
		let ret=Math.sqrt(leftVal);
		logStack.push({_id:this._id,methodName:"root",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async pow10(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"pow10",logStack,"number");
		let ret=Math.pow(10,leftVal);
		logStack.push({_id:this._id,methodName:"pow10",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async modulo(spell,logStack){

		let leftVal=await this.evaluateArg(spell,this.args[0],"modulo",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"modulo",logStack,"number");
		
		let ret=leftVal%rightVal;
		
		logStack.push({_id:this._id,methodName:"modulo",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;
	}


	async add(spell,logStack){
		
		let leftVal=await this.evaluateArg(spell,this.args[0],"add",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"add",logStack,"number");
		
		let ret=leftVal+rightVal;
		logStack.push({_id:this._id,methodName:"add",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;

	}

	async minus(spell,logStack){
		
		let leftVal=await this.evaluateArg(spell,this.args[0],"minus",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"minus",logStack,"number");
		
		let ret=leftVal-rightVal;
		logStack.push({_id:this._id,methodName:"minus",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;

	}

	async power(spell,logStack){
		
		let leftVal=await this.evaluateArg(spell,this.args[0],"power",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"power",logStack,"number");
		
		let ret=Math.pow(leftVal,rightVal);
		logStack.push({_id:this._id,methodName:"power",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;

	}
	
	async multiply(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"multiply",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"multiply",logStack,"number");
		let ret=leftVal*rightVal;
		logStack.push({_id:this._id,methodName:"multiply",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret
	}

	async divide(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"divide",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"divide",logStack,"number");
		
		if (rightVal==0){
			logStack.push({_id:this._id,methodName:"divide",type:this.tag,status:400,error:createError(400, 'args[1]==0 division by 0 impossible'),timestamp:new Date()});
			throw (this.tag+" division by zero impossible");
		}
		
		let ret=leftVal/rightVal;
		logStack.push({_id:this._id,methodName:"divide",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;
	}

	async square(spell,logStack){
		
		let leftVal=await this.evaluateArg(spell,this.args[0],"square",logStack,"number");
		let ret=leftVal*leftVal;
		logStack.push({_id:this._id,methodName:"square",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret 

	}	
	
	async round(spell,logStack){
	
		let leftVal=await this.evaluateArg(spell,this.args[0],"round",logStack,"number");
		let ret=Math.round(leftVal);
		logStack.push({_id:this._id,methodName:"round",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async roundUp(spell,logStack){
		

		let leftVal=await this.evaluateArg(spell,this.args[0],"roundUp",logStack,"number");
		let ret=Math.ceil(leftVal);
		logStack.push({_id:this._id,methodName:"roundUp",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async roundDown(spell,logStack){
	
		let leftVal=await this.evaluateArg(spell,this.args[0],"RoundDown",logStack,"number");
		let ret=Math.floor(leftVal);
		logStack.push({_id:this._id,methodName:"RoundDown",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret
	}

	async random(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"random",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"random",logStack,"number");
		

		let ret=0;
		if (leftVal> rightVal)
			ret= Math.floor(Math.random() * (leftVal - rightVal + 1)) + rightVal;
		else
			ret= Math.floor(Math.random() * (rightVal - leftVal + 1)) + leftVal;
		
		logStack.push({_id:this._id,methodName:"random",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;
	}

	async isOdd(spell,logStack){
		
		let leftVal=await this.evaluateArg(spell,this.args[0],"isOdd",logStack,"number");
		let ret= Math.abs(leftVal % 2) == 1;
		logStack.push({_id:this._id,methodName:"isOdd",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret;
	}

	async isEven(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"isEven",logStack,"number");

		let ret= Math.abs(leftVal % 2) == 0;
		logStack.push({_id:this._id,methodName:"isEven",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret;
	}

	async isPrime(spell,logStack){
		
		let leftVal=await this.evaluateArg(spell,this.args[0],"isPrime",logStack,"number");
		let ret= leftVal> 1;
		for(let i = 2; i < leftVal; i++){
    	if(leftVal % i === 0){
    		ret=false;
    		break;
    	}
    }
  	
		logStack.push({_id:this._id,methodName:"isPrime",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret;
	}

	async isWhole(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"isWhole",logStack,"number");
		let ret=leftVal % 1 == 0;
		
		logStack.push({_id:this._id,methodName:"isWhole",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret;
	}

	async isPositive(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"isPositive",logStack,"number");
		let ret=leftVal > 0;
		
		logStack.push({_id:this._id,methodName:"isPositive",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret;
	}

	async isNegative(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"isNegative",logStack,"number");
		
		let ret=leftVal < 0;
		
		logStack.push({_id:this._id,methodName:"isNegative",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,output:ret});

		return ret;
	}

	async isDivisibleBy(spell,logStack){
		let leftVal=await this.evaluateArg(spell,this.args[0],"isDivisibleBy",logStack,"number");
		let rightVal=await this.evaluateArg(spell,this.args[1],"isDivisibleBy",logStack,"number");
		
		let ret=leftVal  %  rightVal == 0
		
		logStack.push({_id:this._id,methodName:"isDivisibleBy",type:this.tag,status:true,timestamp:new Date(),obj0:leftVal,obj1:rightVal,output:ret});

		return ret;
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

module.exports=object_Number;