"use strict";

import check 	from 'check-types';
import clone 	from 'clone';
import Ajv 		from 'ajv';
import {SpellEventTypes} from '../cst'

import {mongoObjectId} from '../lib/tools';

const EventEmitter = require( 'events'); 
const log =require( '../../logger');

function checkEntry(schema,entry){
	let ajv;
	try{
		ajv = new Ajv({allErrors: true});
	}catch(e){
		console.log(entry);
		return false;
	}
	

	if (ajv.validate(schema, entry)==true){
		return true;
	}
	else{
  	console.log("entry _id:"+entry._id+" type:"+entry.type+' data is INVALID!');
  	console.log(ajv.errors);
  	
  	console.log(entry._id+" error:"+ajv.errors);
  	return false;
  	//throw (entry._id+" error:"+ajv.error);

  	//return false;
	}
	return false;
}

function buildEntry(tpl,schema,props){

	let retEntry=clone(tpl);
	
	for (let key in (props|| {})){
		if (Object.prototype.hasOwnProperty.call(retEntry.props, key)) {
      retEntry.props[key] = props[key];
    }
  }

  retEntry._id=mongoObjectId();
	
  if (checkEntry(schema,retEntry)==true)
		return retEntry;
	else
		return null;
}

class spellPlugin extends EventEmitter{
	static gbuildEntry=buildEntry;
	static gcheckEntry=checkEntry;

	static dehydrate(entry){
		return{
			props:entry.props,
			_id:entry._id,
			spellEntries:entry.spellEntries,
			type:entry.type,
			tag:entry.type
		}
	}
	
	constructor(config,spell,entry){
		super();

		this.tag=entry.type;
		this._id=entry._id;

		this.props=entry.props;
		this.type=entry.type;
		this._status=false;
		this.error=null;
	}

	// registerTrigger(spellController,entry){
	// 	this.trig=this.execute.bind(this);
	// 	if (spellController.addTrigger(eventName,spellId,this._id,this)==true){
	// 		spellController.addListener(eventName,this.trig);
	// 		log.info(this.tag+" registerTrigger eventName:"+eventName+" spellId:"+spellId+" entryId:"+this._id);

	// 	}
	// }

	// unregisterTrigger(spellController,eventName){
	// 	spellController.removeListener(eventName,this.trig);
	// 	log.info(this.tag+" unregisterTrigger eventName:"+eventName+" entryId:"+this._id);
	// 	//console.log(spellController.listeners(eventName));
	// }
}

module.exports=spellPlugin;