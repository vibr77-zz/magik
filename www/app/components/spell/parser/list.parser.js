import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const listParser=(wk,obj,linkedConn)=>{

  return new Promise(async(resolve, reject) => {
    let bl;

    switch(obj.methodName){
      case "emptyList":
        bl=wk.newBlock('lists_create_empty',obj._id);
        bl.initSvg();
        bl.render();
        if (linkedConn){
          linkedConn.connect(bl.outputConnection);
        }
      break;
      case "removeIndex":

        bl=wk.newBlock('magik_list_remove',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'OP');
        reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
        reverseParser(wk,obj.args[1],bl.getInput("POS").connection);
        
        linkedConn.connect(bl.previousConnection);

        break;
      case "listWith":
        bl=wk.newBlock('lists_create_with',obj._id);
        bl.initSvg();
        bl.render();
        
        let len=obj.args.length;
        if (len >3){
          for (let i=3;i < len;i++){
            bl.appendValueInput("ADD"+i);
          }
        }

        let j=0;
        for (let item of obj.args){
          reverseParser(wk,item,bl.getInput("ADD"+j).connection);
          j++;
        }

        linkedConn.connect(bl.outputConnection);
      break;

      case "isEmpty":
        bl=wk.newBlock('lists_isEmpty',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "lengthOf":
        bl=wk.newBlock('lists_length',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "getFirst":
        bl=wk.newBlock('lists_getIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("FIRST","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "getLast":
        bl=wk.newBlock('lists_getIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("LAST","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "getIdxFromStart":
        bl=wk.newBlock('lists_getIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("FROM_START","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        reverseParser(wk,obj.args[1],bl.getInput("AT").connection);

        linkedConn.connect(bl.outputConnection);
      break;

      case "getIdxFromEnd":
        bl=wk.newBlock('lists_getIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("FROM_END","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        reverseParser(wk,obj.args[1],bl.getInput("AT").connection);

        linkedConn.connect(bl.outputConnection);
      break;
      
      case "getRandom":
        bl=wk.newBlock('lists_getIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("RANDOM","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "setFirst":
        bl=wk.newBlock('lists_setIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("FIRST","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
        reverseParser(wk,obj.args[1],bl.getInput("TO").connection);
        
        linkedConn.connect(bl.previousConnection);
      break;

      case "setLast":
        bl=wk.newBlock('lists_setIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("LAST","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
        reverseParser(wk,obj.args[1],bl.getInput("TO").connection);
        linkedConn.connect(bl.previousConnection);
      break;

      case "setIdxFromStart":
        bl=wk.newBlock('lists_setIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("FROM_START","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
        reverseParser(wk,obj.args[2],bl.getInput("AT").connection);
        reverseParser(wk,obj.args[1],bl.getInput("TO").connection);

        linkedConn.connect(bl.previousConnection);
      break;

      case "setIdxFromEnd":
        bl=wk.newBlock('lists_setIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("FROM_END","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
        reverseParser(wk,obj.args[2],bl.getInput("AT").connection);
        reverseParser(wk,obj.args[1],bl.getInput("TO").connection);

        linkedConn.connect(bl.previousConnection);
      break;

      case "setRandom":
        bl=wk.newBlock('lists_setIndex',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(obj.mode,'MODE');
        bl.setFieldValue("RANDOM","WHERE");
        reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
        reverseParser(wk,obj.args[1],bl.getInput("TO").connection);

        linkedConn.connect(bl.previousConnection);
      break;
      }
      resolve(bl);
    })
  }

  export default listParser;