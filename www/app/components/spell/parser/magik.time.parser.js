import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const magikTimeParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    let bl;
    let nextCon;
    switch(obj.methodName){
    	case "timeComp":
        bl=wk.newBlock('magik_timecomp',obj._id);
        bl.initSvg();
        bl.render();
        bl.setFieldValue(obj.operator,'OP');
        reverseParser(wk,obj.args[0],bl.getInput("A").connection);
        reverseParser(wk,obj.args[1],bl.getInput("B").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "time":
	      bl=wk.newBlock('magik_time',obj._id);
	      bl.initSvg();
	      bl.render();
	      bl.setFieldValue(obj.args[0],'HOUR');
	      bl.setFieldValue(obj.args[1],'MINUTE');
	      linkedConn.connect(bl.outputConnection);
	    break;

      case 'timeNow':
        bl=wk.newBlock('magik_timenow',obj._id);
        bl.initSvg();
        bl.render();
        linkedConn.connect(bl.outputConnection);
      break;

      case "timeBetween":
	      bl=wk.newBlock('magik_timebetween',obj._id);
	      bl.initSvg();
	      bl.render();
	      reverseParser(wk,obj.args[0],bl.getInput("A").connection);
	      reverseParser(wk,obj.args[1],bl.getInput("B").connection);
	      reverseParser(wk,obj.args[2],bl.getInput("C").connection);
	      linkedConn.connect(bl.outputConnection);
	    break;
            
      case "timeAstro":
        bl=wk.newBlock('magik_timeastro',obj._id);
        bl.setFieldValue(obj.args[0],'ASTRO');
        bl.initSvg();
        bl.render();
        linkedConn.connect(bl.outputConnection);
      break;

      case "timeWait":
        bl=wk.newBlock('magik_timewait',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("DURATION").connection);
        if (linkedConn){
          linkedConn.connect(bl.previousConnection);
        }
      break;

      case "timeOffset":
        bl=wk.newBlock('magik_timeoffset',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("TIME").connection);
        reverseParser(wk,obj.args[1],bl.getInput("HOUR").connection);
        reverseParser(wk,obj.args[2],bl.getInput("MIN").connection);
        
        linkedConn.connect(bl.outputConnection);
        break;

      case "timeDelay":
        bl=wk.newBlock('magik_timedelay',obj._id);
        bl.initSvg();
        bl.render();
        linkedConn.connect(bl.previousConnection);
        reverseParser(wk,obj.args[0],bl.getInput("OFFSET").connection);
        
        nextCon=bl.getInput("DO").connection
        for (let subObj of obj.objDo){
          let subl=await reverseParser(wk, subObj,nextCon);
          nextCon=subl.nextConnection;
        }
      break;

      case "timeTrigger":
        bl=wk.newBlock('magik_timetrigger',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("TIME").connection);
        linkedConn.connect(bl.previousConnection);
      break;

      case "timeToString":
        bl=wk.newBlock('magik_timetostring',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("TIME").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "timeCron":
      //console.log("Goes Here")
        bl=wk.newBlock('magik_timecron',obj._id);
        bl.initSvg();
        bl.render();

         bl.setFieldValue(obj.args[0],'TRIGGER_NAME');
         reverseParser(wk,obj.args[1],bl.getInput("MINUTE").connection);
         reverseParser(wk,obj.args[2],bl.getInput("HOUR").connection);
         reverseParser(wk,obj.args[3],bl.getInput("DOM").connection);
         reverseParser(wk,obj.args[4],bl.getInput("MONTH").connection);
         reverseParser(wk,obj.args[5],bl.getInput("DOW").connection);

        linkedConn.connect(bl.previousConnection);
      break;
    }
    resolve(bl);
  });
}
  export default magikTimeParser;