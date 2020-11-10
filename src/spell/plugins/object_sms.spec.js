//
// JEST PLUGIN Test 
//

import config from '../../../config'
import spell from '../spell.js';
import spellControler from '../index.js';


jest.mock('../spell');
jest.mock('../index');

import plugin from './object_sms';

const TAG='objectSms';

describe(TAG+' Core static declaration',() => {
	it('AT00 check mandatory structure', function(){
		expect(plugin.schema).toBeDefined();
		expect(typeof(plugin.version)).toBe('string')
		expect(typeof(plugin.tag)).toBe('string')
		expect(plugin.tag).toBe(TAG);
		expect(typeof(plugin.checkEntry)).toBe('function');
	});
});

describe(TAG+" Schema validation function", () => {
	it ('AT01 Check schema good expect true',function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"sendSms","args":["test","to"]}
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","args":["test"]}
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" sendSms execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT03 sendSms pass',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"sendSms","args":["+336714101110","Hey Boy Hey Girl"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(true);

 	});

 	it ('AT04 sendSms pass',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"sendSms","args":[{"to":"+336714101110"},"Hey Boy Hey Girl"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		sp.executeSingleSpellEntry.mockReturnValue(22);
 		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectSms');
  	}
 	});

});


describe(TAG+" getSmsProps execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT05 getSmsProps pass',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"getSmsProps","args":[{"smsObj":"+336714101110"},"to"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		sp.executeSingleSpellEntry.mockReturnValue({"to":"0671420310","msg":"this is it"});

 		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual("0671420310");
 	
 	});

 	it ('AT06 getSmsProps pass',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"getSmsProps","args":[{"smsObj":"+336714101110"},"to2"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		sp.executeSingleSpellEntry.mockReturnValue({"to":"0671420310","msg":"this is it"});

 		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(null);
 	
 	});
});


describe(TAG+" smsTrigger execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT07 smsTrigger',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","067142","CONTAINS",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 	

 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(false);

 	});

 	it ('AT08 smsTrigger',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","067141","CONTAINS",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 	
 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(true);

 	});

 	it ('AT09 smsTrigger return false',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","067141","NOT_CONTAINS",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(false);

 	});

 	it ('AT10 smsTrigger return false',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","067141","EQUAL",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(false);

 	});

 	it ('AT11 smsTrigger return false',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","0671410111","EQUAL",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(true);

 	});

 	it ('AT12 smsTrigger return false',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","067141011","NOT_EQUAL",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(true);

 	});

 	it ('AT13 smsTrigger return false',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","0671410111","NOT_EQUAL",null,"EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410111","msg":"this is it"});	
		expect(ret).toEqual(false);

 	});

 	it ('AT14 smsTrigger dual cond 1',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item","0671410111","NOT_EQUAL","this is it","EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410110","msg":"this is it"});	
		expect(ret).toEqual(true);

 	});

 	it ('AT15 smsTrigger dual cond 2',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item",null,"NOT_EQUAL","this is -it","EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		let ret=await et.execute(sp,[],{"msisdn":"0671410110","msg":"this is it"});	
		expect(ret).toEqual(false);
 	});

 	it ('AT16 smsTrigger bad request',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":[true,"item",null,"NOT_EQUAL","this is -it","EQUAL"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		
 		
 		try {
  		await et.execute(sp,[],{});
  	}
  	catch(e){
  		expect(e).toMatch('objectSms');
  	}
		
 	});

});

