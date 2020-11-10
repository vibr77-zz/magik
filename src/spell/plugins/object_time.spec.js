//
// JEST PLUGIN Test 
//


import config from '../../../config'
import spell from '../spell.js';

import SunCalc from 'suncalc';

jest.mock('../spell');


import plugin from './object_time';

const TAG='objectTime';

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
		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectTime","methodName":"timeNow"};
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectTime"};
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" timeComp execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it("AT03 execute timeComp good check true",async()=>{
 		let tpl={ "_id":"5ed01aae377dba6275245222","type":"objectTime","methodName":"timeComp","operator":"before","args":[{ "_id":"5ed01aaebf5a39017f889559","type":"objectTime","methodName":"time","args":[12,0]},{ "_id":"5ed01aae30af1ff41a7155c3","type":"objectTime","methodName":"timeNow","args":[]}]};
 		
 		let sp =new spell();
 		sp.executeSingleSpellEntry
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			
 		let et=new plugin(config,sp,tpl);
 		expect(async () => {
    	await et.execute(sp,[]);
  	}).not.toThrow();
 		
 		sp.executeSingleSpellEntry
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			
    let ret=await et.execute(sp,[]);
  
 		expect(ret).toBe(true);
 		expect(sp.executeSingleSpellEntry).toHaveBeenCalledTimes(4)
 	});

 	it("AT04 execute timeComp good check false",async()=>{
 		let tpl={ "_id":"5ed01aae377dba6275245222","type":"objectTime","methodName":"timeComp","operator":"after","args":[{ "_id":"5ed01aaebf5a39017f889559","type":"objectTime","methodName":"time","args":[12,0]},{ "_id":"5ed01aae30af1ff41a7155c3","type":"objectTime","methodName":"timeNow","args":[]}]};
 		
 		let sp =new spell();
 		sp.executeSingleSpellEntry
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			
 		let et=new plugin(config,sp,tpl);
 		expect(async () => {
    	await et.execute(sp,[]);
  	}).not.toThrow();
 		
 		sp.executeSingleSpellEntry
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			
    let ret=await et.execute(sp,[]);
  
 		expect(ret).toBe(false);
 		expect(sp.executeSingleSpellEntry).toHaveBeenCalledTimes(4)
 	});

 	it("AT05 execute timeComp good check false",async()=>{
 		let tpl={ "_id":"5ed01aae377dba6275245222","type":"objectTime","methodName":"timeComp","operator":"equal","args":[{ "_id":"5ed01aaebf5a39017f889559","type":"objectTime","methodName":"time","args":[12,0]},{ "_id":"5ed01aae30af1ff41a7155c3","type":"objectTime","methodName":"timeNow","args":[]}]};
 		
 		let sp =new spell();
 		sp.executeSingleSpellEntry
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			
 		let et=new plugin(config,sp,tpl);
 		expect(async () => {
    	await et.execute(sp,[]);
  	}).not.toThrow();
 		
 		sp.executeSingleSpellEntry
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			
    let ret=await et.execute(sp,[]);
  
 		expect(ret).toBe(false);
 		expect(sp.executeSingleSpellEntry).toHaveBeenCalledTimes(4)
 	});
});

describe(TAG+" time execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});
	
	it("AT06 execute time check Throw",async()=>{
		let tpl={ "_id":"5ed01aaebf5a39017f889559","type":"objectTime","methodName":"time","args":[25,0]}
		let sp =new spell();
		let et=new plugin(config,sp,tpl);
 		
 		try {
  		await et.execute(sp,[]);
  	}
  	catch(e){
  		expect(e).toMatch('objectTime');
  	}

	});

	it("AT07 execute time check not to throw",async()=>{
		let tpl={ "_id":"5ed01aaebf5a39017f889559","type":"objectTime","methodName":"time","args":[14,45]}
		let sp =new spell();
		let et=new plugin(config,sp,tpl);
 		
  	let res=await et.execute(sp,[]);
  	expect(res).toEqual([14,45]);
	});
});

describe(TAG+" timeNow execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});
	
	it("AT08 execute time check time",async()=>{
		let tpl={ "_id":"5ed01aaebf5a39017f889559","type":"objectTime","methodName":"timeNow"}
		let sp =new spell();
		let et=new plugin(config,sp,tpl);
 		
 		let d=new Date();
 		let h=d.getHours();
 		let m=d.getMinutes();
 		let comp=[h,m];
 		
  	let res=await et.execute(sp,[]);

  	expect(res).toEqual(comp);
	});
});


describe(TAG+" timeBetween execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

	it("AT09 execute check true",async()=>{
 		let tpl={"_id":"5ed10a6c1b7c4e744cc50de4","type":"objectTime","methodName":"timeBetween","args":[{ "_id":"5ed10a6c817dac4cd20b52db","type":"objectTime","methodName":"timeNow","args":[]},{ "_id":"5ed10a6c777f54391e351137","type":"objectTime","methodName":"time","args":[12,0]},{ "_id":"5ed10a6c3c83989be3db29b4","type":"objectTime","methodName":"time","args":[23,0]}]}

 		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([10,0])
 			.mockReturnValueOnce([19,12])
 			.mockReturnValueOnce([20,12])

		let res=await et.execute(sp,[]);

		expect(res).toBe(true);

	});

	it("AT10 execute check false",async()=>{
 		let tpl={"_id":"5ed10a6c1b7c4e744cc50de4","type":"objectTime","methodName":"timeBetween","args":[{ "_id":"5ed10a6c817dac4cd20b52db","type":"objectTime","methodName":"timeNow","args":[]},{ "_id":"5ed10a6c777f54391e351137","type":"objectTime","methodName":"time","args":[12,0]},{ "_id":"5ed10a6c3c83989be3db29b4","type":"objectTime","methodName":"time","args":[23,0]}]}

 		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([19,12])
 			.mockReturnValueOnce([20,12])

		let res=await et.execute(sp,[]);

		expect(res).toBe(false);

	});

	it("AT11 execute to throw invalid value",async()=>{
 		let tpl={"_id":"5ed10a6c1b7c4e744cc50de4","type":"objectTime","methodName":"timeBetween","args":[{ "_id":"5ed10a6c817dac4cd20b52db","type":"objectTime","methodName":"timeNow","args":[]},{ "_id":"5ed10a6c777f54391e351137","type":"objectTime","methodName":"time","args":[12,0]},{ "_id":"5ed10a6c3c83989be3db29b4","type":"objectTime","methodName":"time","args":[23,0]}]}

 		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([21,0])
 			.mockReturnValueOnce([25,12]) // <- 25 Is Invalid

 			.mockReturnValueOnce([20,12])

		try {
  		await et.execute(sp,[]);
  	}
  	
  	catch(e){
  		expect(e).toMatch('objectTime');
  	}

	});

});

describe(TAG+" timeOffset execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

	it("AT12 execute check return value with offSet of 2 hours",async()=>{

		let tpl={ "_id":"5ed1104b9df9e668aee049a6","type":"objectTime","methodName":"timeOffset","args":[{ "_id":"5ed1104b219130b2dfcd2cb2","type":"objectTime","methodName":"timeNow","args":[]},2,0]};
		
		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		let d=new Date();
 		let h=d.getHours();
 		let m=d.getMinutes();
 		let comp=[h+2,m];

 		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([h,m])
 			
		let res=await et.execute(sp,[]);
		expect(res).toEqual(comp);
	});

	it("AT13 execute check return value with offSet of 2 hours",async()=>{

		let tpl={ "_id":"5ed1104b9df9e668aee049a6","type":"objectTime","methodName":"timeOffset","args":[{ "_id":"5ed1104b219130b2dfcd2cb2","type":"objectTime","methodName":"timeNow","args":[]},2,0]};
		
		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		let d=new Date();
 		let h=d.getHours();
 		let m=d.getMinutes();
 		let comp=[h+3,m];

 		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([h,m])
 			
		let res=await et.execute(sp,[]);
		expect(res).not.toEqual(comp);

	});
});

describe(TAG+" timeAstro execute", () => {
	
	it("AT14 execute check astro time",async()=>{
		
		let tpl={ "_id":"5ed122fffae661c33de6b27f","type":"objectTime","methodName":"timeAstro","args":["sunrise"]};
		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		let sunTime=SunCalc.getTimes(new Date(),44.6333,-1.15);
		
		let h=sunTime['sunrise'].getHours();
		let m=sunTime['sunrise'].getMinutes();

	  let res=await et.execute(sp,[]);

	  expect(res).toEqual([h,m]);
	
	});

	it("AT15 execute check astro time sunset",async()=>{
		
		let tpl={ "_id":"5ed122fffae661c33de6b27f","type":"objectTime","methodName":"timeAstro","args":["sunset"]};
		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		let sunTime=SunCalc.getTimes(new Date(),44.6333,-1.15);
		
		let h=sunTime['sunset'].getHours();
		let m=sunTime['sunset'].getMinutes();

	  let res=await et.execute(sp,[]);

	  expect(res).toEqual([h,m]);
	
	});

	it("AT16 execute check astro time dusk",async()=>{
		
		let tpl={ "_id":"5ed122fffae661c33de6b27f","type":"objectTime","methodName":"timeAstro","args":["dusk"]};
		let sp =new spell();
		let et=new plugin(config,sp,tpl);

		let sunTime=SunCalc.getTimes(new Date(),44.6333,-1.15);
		
		let h=sunTime['dusk'].getHours();
		let m=sunTime['dusk'].getMinutes();

	  let res=await et.execute(sp,[]);

	  expect(res).toEqual([h,m]);
	
	});


});

describe(TAG+" timeWait execute", () => {
 	// Todo
});

describe(TAG+" timeDelay execute", () => {
	// Todo 
});

describe(TAG+" timeToString execute", () => {

	it("AT17 execute check astro time dusk",async()=>{
		let tpl={ "_id":"5ed12608a9b584f64513092b","type":"objectTime","methodName":"timeToString","args":[{ "_id":"5ed126087c7091fde5bad1c4","type":"objectTime","methodName":"time","args":[12,0]}]};
		let sp =new spell();
		
		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([1,0])

		let et=new plugin(config,sp,tpl);

	  let res=await et.execute(sp,[]);

	  expect(res).toEqual("01:00");
	});

	it("AT18 execute check astro time dusk",async()=>{
		let tpl={ "_id":"5ed12608a9b584f64513092b","type":"objectTime","methodName":"timeToString","args":[{ "_id":"5ed126087c7091fde5bad1c4","type":"objectTime","methodName":"time","args":[12,12]}]};
		let sp =new spell();
		
		sp.executeSingleSpellEntry // 2nds Value is the one between
 			.mockReturnValue([12,12])

		let et=new plugin(config,sp,tpl);

	  let res=await et.execute(sp,[]);

	  expect(res).toEqual("12:12");
	});

});



