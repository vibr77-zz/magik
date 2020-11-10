//
// JEST PLUGIN Test 
//


import config from '../../../config'
import spell from '../spell.js';
import spellControler from '../index.js';


jest.mock('../spell');
jest.mock('../index');

import plugin from './object_spell';

const TAG='objectSpell';

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
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSpell","methodName":"executeSpell","args":["test"]}
		expect(plugin.checkEntry(tpl)).toBeTruthy();
	});

	it ('AT02 Check schema bad expect to be throw',function(){
		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSpell","args":["test"]}
		expect(plugin.checkEntry(tpl)).toBeFalsy();
	});
});

describe(TAG+" executeSpell execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT03 executeSpell pass',async function(){
 		let tpl={ "_id":"5ed12ab50ab63c743eb1186b","type":"objectSpell","methodName":"executeSpell","args":["5ed12ab50ab63c743eb11861"]}
		let spc=new spellControler();
		
		let sp=new spell(config,spc,null);
 		let et=new plugin(config,sp,tpl);

 		sp.spellController=spc

		let ret=await et.execute(sp,[]);
 		
		expect(spc.executeSpell).toHaveBeenCalledTimes(1);

 	});
});

describe(TAG+" executeSpell execute", () => {

	beforeEach(() => {
		spell.mockClear();	
 	});

 	it ('AT04 executeSpell set',async function(){
 		
 		
 	});

 	it ('AT05 executeSpell get',async function(){
 		
 	});
});