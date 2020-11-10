import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const variableParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    
    let bl;
    let variable;
    
    switch(obj.methodName){
    	case "setValue":
        bl=wk.newBlock('magik_variable_set',obj._id);
        
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.args[1],'VARNAME');
        
        reverseParser(wk,obj.args[0],bl.getInput('VALUE').connection);
        
        if (linkedConn){
          linkedConn.connect(bl.previousConnection);
        }     
      break;

      case "getValue":      
	      bl=wk.newBlock('magik_variable_get',obj._id);
	      
        bl.initSvg();
	      bl.render();

        bl.setFieldValue(obj.args[0],'VARNAME');

	      if (linkedConn){
	        linkedConn.connect(bl.outputConnection);
	      } 
	    break;
    }
   	resolve(bl);
  });
}
export default variableParser;