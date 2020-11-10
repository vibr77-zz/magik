//
// JEST PLUGIN Test 
//


import config from '../../../config'
import spell from '../spell.js';

jest.mock('../spell');


import plugin from './object_variable';

const TAG='objectVariable';

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
		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","methodName":"setValue","args":["test","item"]};
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","args":["test","item"]};
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it("AT03 execute local setValue()",()=>{
 		
 		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","methodName":"setValue","args":["test","item"]};

 		let sp =new spell();
 		let et=new plugin(config,sp,tpl);
 		et.execute(sp,[]);

 		expect(sp.setLocalVariable).toHaveBeenCalledWith('item','test');

 	});

 	it("AT04 execute local setValue()",()=>{
 		
 		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","methodName":"getValue","args":["item"]};

 		let sp =new spell();
 		let et=new plugin(config,sp,tpl);
 		et.execute(sp,[]);

 		expect(sp.getLocalVariable).toHaveBeenCalledWith('item');

 	});

 	it("AT05 execute global setValue()",()=>{
 		
 		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","methodName":"setValue","isGlobalScope":true,"args":["test","item"]};

 		let sp =new spell();
 		let et=new plugin(config,sp,tpl);
 		et.execute(sp,[]);

 		expect(sp.setGlobalVariable).toHaveBeenCalledWith('item','test');

 	});

 	it("AT06 execute global getValue()",()=>{
 		
 		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","methodName":"getValue","isGlobalScope":true,"args":["item"]};

 		let sp =new spell();
 		let et=new plugin(config,sp,tpl);
 		et.execute(sp,[]);

 		expect(sp.getGlobalVariable).toHaveBeenCalledWith('item');
 	});

 	it("AT07 execute global setValue() with object",async ()=>{

 		let tpl={ "_id":"5ece0d3ba5df236ce9a237e0","type":"objectVariable","methodName":"setValue","isGlobalScope":false,"args":[{ "_id":"5ed00c3816a6ed28742b8edb","type":"objectString","methodName":"concat","args":["OK Dirdel",""]},"item"]};

 		let sp =new spell();
 		sp.executeSingleSpellEntry.mockImplementation(() => Promise.resolve('test'));

 		let et=new plugin(config,sp,tpl);
 		await et.execute(sp,[]);

 		expect(sp.executeSingleSpellEntry).toHaveBeenCalled();
 		expect(sp.setLocalVariable).toHaveBeenCalledWith('item','test');
 	});

});


