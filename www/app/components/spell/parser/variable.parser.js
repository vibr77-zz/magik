import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const variableParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    
    let bl;
    let variable;
    
    switch(obj.methodName){
    	case "setValue":
        bl=wk.newBlock('variables_set',obj._id);
        bl.initSvg();
        bl.render();

        variable=wk.getVariableById(bl.getFieldValue('VAR'));
        variable.name=obj.varName;
        reverseParser(wk,obj.valueObj,bl.getInput('VALUE').connection);
        
        if (linkedConn){
          linkedConn.connect(bl.previousConnection);
        }     
      break;

      case "getValue":      
	      bl=wk.newBlock('variables_get',obj._id);
	      bl.initSvg();
	      bl.render();

	      variable=wk.getVariableById(bl.getFieldValue('VAR'));
	      variable.name=obj.varName;

	      if (linkedConn){
	        linkedConn.connect(bl.outputConnection);
	      } 
	    break;
    }
   	resolve(bl);
  });
}
export default variableParser;