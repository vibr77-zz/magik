//
// JEST PLUGIN Test 
//

import config from '../../../config'
import spell from '../spell.js';
import spellControler from '../index.js';


jest.mock('../spell');
jest.mock('../index');

import plugin from './object_list';

const TAG='objectList';

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
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectList","methodName":"listWith","args":[1,2]}
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectList","args":[2]}
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" objectList execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT03 remove FIRST',async function(){
 		let tpl={"_id": "5ed3ffd624ec0f857c278928","type": "objectList","methodName": "removeIndex","mode": "FIRST","args": [{"_id": "5ed3ffd6bd5d265f4d95c3c5","type": "objectVariable","methodName": "getValue","args": ["item"]}, null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["B","C","D"]);
 	});

 	it ('AT04 remove LAST',async function(){
 		let tpl={"_id": "5ed3ffd624ec0f857c278928","type": "objectList","methodName": "removeIndex","mode": "LAST","args": [{"_id": "5ed3ffd6bd5d265f4d95c3c5","type": "objectVariable","methodName": "getValue","args": ["item"]}, null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["A","B","C"]);
 	});

 	it ('AT05 remove at 1',async function(){
 		let tpl={"_id": "5ed3ffd624ec0f857c278928","type": "objectList","methodName": "removeIndex","mode": "AT","args": [{"_id": "5ed3ffd6bd5d265f4d95c3c5","type": "objectVariable","methodName": "getValue","args": ["item"]}, 1]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["A","C","D"]);
 	});

 	it ('AT06 remove at 10 over length',async function(){
 		let tpl={"_id": "5ed3ffd624ec0f857c278928","type": "objectList","methodName": "removeIndex","mode": "AT","args": [{"_id": "5ed3ffd6bd5d265f4d95c3c5","type": "objectVariable","methodName": "getValue","args": ["item"]}, 10]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["A","B","C"]);
 	});
});

describe(TAG+" objectList Insert execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

	it ('AT07 insert FIRST',async function(){
		let tpl={ "_id":"5ed405958f9633a5b8d6dffe","type":"objectList","methodName":"setFirst","mode":"INSERT","args":[{ "_id":"5ed40595320b0c8635a9286f","type":"objectVariable","methodName":"getValue","args":["item"]},"First"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["First","A","B","C","D"]);
	});

	it ('AT08 set FIRST',async function(){
		let tpl={ "_id":"5ed405958f9633a5b8d6dffe","type":"objectList","methodName":"setFirst","mode":"SET","args":[{ "_id":"5ed40595320b0c8635a9286f","type":"objectVariable","methodName":"getValue","args":["item"]},"First"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["First","B","C","D"]);
	});

	it ('AT09 insert LAST',async function(){
		let tpl={ "_id":"5ed405958f9633a5b8d6dffe","type":"objectList","methodName":"setLast","mode":"INSERT","args":[{ "_id":"5ed40595320b0c8635a9286f","type":"objectVariable","methodName":"getValue","args":["item"]},"First"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["A","B","C","D","First"]);
	});

	it ('AT10 set LAST',async function(){
		let tpl={ "_id":"5ed405958f9633a5b8d6dffe","type":"objectList","methodName":"setLast","mode":"SET","args":[{ "_id":"5ed40595320b0c8635a9286f","type":"objectVariable","methodName":"getValue","args":["item"]},"First"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ar).toEqual(["A","B","C","First"]);
	});
});

describe(TAG+" objectList other methodName", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT11 length',async function(){
		let tpl={ "_id":"5ed4082714281c8f65888670","type":"objectList","methodName":"lengthOf","args":[{ "_id":"5ed408279ffda3622822a269","type":"objectList","methodName":"listWith","args":["A","B","C"]}]}

		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(4);
	});

	it ('AT12 length',async function(){
		let tpl={ "_id":"5ed4082714281c8f65888670","type":"objectList","methodName":"isEmpty","args":[{ "_id":"5ed408279ffda3622822a269","type":"objectList","methodName":"listWith","args":["A","B","C"]}]}

		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=["A","B","C","D"];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(false);
	});

	it ('AT13 length',async function(){
		let tpl={ "_id":"5ed4082714281c8f65888670","type":"objectList","methodName":"isEmpty","args":[{ "_id":"5ed408279ffda3622822a269","type":"objectList","methodName":"listWith","args":["A","B","C"]}]}

		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);
 		let ar=[];

 		sp.executeSingleSpellEntry.mockReturnValue(ar)

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(true);
	});

 })

