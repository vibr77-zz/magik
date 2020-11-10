import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const textParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    let bl;

    let CC_OPERATORS = {
      'toUpperCase':'UPPERCASE',
      'toLowerCase':'LOWERCASE',
      'toTitleCase':'TITLECASE'
    }; 

    switch(obj.methodName){
      case "toLowerCase":
        bl=wk.newBlock('text_changeCase',obj._id);
        bl.initSvg();
        bl.render();
        bl.setFieldValue(CC_OPERATORS[obj.methodName],'CASE');
        reverseParser(wk,obj.args[0],bl.getInput("TEXT").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "toUpperCase":
      	bl=wk.newBlock('text_changeCase',obj._id);
        bl.initSvg();
        bl.render();
        bl.setFieldValue(CC_OPERATORS[obj.methodName],'CASE');
        reverseParser(wk,obj.args[0],bl.getInput("TEXT").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "toTitleCase":
      	bl=wk.newBlock('text_changeCase',obj._id);
        bl.initSvg();
        bl.render();
        bl.setFieldValue(CC_OPERATORS[obj.methodName],'CASE');
        reverseParser(wk,obj.args[0],bl.getInput("TEXT").connection);
        linkedConn.connect(bl.outputConnection);
      break;
      
      case "contains":
        bl=wk.newBlock('text_indexOf',obj._id);
        bl.initSvg();
        bl.render();
        let TI_OPERATORS={
          'indexOf':'FIRST',
          'lastIndexOf':'END'
        }
        bl.setFieldValue(TI_OPERATORS[obj.operator],'END');
        reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
        reverseParser(wk,obj.args[1],bl.getInput("FIND").connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "concat":  
        bl=wk.newBlock('text_join',obj._id);
        bl.initSvg();
        bl.render();
        
        let len=obj.args.length;
        if (len >2)
        for (let i=2;i< len;i++){
          bl.appendValueInput("ADD"+i);
        }

        for (let idx in obj.args){
          reverseParser(wk,obj.args[idx],bl.getInput("ADD"+idx).connection);
        }
        linkedConn.connect(bl.outputConnection);
      break;

      case "isEmpty":
        bl=wk.newBlock('text_isEmpty',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[idx],bl.getInput("ADD"+idx).connection);
        linkedConn.connect(bl.outputConnection);
      break;

      case "textParser":
        
        bl=wk.newBlock('magik_text_parser',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("TEXT").connection);
        //bl.setFieldValue(obj.args[0],'TEXT');
        bl.setFieldValue(obj.args[1],'ARG0');
        reverseParser(wk,obj.args[2],bl.getInput("VALUE0").connection);
        
        let len_=obj.args.length;
        let j=1;
        for (let i = 3; i < len_; i++) {
     
          bl.appendValueInput('VALUE' + j)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(new Blockly.FieldLabel('replace '))
              .appendField(new Blockly.FieldTextInput('item'),'ARG'+j)
              .appendField(new Blockly.FieldLabel(' by'));
          
          bl.setFieldValue(obj.args[i],'ARG'+j);
          reverseParser(wk,obj.args[i+1],bl.getInput("VALUE"+j).connection);     
          i++;
          j++;
        }        

        linkedConn.connect(bl.outputConnection);
      break;
      case "textReverseParser":
        bl=wk.newBlock('magik_text_reverse_parser',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("TEXT").connection);
        bl.setFieldValue(obj.args[1],'ARG0');
        
        let len_2=obj.args.length;
        let j_=1;
        for (let i = 2; i < len_2; i++) {
     
          bl.appendDummyInput('VALUE' + j)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(new Blockly.FieldLabel('assign {'+j_+'} to '))
          .appendField(new Blockly.FieldTextInput('item'),'ARG'+j_)
          
          bl.setFieldValue(obj.args[i],'ARG'+j_);    

          j_++;
        }
         linkedConn.connect(bl.previousConnection);
      break;
      case "multiLine":
        bl=wk.newBlock('text_multiline',obj._id);
        bl.initSvg();
        bl.render();
        
        bl.setFieldValue(obj.args[0],'TEXT');
        linkedConn.connect(bl.outputConnection);
      break;
   	}
   	resolve(bl);
  });
}
export default textParser;