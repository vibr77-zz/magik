//
// JEST PLUGIN Test 
//


import config from '../../../config'
import spell from '../spell.js';


jest.mock('../spell');


import plugin from './object_string';

const TAG='objectString';

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
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"concat","args":["test",""]}
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","args":["test",""]}
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" Concat execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT03 Execute concat 2 string check',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"concat","args":["test","titi"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual("testtiti");
	});


	it ('AT04 Execute concat 2 with one string one object',async function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"concat","args":["test",{ "_id":"5ed12fa8ab17e341a8795079","type":"objectString","methodName":"toUpperCase","args":["TEST. 2"]}]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);

 		sp.executeSingleSpellEntry
 			.mockReturnValue("SECOND")

		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual("testSECOND");
	});

});

describe(TAG+" Case Change execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT05 Execute toTitleCase check',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"toTitleCase","args":["test hello world"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual("Test Hello World");
 	});

 	it ('AT06 Execute toLowerCase check',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"toLowerCase","args":["test HeLLo world"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual("test hello world");
 	});

 	it ('AT07 Execute toLowerCase check',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"toUpperCase","args":["test HeLLo world"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual("TEST HELLO WORLD");
 	});

 	it ('AT08 Execute toLowerCase wrong type number',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"toUpperCase","args":[8]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);

 		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectString');
  	}

 	});
});

describe(TAG+" contains execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT09 Execute contains',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"contains","args":["test HeLLo world","world"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual(true);
 	});

 	it ('AT10 Execute contains',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"contains","args":["test HeLLo world","wozzrld"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual(false);
 	});
});

describe(TAG+" multiline execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT11 Execute contains',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"multiLine","args":["test HeLLo\n world"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual("test HeLLo\n world");
 	});
});

describe(TAG+" match execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT11 Execute contains',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"match","args":["test","[a-z]"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).not.toEqual(null);
 	});

 	it ('AT12 Execute contains',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectString","methodName":"match","args":["test","[A-Z]"]}
		
		let sp =new spell();
 		let et=new plugin(config,sp,tpl);


		let ret=await et.execute(sp,[]);
 		expect(ret).toEqual(null);
 	});

});

