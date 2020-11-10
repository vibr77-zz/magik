//
// JEST PLUGIN Test 
//

import config from '../../../config'
import spell from '../spell.js';
import spellControler from '../index.js';


jest.mock('../spell');
jest.mock('../index');

import plugin from './object_number';

const TAG='objectNumber';

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
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"add","args":[1,2]}
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","args":[2]}
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" objectNumber execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT03 add passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"add","args":[1,3]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(4);
 	});

 	it ('AT04 add not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"add","args":[1,null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT05 multiply passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"multiply","args":[3,4]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(12);
 	});

 	it ('AT06 multiply not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"multiply","args":[2,null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 divide passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"divide","args":[12,4]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(3);
 	});


 	it ('AT08 divide not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"divide","args":[2,0]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 square passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"square","args":[12]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(144);
 	});


 	it ('AT08 square not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"square","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 round passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"round","args":[12.2]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(12);
 	});

 	it ('AT07 round passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"round","args":[12.8]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(13);
 	});

 	it ('AT08 round not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"round","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 roundUp passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"roundUp","args":[12.2]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(13);
 	});

 	it ('AT07 roundDown passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"roundDown","args":[12.8]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		
		expect(ret).toEqual(12);
 	});



 	it ('AT07 random passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"random","args":[10,15]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBeGreaterThanOrEqual(10);
		expect(ret).toBeLessThanOrEqual(15);
 	});

 	it ('AT08 random not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"random","args":[null,9]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isOdd passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isOdd","args":[10]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isOdd passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isOdd","args":[11]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isOdd not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isOdd","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isEven passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isEven","args":[11]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isEven passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isEven","args":[12]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isEven not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isEven","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isPrime passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isPrime","args":[9]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isPrime passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isPrime","args":[17]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isPrime not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isPrime","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isWhole passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isWhole","args":[9.2]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isWhole passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isWhole","args":[17]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isWhole not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isWhole","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isPositive passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isPositive","args":[-2]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isPositive passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isPositive","args":[17]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isPositive not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isPositive","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isNegative passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isNegative","args":[2]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isNegative passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isNegative","args":[-17]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isNegative not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isNegative","args":[null]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 isDivisibleBy passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isDivisibleBy","args":[20,13]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(false);

 	});

 	it ('AT07 isDivisibleBy passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isDivisibleBy","args":[9,3]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toBe(true);

 	});

 	it ('AT08 isDivisibleBy not passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"isDivisibleBy","args":[null,9]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectNumber');
  	}
 	});

 	it ('AT07 abs passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"abs","args":[-20]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(20)

 	});

 	it ('AT07 abs passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"abs","args":[9]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(9)

 	});

 	it ('AT07 neg passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"neg","args":[-20]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(20)

 	});

 	it ('AT07 neg passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"neg","args":[9]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(-9)

 	});

 	it ('AT07 root passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"root","args":[16]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(4)

 	});

 	it ('AT07 root passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"root","args":[9]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(3)

 	});

 	it ('AT07 moduo passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"modulo","args":[22,3]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(1)

 	});

 	it ('AT07 modulo passed',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectNumber","methodName":"modulo","args":[9,4]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

		let ret=await et.execute(sp,[]);	
		expect(ret).toEqual(1)

 	});




});