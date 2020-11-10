
const EventEmitter = require( 'events'); 

const axon = require('pm2-axon');
const Ajv=require('ajv');

const Spell = require( './spell');
const Device = require( '../device/device');

const clone =require( 'clone');

const Service = require( '../device/service');
const Characteristic = require( '../device/characteristic');
const {Formats,Perms,Status,Units,CharacteristicEventTypes,DeviceEventTypes,SpellEventTypes,Domain} = require( '../cst');
const SunCalc = require( 'suncalc');
const nodeCron = require( 'node-cron');

const log =require( '../../logger');

const check = require('check-types');


function toCamelCase(str){
  return str.split(' ').map(function(word,index){
    // If it is the first word make sure to lowercase all the chars.
    if(index == 0){
      return word.toLowerCase();
    }
    // If it is not the first word only upper case the first char and lowercase the rest.
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}

class spellController extends EventEmitter{

	constructor(config,spellHandler,eventHandler) {
		super();

		this.tag='spellController';
		this._config=config;
		this.spellHandler=spellHandler;
		this._eventHandler=eventHandler;
		this.spells=[];
		this.spellTriggers={};
		this.sunTime=[];
		this.executionArray=[]; // array of spell in current execution
		this.globalVariable={}; // global variable defined by plugin action_var;

		this._controllers = require('require-all')({
  		dirname     :  __dirname + '/plugins',
  		excludeDirs :  /^\.(git|svn)$/,
  		filter: /^(?!.*\.(spec|test)\.js$).*\.js$/,
  		recursive   : false,
  		map: function (name, path) {
  			let name_1=name.replace(/\.[^/.]+$/, "")
    		return name_1.replace(/_([a-z])/g, function (m, c) {
      		return c.toUpperCase();
    		});
    	}
		});

		const sockSpellCommand=axon.socket('rep');
		sockSpellCommand.bind(config.app.sockSpellCommand);
		this.sockSpellCommand=sockSpellCommand;

		const sockDeviceCommand= axon.socket('req');
		this.sockDeviceCommand=sockDeviceCommand;
		sockDeviceCommand.connect(config.app.sockDeviceCommand);


		const sockDeviceEvent= axon.socket('sub-emitter');
		sockDeviceEvent.connect(config.app.sockDeviceEvent);
		this.sockDeviceEvent=sockDeviceEvent;

		const sockExternalEvent= axon.socket('sub');
		sockExternalEvent.bind(config.app.sockExternalEvent);
		this.sockExternalEvent=sockExternalEvent;

		

		// Check plugin compliance and load
		// this is to avoid unexpected exception

		for (var plugin in this._controllers) {
    	
    	if (this._controllers[plugin].prototype.hasOwnProperty("execute")==false || 
    			typeof this._controllers[plugin].prototype.execute!='function' 	||
    			
    			this._controllers[plugin].hasOwnProperty("buildEntry")==false ||
    			typeof this._controllers[plugin].buildEntry!="function" ||
    			
    			this._controllers[plugin].hasOwnProperty("checkEntry")==false ||
    			typeof this._controllers[plugin].checkEntry!="function" ||

    			this._controllers[plugin].hasOwnProperty("version")==false ||
    			this._controllers[plugin].hasOwnProperty("tag")==false ||

    			this._controllers[plugin].hasOwnProperty("schema")==false ){
    		
    		log.error('spell bad plugin:'+plugin+ ', tag:'+this._controllers[plugin].tag+', version:'+this._controllers[plugin].version );

    		delete this._controllers[plugin];

    	}else{
    		log.info('spell loaded plugin:'+plugin+ ', tag:'+this._controllers[plugin].tag+', version:'+this._controllers[plugin].version );
    	}	
		}
		
		// At init first trigger
		
		this._sunCalc();
		this._cronProcess();
		this._testRemoveSpellEntry();

		// Manage External Event


		this._subscribeExternalControllerEvent();
		this._subscribeDeviceControllerEvent();

		this.status=Status.READY;

		this.command();
	}
	
	_cronProcess(){
		nodeCron.schedule('* * * * *', function(){
  		let d = new Date();
  		log.info('spellController processTime cron task 1 min: '+d.getHours()+':'+d.getMinutes());
  		this._intervalProcess();
		}.bind(this));
	}

	async _intervalProcess(){

		let d = new Date();		

		if (this.spellTriggers[SpellEventTypes.TIME_EVENT]){

			for (let item of this.spellTriggers[SpellEventTypes.TIME_EVENT]){
				let entry=item.entry;
				for (let sp of this.spells){
					if (sp._id==item.spellId){	
						//let spell=new Spell(this._config,this,sp);
						let event={type:SpellEventTypes.TIME_EVENT,time:[d.getHours(),d.getMinutes()]};

						let lg=[];
						let ret=await sp.executeSingleSpellEntry(entry,lg,event);
						if (ret==true)
							sp.executeSpell();

						break;
					}
				}
			}
		}	
		return;
		
		for(let key in this.sunTime){
			if (d.getMinutes()==this.sunTime[key].getMinutes() && d.getHours()==this.sunTime[key].getHours()){
				let eventName='sunlight_'+key;
				this.emit(eventName,function(err,result){

				});
			}
		}
	}

	_sunCalc(){
		this.sunTime=SunCalc.getTimes(new Date(),44,6333,-1,15);
	}

	addSpellToExecutionArray(spell){
		this.executionArray.push(spell._id);
	}

	removeSpellFromExecutionArray(spell){
		for (let i in this.executionArray) {
			let entry=this.executionArray[i];
			if (spell._id==entry){
				this.executionArray.splice(i,1);
				return true;
			}
		}
		return false;
	}

	isSpellAlreadyRunning(spell){
		for (let entry of this.executionArray) {
			if (spell._id==entry){
				return true;
			}
		}
		return false;
	}

	registerTrigger(spellId,entry){
		let id=spellId+"-"+entry._id;
		for (let ev of entry.triggerEvents){
			if (ev==null){
				log.warn('spellController registerTrigger ev:null continue');
				continue;
			}

			if (this.spellTriggers[ev]){
				for(let idx in this.spellTriggers[ev]){
					let item=this.spellTriggers[ev][idx];
					if (item.id==id){
						log.error('spellController addTrigger error: can not load trigger twice key:'+id);
						break;
					}
				}
			}else{
				this.spellTriggers[ev]=[];
			}
			log.info("registerTrigger sucessful registration id:"+id+" event:"+ev+" entry.type:"+entry.type);
			this.spellTriggers[ev].push({id:id,spellId:spellId,entry:entry});	
		}	

		return true;
	}

	unRegisterTrigger(spellId,entry){
		let id=spellId+"-"+entry._id;
		for (let ev of entry.triggerEvents){
			if (this.spellTriggers[ev]){
				for(let idx in this.spellTriggers[ev]){
					let item=this.spellTriggers[ev][idx];
					if (item.id==id){
						this.spellTriggers[ev].splice(idx,1);
						break
					}
				}
			}
		}	
		return true;
	}


	_subscribeExternalControllerEvent(){
		this.sockExternalEvent.on('message',async function(event){
  		console.log(event);
  		if (event.type==null)
  			return;

  		if (this.spellTriggers[event.type]){
				for (let item of this.spellTriggers[event.type]){
					let entry=item.entry;
					for (let sp of this.spells){
						if (sp.props.status==true && sp._id==item.spellId){	
							let lg=[];
							let ret=await sp.executeSingleSpellEntry(entry,lg,event);
							if (ret==true)
								sp.executeSpell();
							break;
						}
					}
				}
			}

		}.bind(this));
	
	 	this.sockExternalEvent.on('connect', function(){
	 		console.log("sockExternalEvent connected to bind");
	 	})
	}

	 _subscribeDeviceControllerEvent(){
	 	

		this.sockDeviceEvent.on(DeviceEventTypes.CHARACTERISTIC_CHANGE,async function(msg){
			
			//
			// EventDevice Trigger
			//

			if (this.spellTriggers["eventDevice"]){
				for (let item of this.spellTriggers["eventDevice"]){
					let entry=item.entry;
					for (let sp of this.spells){
						if (sp.props.status==true && sp._id==item.spellId){	
							let lg=[];
							let ret=await sp.executeSingleSpellEntry(entry,lg,msg);
							if (ret==true)
								sp.executeSpell();
							break;
						}
					}
				}
			}

			//
			// eventService Trigger
			//

			if (this.spellTriggers["eventService"]){
				for (let item of this.spellTriggers["eventService"]){
					let entry=item.entry;
					for (let sp of this.spells){
						if (sp.props.status==true && sp._id==item.spellId ){	
							let lg=[];
							let ret=await sp.executeSingleSpellEntry(entry,lg,msg);
							if (ret===true){
								console.log("god");	
								sp.executeSpell();
							}else{
								console.log('not good');
							}
							break;
						}
					}
				}
			}

			//
			// eventCx Trigger
			//

			if (this.spellTriggers["eventCx"]){
				for (let item of this.spellTriggers["eventCx"]){
					let entry=item.entry;
					for (let sp of this.spells){
						if (sp.props.status==true && sp._id==item.spellId){	
							let lg=[];
							let ret=await sp.executeSingleSpellEntry(entry,lg,msg);
							if (ret===true){
								console.log("god");	
								sp.executeSpell();
							}else{
								console.log('not good');
							}
							break;
						}
					}
				}
			}

		}.bind(this));
	}

	_subscribeToSpellEvent(spell){	
		spell.on(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,function(sp){
			log.info(this.tag+' spell _id:'+sp._id+ ', saved to handler');
			this.spellHandler.update(sp);
		}.bind(this));
	}

	executeSpell(_id,logStack){
		for (let sp of this.spells){
			if (sp._id==_id){	
				let spell=new Spell(this._config,this,sp);
				spell.executeSpell(logStack);
			}
		}
	}

	addSpellToStack(obj){
		let spell=new Spell(this._config,this,obj);
		spell.on(SpellEventTypes.SPELL_EXECUTION,function(logStack){
			if (spell.props.storeExecLog==true)
				this._eventHandler.create({domain:Domain.SPELL,eventType:SpellEventTypes.SPELL_EXECUTION,data:logStack});
		}.bind(this))

		spell.checkSpell();
		log.info('spell _id:'+spell._id+ ', checkPass:'+spell.checkPass);
		
		this.spells.push(spell);
		this._subscribeToSpellEvent(spell);
	}

	_testRemoveSpellEntry(){

		/*
		const crPromise=this.spellHandler.create({displayName:'test'});
		crPromise.then(function(doc){
			console.log(doc);

		},
		function(err){
			console.log(err);
		})
		*/
		//console.log(this._controllers['actionEmail']);
		//console.log(this._controllers['actionEmail'].buildEntry({to:'vincent@besson.be',subject:'this is the subject',data:'some Data'}));

		//let spell=new Spell(this._config,log,this._controllers,wrkfl_1);
		//this.spells.push(spell);

		const crPromise_2=this.spellHandler.get({});
		crPromise_2.then(function(docs){
			for (let doc of docs){	
				this.addSpellToStack(doc);
			}
		}.bind(this),
		function(err){
			console.log(err);
		});

		//const crPromise_3=this.spellHandler.update(spell);
		//crPromise_2.then(function(doc){
			//console.log(doc);
			//for (let doc of docs){
				//console.log(doc);
				//let spell=new Spell(this._config,this._controllers,doc);
				//this.spells.push(spell);
			//}
	//	},
	// function(err){
		//	console.log(err);
		//});
		return;
	// for (let device of this.deviceController._devices){
	// 	console.log(this.deviceController._devices);

	// 	let cx=device.getService(Service.Lightbulb).getCharacteristic(Characteristic.On);
	// 	//let st=new spellTrigger(this,'561569ee0e795998127b23c6','561569ee0e795998127b23d5');
	// 	//cx.on(CharacteristicEventTypes.CHANGE,st.callbackTrigger.bind(st));
	// 	console.log(cx.listeners(CharacteristicEventTypes.CHANGE));

	// 	//console.log(device.chkService(Service.Lightbulb));
	// 	setTimeout(function(){
	// 		device.getService(Service.Lightbulb)
	// 				?.setCharacteristic(Characteristic.On,true,function(error,res){
	// 					console.log('return result='+res);
	// 				});
	// 	},4000);

	// }
		//const wrkfl=wrkfl_1;

		//let ret;
		//ret=this.removeSpellEntry(wrkfl.spellEntries,'zz1569ee0e795998127b23b2');
		//log.info(ret);
		//log.info(JSON.stringify(wrkfl, undefined, '\t'));

		// const newitem={
		// 	id:'561569ee0e795998127b23ds',
		// 	type:'actionWait',
		// 	params:{
		// 		duration:88
		// 	}
		// };

		// let ret_2=this.insertSpellEntry(wrkfl.spellEntries,'qq1569ee0e795998127b23a9',newitem);
		// //log.info(ret_2);
		// //log.info(JSON.stringify(wrkfl, undefined, '\t'));

		// let modparams={
		// 	duration:99
		// }

		// this.modifySpellEntry(wrkfl.spellEntries,'561569ee0e795998127b23ds',modparams);
		// log.info(JSON.stringify(wrkfl, undefined, '\t'));

	}	

	command(){

		let ajv = new Ajv({allErrors: true});
		this.sockSpellCommand.on('message',function(data,reply){

			let err=null;
			let res={};

			if (data==null || data['method']==null){
				reply('invalid method',null);
				return;
			}

			if (data['method']=='ping'){
				res['method']='ping';
				res['result']='pong';
				reply(null,JSON.parse(JSON.stringify(res)));
				return;
			}

			if (this.status!=Status.READY){
				reply(" status not ready",null);
				return;
			}

			switch(data['method']){
				case 'getSpells':
					res=this.spells.map(function(sp){return Spell.dehydrate(sp)});
					return reply(null,res);
				break;

				case 'getSpell': // tested OK
					if (data['_id']){
						for (let sp of this.spells){
							if (sp._id==data['_id']){
								return reply(null,Spell.dehydrate(sp));
								break;
							}
						}
						return reply({code:404, msg:"spellController error spell not found"},null);
						break;
					}
					return reply({code:400, msg:"spellController error bad request"},null);		
				break;

				case 'executeSpell': // tested OK
					if (data['_id']){
						for (let sp of this.spells){
							if (sp._id==data['_id']){
								sp.executeSpell();
								return reply(null,"OK");
								break;
							}
						}
						return reply({code:404, msg:"spellController error spell not found"},null);
						break;
					}
					return reply({code:400, msg:"spellController error bad request"},null);	
				break;

				case 'setSpell':	
					if (ajv.validate(Spell.schema.properties.props, data['props'])==true){
						if (data['_id']){
							
							for (let sp of this.spells){
								if (sp._id==data['_id']){
									
									sp.props=Object.assign(sp.props,clone(data['props']));
									sp._unloadSpellTrigger(); // First unload all trigger
									
									sp.spellEntries=clone(data['spellEntries']);
									sp.executionLog=clone(data['executionLog']);
									sp.checkSpell();
									
									sp._loadSpellTrigger();
									sp.emit(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,sp);
									
									return reply(null,Spell.dehydrate(sp));
								}
							}
							return reply({code:404,msg:"spellController error spell not found"},null);
						}
						else{
							return reply({code:400,msg:"spellController error missing _id"},null);
						}
					}else{
						console.log(ajv.errors);
						reply({code:400,msg:ajv.errors},null);
				}
				break;
				
				case 'deleteSpell': // tested OK
					if (data['_id']){
						this.spellHandler.drop(data['_id']).then(function(res){

							if (res.deletedCount && res.deletedCount==1){
								// Need also to unload any existing in this.spells;
								for (let i in this.spells) {
									let entry=this.spells[i];
									if (data['_id']==entry._id){
										this.spells.splice(i,1);
										log.info(this.tag+" unload spell after handler deletting _id:"+data['_id']+" successful");
										break;
									}
								}
								return reply(null,res);
							}
							else
								return reply({code:404, msg:"spellController error spell not found"},null);
						}.bind(this))
						.catch(function(err){
							console.log(err);
							err.code=404;
							return reply(err,null); 
						})
						break;

						return reply({code:404, msg:"spellController error spell not found"},null);		
						break;
					}	
					return reply({code:400, msg:"spellController error missing _id"},null);
				break;

				case 'createSpell':
					if (data.spell && data.spell.props.displayName){							
							this.spellHandler.create(data.spell).then(function(res){
								// We need to add the spell to the stack of available spell
								this.addSpellToStack(res);
								return reply(null,res);
						}.bind(this))
						.catch(function(err){
							console.log(err);
							err.code=404;
							return reply(err,null); 
						})
					}else{
						return reply({code:400, msg:"spellController error missing args props.displayName"},null);
					}
				break;

				case 'getSpellEntry':
					if (data['_id'] && data['entryId']){
						for (let sp of this.spells){
							if (sp._id==data['_id']){
								let entry=sp._findSpellEntry(sp.spellEntries,data['entryId']);
								if (entry)
									return reply(null,entry);
								else
									return reply({code:404,msg:"spellEntry not found"});
							}
						}
						return reply({code:404, msg:"spellController error spell not found"},null);	
					}else{
						return reply({code:400, msg:"spellController error missing _id entryId"},null);
					}
				break;

				case 'setSpellEntry': // to be done	
						if (data['_id']){
							for (let sp of this.spells){
								if (sp._id==data['_id']){
									let entry=sp._findSpellEntry(sp.spellEntries,data['entryId']);
									if (entry){
										if (this._controllers[entry.type].schema){
											if( ajv.validate(this._controllers[entry.type].schema.properties.props, data['props'])==true){
											entry.props=Object.assign(entry.props,clone(data['props']));
											sp.emit(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,sp);
											return reply(null,entry.dehydrate(entry));
											}else{
												return reply({code:400,msg:ajv.errors},null);
											}
										}else{
											return reply({code:400,msg:"spellController bad request missing schema"},null);
										}
									}else{
										return reply({code:404,msg:"spellController error spell entry not found"},null);
									}
								}
							}
							return reply({code:404,msg:"spellController error spell not found"},null);
						}else{
							return reply({code:400,msg:"spellController error missing _id"},null);
						}
					
				break;

				case 'addSpellEntry': // to be finished // Question is FrontOffice leading entry id generation ?
					if (data['_id']){
						for (let sp of this.spells){
							if (sp._id==data['_id']){
								let entry=null;
								
								if (sp.isEntryIdExist(sp.spellEntries,data['newEntry']._id)==true)
									return reply({code:400,msg:"spellController _id already exist in spellEntries tree"},null);

								if (check.nonEmptyString(data['entryId'])){
									entry=sp._findSpellEntry(sp.spellEntries,data['entryId']);
								}
								else{
									entry=sp; // newEntry will be add to the root
								}
								
								if (entry){
									let newEntry=data['newEntry'];
									if( ajv.validate(this._controllers[newEntry.type].schema, newEntry)==true){
										entry.spellEntries.push(newEntry);
										sp.emit(SpellEventTypes.SPELL_CONFIGURATION_CHANGE,sp);
										return reply(null,entry);
									}else{
										return reply({code:400,msg:ajv.errors},null);
									}
								}else{
									return reply({code:404,msg:"spellController error spell entry not found"},null);
								}
							}
						}
						return reply({code:404,msg:"spellController error spell not found"},null);
					}else{
						return reply({code:400,msg:"spellController error missing _id"},null);
					}
				break;

				case 'deleteSpellEntry': 
					if (data['_id'] && data['entryId']){
						for (let sp of this.spells){
							if (sp._id==data['_id']){
								let entry=sp.removeSpellEntry(sp.spellEntries,data['entryId']);
								if (entry==true)
									return reply(null,entry);
								else
									return reply({code:404,msg:"spellEntry not found"});
							}
						}
						return reply({code:404, msg:"spellController error spell not found"},null);	
					}else{
						return reply({code:400, msg:"spellController error missing _id entryId"},null);
					}
				break;
				
				default:
				break;
			}
		}.bind(this));
	}
}

module.exports = spellController;