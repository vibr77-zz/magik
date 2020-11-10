import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const magikSmsParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    let bl;
    switch(obj.methodName){
    	case "sendSms":
	      bl=wk.newBlock('magik_sms_send',obj._id);
	      bl.initSvg();
	      bl.render();

	      if (bl.getInput("MSISDN"))
	      	reverseParser(wk,obj.args[0],bl.getInput("MSISDN").connection);

	      if (bl.getInput("MSG"))
	      	reverseParser(wk,obj.args[1],bl.getInput("MSG").connection);

	      if (linkedConn){
	        linkedConn.connect(bl.previousConnection);
	      }
	    break;

	    case "smsTrigger":
	      bl=wk.newBlock('magik_sms_trigger',obj._id);
	      bl.initSvg();
	      bl.render();

	      bl.setFieldValue(obj.args[0],'SET_VARIABLE_CHK');
	      

	      if (bl.getInput("MSISDN_TXT"))
	      	reverseParser(wk,obj.args[2],bl.getInput("MSISDN_TXT").connection);

	      bl.setFieldValue(obj.args[3],'MSISDN_OP');

	      if (bl.getInput("MSG_TXT"))
	      	reverseParser(wk,obj.args[4],bl.getInput("MSG_TXT").connection);
	      
	      bl.setFieldValue(obj.args[5],'MSG_OP');

	      if (linkedConn){
	        linkedConn.connect(bl.previousConnection);
	      }
	    break;

	    case "getSmsProps":
	      bl=wk.newBlock('magik_sms_props',obj._id);
	      bl.initSvg();
	      bl.render();

	      if (bl.getInput("SMS"))
	      	reverseParser(wk,obj.args[0],bl.getInput("SMS").connection);

	      bl.setFieldValue(obj.args[1],'PROPS');

	      if (linkedConn){
	        linkedConn.connect(bl.outputConnection);
	      }
	    break;

    }
   	resolve(bl);
  });
}
export default magikSmsParser;