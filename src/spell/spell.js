const EventEmitter = require( 'events'); 

const check = require('check-types');
const {SpellEventTypes} =require( '../cst');
const clone =require( 'clone')
const log =require( '../../logger');

// TODO 
//	+ Recursive function to check syntax of every object

const SPELL_SCHEMA={
  "title": "Spell Schema",
  "description": "Spell Object",
  "type": "object",
  "properties": {
    "_id":{ 
    	"type":"string",
    	"pattern":"^[a-f\\d]{24}$"
    },
    "props":{
      "type": "object",
      "properties": {
        "displayName":{
          "type":"string",
          "pattern":"^[A-Za-z0-9_\-\\s]*$",
          "minLength": 1,
          "maxLength": 256
        },
        "description":{
          "type":"string",
          "pattern":"^[A-Za-z0-9_\-\\s]*$",
          "minLength": 1,
          "maxLength": 1024
        },
        "isHidden":{
          "type":"boolean",
          "default":true,
        },
        "parallelProcess":{
          "type":"boolean",
          "default":false,
        },
        "modificationDate":{
          "type":"string",
          "format":"date-time"
        },
        "creationDate":{
          "type":"string",
          "format":"date-time"
        },
        "maxExecutionLog":{
        	"type":"number",
        	"default":16,
        },
        "storeExecLog":{
          "type":"boolean",
          "default":false,
        },
        "categoryId":{
          "type":["string","null"]
  				//"pattern":"^[a-f\\d]{24}$"
        },
        "status":{
          "type":"boolean",
          "default":false,
        },
      },
      "additionalProperties": false,  
    },
    "spellEntries":{
    	"type":"array",
    	"items":{ "$ref": "#/definitions/spellEntry" }
    },
    "checkPass":{
      "type":"boolean",
      "default":false,
    },
    "executionLog":{"type":"array"}
  },
  "additionalProperties": false,
  "required":["props","_id"],
  "definitions": {
    "spellEntry": {
    	"type": "object",
  		"properties": {
	    	"_id":{ 
	    		"type":"string",
	    		"pattern":"^[a-f\\d]{24}$"
	    	},
	    	"type":{ 
	    		"type":"string"
	    	},
	    	"spellEntries":{
    			"type":"array",
    			"items":{ "$ref": "#/definitions/spellEntry" }
    		}
	    }
    }
  }
}

class Spell extends EventEmitter{

	static schema=SPELL_SCHEMA

	constructor(config,spellController,spellData) {
		super();
		this.tag='spell';

		this._config=config;
		this.spellController=spellController;
		this._controllers=spellController._controllers;

		this.props={
			displayName:'',
			isHidden:false,
			parallelProcess:false,
			description:'',
			storeExecLog:false,
			categoryId:'',
			status:false,
			creationDate:null,
			modificationDate:null,
			maxExecutionLog:16
		}
		
		this.checkPass=true;
		this.spellEntries=spellData.spellEntries;
		
		this.localVariable={}; 	// local var defined by plugin action_var;
		this.localList={}; 			// local list defined during execution;
		this.executionLog=spellData.executionLog || [];
		this._id=spellData._id;

		for (let key in (spellData.props || {})){
			if (this.props.hasOwnProperty(key)){
				this.props[key]=spellData.props[key];
			}
		}	
    this._loadSpellTrigger();
	}

	static dehydrate(sp){
    return {
      _id: sp._id,
      props: clone(sp.props),
      checkPass:sp.checkPass,
      spellEntries:clone(sp.spellEntries),
      executionLog:clone(sp.executionLog)
    }
  }

  addToExecutionStore(newLogStack){
    
    if (newLogStack==null || this.props.storeExecLog!=true)
      return null;

    if (this.executionLog==undefined)
    	this.executionLog=[];

    if (this.executionLog.length>=this.props.maxExecutionLog){
      while(this.executionLog.length>=this.props.maxExecutionLog){
        this.executionLog.pop();

      }
    }

    
    this.executionLog.unshift(newLogStack);
    return this.executionLog;
  }
	async executeSpell(lStack){

		let logStack=lStack ||{} ; // important if spell Exeecution is from another Spell or Event
		
		logStack={_id:this._id,type:'root',start:new Date(), parallelProcess:this.props.parallelProcess,status:this.props.status}
		logStack.execution=[];


		if (this.props.parallelProcess==false && this.spellController.isSpellAlreadyRunning(this)==true){
			log.warn(this.tag+' executeSpell _id:'+this._id+' parallelProcess:false && isSpellAlreadyRunning:true spell is already running');
			return;
		}

		this.spellController.addSpellToExecutionArray(this);
		if (check.boolean(this.props.status) && this.props.status==true){
			log.info(this.tag+' executeSpell('+this._id+') start()');
			await this._iterateSpell(this.spellEntries,logStack.execution);
			logStack.end=new Date();
			logStack.duration=(logStack.end-logStack.start)/1000;
		}else{
			log.warn(this.tag+' executeSpell('+this._id+') status:false stop()');
		}
		this.spellController.removeSpellFromExecutionArray(this);
		

		// Store LogStack
		this.addToExecutionStore(logStack);
		this.emit(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,this);

		//this.emit(SpellEventTypes.SPELL_EXECUTION,logStack);
	}

	setGlobalVariable(displayName,props){
		this.spellController.globalVariable[displayName]=clone(props);
		this.emit(SpellEventTypes.VAR_EVENT,props);
	}

	getGlobalVariable(displayName,props){
		return this.spellController.globalVariable[displayName];
	}

	setLocalVariable(displayName,props){
		this.localVariable[displayName]=clone(props);
		this.emit(SpellEventTypes.VAR_EVENT,props);
	}

	getLocalVariable(displayName,props){
		return this.localVariable[displayName];
	}

	checkSpell(){
		this.checkPass=true;
		try{
		this._checkSpell(this.spellEntries);
		}catch(e){
			console.log(e);
			this.checkPass=false;
			return this.checkPass;
		}
		if (this.checkPass==false)
			log.warn(this.tag+' checkSpell('+this._id+') checkPass:false');
		return this.checkPass;
	}

	_checkSpell(spellEntries){
		if (check.undefined(spellEntries))
			return;

		for (const entry of spellEntries) {		
			if (check.nonEmptyString(entry.type) && this._controllers[entry.type]){
				
				if(this._controllers[entry.type].checkEntry(entry)==false){
					log.warn(this.tag+' _checkSpell _id:'+entry._id+ '  spellEntry: '+entry.type+' -> check:false');
					this.checkPass=false;
					break;
				}
				this._checkSpell(entry.spellEntries);
			}

			else if (this._controllers[entry.type]==null){
				log.warn(this.tag+' _checkSpell _id:'+entry._id+ ' unknown spellEntry: '+entry.type+' -> skeeping()');
				this.checkPass=false;
				break;
			}
		}
	}

	_loadSpellTrigger(){
		for (const entry of this.spellEntries){
			if(entry.trigger==true ){
				this.spellController.registerTrigger(this._id,entry);
			}
		}
	}

	_unloadSpellTrigger(){
		for (const entry of this.spellEntries){
			if(entry.trigger==true ){
				this.spellController.unRegisterTrigger(this._id,entry);
			}
		}
	}
		
	// _checkSpellEntry(entry){
	// 	if (check.nonEmptyString(entry.type) && this._controllers[entry.type]){
	// 		log.info(this.tag+' _checkSpellEntry id: '+entry._id+' start()');	
	// 		return this._controllers[entry.type].check(entry);
	// 	}
	// }
	
	// insertSpellEntry(spellEntries,_id,newEntry){
	// 	let entry=this._findSpellEntry(spellEntries,_id);
	// 	if (entry &&  check.array(entry.spellEntries)){
	// 		if (this._controllers[newEntry.type].checkEntry(newEntry)==true){
	// 			entry.spellEntries.push(newEntry);
	// 			log.info(this.tag+' insertSpellEntry at id:'+_id+' succeed');
	// 			return true;
	// 		}else{
	// 			log.info(this.tag+' insertSpellEntry at id:'+_id+' failed syntax error');
	// 		}
	// 	}else if (entry){
	// 		log.warn(this.tag+' insertSpellEntry at id:'+_id+' failed reason: spellEntries is not an array');
	// 		return false;
	// 	}
		
	// 	log.warn(this.tag+' insertSpellEntry at id:'+_id+' failed reason: entry not found');
	// 	return false;
	// }

	// modifySpellEntry(spellEntries,_id,newParams){
	// 	// TODO Rajouter la verif des newParams;

	// 	let  entry=this._findSpellEntry(spellEntries,_id);
	// 	if (entry && check.nonEmptyString(entry.type) && this._controllers[entry.type]){
	// 		if ((this._controllers[entry.type]).checkEntry({id:'',params:newParams})==true){
	// 			entry.params=newParams;
	// 		}
	// 	}
	// }

	_findSpellEntry(spellEntries,_id){
		let ret=null;
		if (check.nonEmptyArray(spellEntries)){
			for (const entry of spellEntries) {
				if (_id==entry._id){
					return entry;
				}
				if (check.nonEmptyArray(entry.spellEntries)){
					ret=this._findSpellEntry(entry.spellEntries,_id);
					return ret;
				}
			}
		}
		return ret;
	}

	isEntryIdExist(spellEntries,_id){
		for (let entry of spellEntries){
			if (check.nonEmptyArray(entry.spellEntries)==true){
				if(this.isEntryIdExist(entry.spellEntries,_id)==true)
					return true;
			}
			if (entry._id==_id){
				log.warn(this.tag+" isEntryIdExist _id:"+_id+" result==true");
				return true
			}
		}
		return false;
	}

	// removeSpellEntry(spellEntries,_id){
	// 	let ret=false;
	// 	if (spellEntries){
	// 		let i=0;
	// 		for (const entry of spellEntries) {
	// 			if (_id==entry._id){
	// 				spellEntries.splice(i,1);
	// 				this.emit(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,this);
	// 				return true;
	// 			}
	// 			if (check.nonEmptyArray(entry.spellEntries)){
	// 				let ret=this.removeSpellEntry(entry.spellEntries,_id);
	// 				if (ret==true)
	// 					return true;
	// 			}
	// 			i++;
	// 		}
	// 	}
	// 	return ret;
	// }
	//sp.emit(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,sp);

	async executeSingleSpellEntry(obj,logStack,...constructorArgs){
		

		if (typeof obj!='object'){
			throw "executeSingleSpellEntry obj is not an obj";
		}

		if (obj==null)
			return null;
		
		if (check.nonEmptyString(obj.type) && this._controllers[obj.type]){
			//log.info(this.tag+' executeSpellEntry _id: '+obj._id+' type:'+obj.type+' start()');
			let actionCtrl=new this._controllers[obj.type](this._config,this,obj);
			let ret=await actionCtrl.execute(this,logStack,constructorArgs[0]);
			return ret;
		}else{
			throw "executeSingleSpellEntry obj.type:"+obj.type+" type is unknown";
		}
		return null;
	}

	// async executeSpellEntry(spellEntries,_id){
	// 	let entry=_findSpellEntry(spellEntries,_id);
	// 	if (check.nonEmptyString(entry.type) && this._controllers[entry.type]){
	// 		let actionCtrl=new this._controllers[entry.type](this._config,this,entry);
	// 		await actionCtrl.execute(this);
	// 	}else if (this._controllers[entry.type]==null){
	// 		log.warn(this.tag+' executeSpellEntry _id: '+entry._id+ ' unknown spellEntry:'+entry.type+' -> skeeping()');
	// 	}
	// }

	async _iterateSpell(spellEntries,logStack){
		for (const entry of spellEntries) {		
			if (check.nonEmptyString(entry.type) && this._controllers[entry.type]){
				try{
					await this.executeSingleSpellEntry(entry,logStack);
				}catch(e){
					console.log(e);
				}
			}else if (this._controllers[entry.type]==null){
				log.warn(this.tag+' _iterateSpell id:'+entry._id+ ' unknown spellEntry:'+entry.type+' -> skeeping()');
			}
		}
	}
}

module.exports=Spell;
