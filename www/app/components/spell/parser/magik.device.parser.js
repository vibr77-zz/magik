import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const magikDeviceParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    let bl;
    switch(obj.methodName){
    	case "setCx":
	      bl=wk.newBlock('magik_device_setcx',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.args[0],'DEVICE');
	      bl.setFieldValue(obj.args[1],'SERVICE');
	      bl.setFieldValue(obj.args[2],'CX');
	      
	      reverseParser(wk,obj.args[3],bl.getInput("VALUE").connection);
	      if (linkedConn){
	      	linkedConn.connect(bl.previousConnection);
	      }
	    break;
	    
	    case "getCx":
	      bl=wk.newBlock('magik_device_getcx',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.args[0],'DEVICE');
	      bl.setFieldValue(obj.args[1],'SERVICE');
	      bl.setFieldValue(obj.args[2],'CX');
	      
	      linkedConn.connect(bl.outputConnection);
	    break;

	    case "getSrv":
	      bl=wk.newBlock('magik_device_getsrv',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.args[0],'DEVICE');
	      bl.setFieldValue(obj.args[1],'SERVICE');
	      
	      linkedConn.connect(bl.outputConnection);
	    break;

	    case "getDevice":
	      bl=wk.newBlock('magik_device_getdevice',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.args[0],'DEVICE');	      
	      linkedConn.connect(bl.outputConnection);
	    break;
	    
	    case "getCxProps":
	      bl=wk.newBlock('magik_device_getcxprops',obj._id);
	      bl.initSvg();
	      bl.render();
	      bl.setFieldValue(obj.args[0],'DEVICE');
	      bl.setFieldValue(obj.args[1],'SERVICE');
	      bl.setFieldValue(obj.args[2],'CX');
	      bl.setFieldValue(obj.args[3],'PROPS');
	      
	      linkedConn.connect(bl.outputConnection);
	    break;

	    case "deviceTrigger":
	    	bl=wk.newBlock('magik_device_trigger',obj._id);
	      bl.initSvg();
	      bl.render();
	      
	      reverseParser(wk,obj.args[0],bl.getInput("OBJ").connection);
	      
	      if (bl.getField("OPERATOR")){
	      	bl.setFieldValue(obj.args[1],'OPERATOR');
	      	bl.opvalue=obj.args[1];
	      	console.log("going doxwn");
	      }
	      else 
	      	console.log("zoob");
	      if (bl.getInput("VALUE"))
	      	reverseParser(wk,obj.args[2],bl.getInput("VALUE").connection);
	      
	      if (linkedConn){
	      	linkedConn.connect(bl.previousConnection);
	      }

    }
    resolve(bl);
  });
}
export default magikDeviceParser;