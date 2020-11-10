import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const magikSpellParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    let bl;
    switch(obj.methodName){
    	case "executeSpell":
	      bl=wk.newBlock('magik_spell_execute',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.spellId,'SPELL');

	      if (linkedConn){
	        linkedConn.connect(bl.previousConnection);
	      }
	    break;

	    case "set":
	      bl=wk.newBlock('magik_spell_set',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.spellId,'SPELL');
	      bl.setFieldValue(obj.arg0,'PROPS');
	      reverseParser(wk,obj.arg1,bl.getInput("VAL").connection);
	      if (linkedConn){
	        linkedConn.connect(bl.previousConnection);
	      }
	    break;

	    case "get":
	      bl=wk.newBlock('magik_spell_get',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.spellId,'SPELL');
	      bl.setFieldValue(obj.arg0,'PROPS');
	     
	      linkedConn.connect(bl.outputConnection);
	    break;      
    }
   	resolve(bl);
  });
}
export default magikSpellParser;