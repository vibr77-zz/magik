import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const controlParser=(wk,obj,linkedConn)=>{

  return new Promise(async(resolve, reject) => {
    let bl;
    let nextCon;
    switch(obj.type){
      case 'controlFlow':
        bl=wk.newBlock('magik_flow',obj._id);
        bl.initSvg();
        bl.render();
        bl.setFieldValue(obj.args[0],'FLOW');
        linkedConn.connect(bl.previousConnection);
      break;
          
      case 'controlIfelse':
        bl=wk.newBlock('controls_if',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.objIf,bl.getInput("IF0").connection);
        
        for (let subObj_1 of obj.doIf){
          reverseParser(wk,subObj_1,bl.getInput("DO0").connection);
        }
        
        if( !bl.getInput("ELSE")){
          let inp=bl.appendStatementInput("ELSE");
          inp.appendField(new Blockly.FieldLabel("else"));
        }

        for (let subObj_2 of obj.doElse){
          reverseParser(wk,subObj_2,bl.getInput("ELSE").connection);
        }

        linkedConn.connect(bl.previousConnection);
      break;
        
      case  'controlComp':
        bl=wk.newBlock('logic_compare',obj._id);
        bl.initSvg();
        bl.render();

        const OPERATORS = {
          'equal':'EQ',
          'not_equal':"NEQ",
          'inf':'LT',
          'inf_equal':'LTE',
          'sup':'GT',
          'sup_equal':'GTE'
        };
        console.log(obj.args);

        bl.setFieldValue(OPERATORS[obj.operator],'OP');
        //reverseParser(wk,obj.args[0],bl.getInput("A").connection);
        //reverseParser(wk,obj.args[1],bl.getInput("B").connection);
        
        linkedConn.connect(bl.outputConnection);
      break;
      
      case "controlNegate":
        bl=wk.newBlock('logic_negate',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("BOOL").connection);
        linkedConn.connect(bl.outputConnection); 
      break;

      case "controlNull":
        bl=wk.newBlock('logic_null',obj._id);
        bl.initSvg();
        bl.render();
        linkedConn.connect(bl.outputConnection); 
      break;
      
      case  'controlAnd':
        bl=wk.newBlock('logic_operation',obj._id);
        bl.initSvg();
        bl.render();
        bl.setFieldValue(obj.operator,'OP');
        reverseParser(wk,obj.args[0],bl.getInput("A").connection);
        reverseParser(wk,obj.args[1],bl.getInput("B").connection);
        linkedConn.connect(bl.outputConnection); 
      break;

      case 'controlForeach':
         bl=wk.newBlock('magik_foreach',obj._id);
        
        bl.initSvg();
        bl.render();
        
        bl.setFieldValue(obj.args[0],'VAR');
        reverseParser(wk,obj.args[1],bl.getInput("LIST").connection);

        nextCon=bl.getInput("DO").connection
        for (let subObj of obj.doLoop){
          let subl=await reverseParser(wk, subObj,nextCon);
          if (subl && subl.nextConnection)
            nextCon=subl.nextConnection;
        }
        
        linkedConn.connect(bl.previousConnection);
    
      break;
          
	    case 'controlLoop':
	      bl=wk.newBlock('controls_repeat_ext',obj._id);
	      bl.initSvg();
	      bl.render();
	      reverseParser(wk,obj.objCount,bl.getInput("TIMES").connection);
	      
	      nextCon=bl.getInput("DO").connection
	      for (let subObj of obj.doLoop){
	        let subl=await reverseParser(wk, subObj,nextCon);
	        nextCon=subl.nextConnection;
	      }
	      
	      linkedConn.connect(bl.previousConnection);
	    break;

      case 'controlWhile':
        bl=wk.newBlock('controls_whileUntil',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.objWhile,bl.getInput("BOOL").connection);
        
        nextCon=bl.getInput("DO").connection
        for (let subObj of obj.doWhile){
          let subl= reverseParser(wk, subObj,nextCon);
          nextCon=subl.nextConnection;
        }
        linkedConn.connect(bl.previousConnection);
      break;
    }
    resolve(bl);
  });
}
  export default controlParser;