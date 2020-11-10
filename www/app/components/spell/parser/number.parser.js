import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import reverseParser from './index';

const numberParser=(wk,obj,linkedConn)=>{
	return new Promise(async(resolve, reject) => {
    let bl;
    
    let AR_OPERATORS = {
      'add': 'ADD',
      'minus': 'MINUS',
      'multiply': 'MULTIPLY',
      'divide': 'DiVIDE',
      'power': 'POWER'
    };

    let IS_OPERATORS={
      'isPrime':'PRIME',
      'isOdd':'ODD',
      'isEven':'EVEN',
      'isNegative':'NEGATIVE',
      'isPositive':'POSITIVE',
      'isWhole':'WHOLE',
      'isDivisibleBy':'DIVISIBLE_BY'
    }

    let SINGLE_OPERATORS={
      'abs':'ABS',
      'root':'ROOT',
      'ln':'LN',
      'exp':'EXP',
      'pow10':'POW10',
      
      'sin':'SIN',
      'cos':'COS',
      'tan':'TAN',
      'asin':'ASIN',
      'atan':'ATAN',
      'acos':'ACOS',
      'neg':'NEG'

    }
    let ROUND_OPERATORS={
      'round':'ROUND',
      'roundUp':'ROUNDUP',
      'roundDown':'ROUNDDOWN'
    }

    if(ROUND_OPERATORS[obj.methodName]!=null){
      bl=wk.newBlock('math_round',obj._id);
      bl.initSvg();
      bl.render();

      bl.setFieldValue(ROUND_OPERATORS[obj.methodName],'OP');
      reverseParser(wk,obj.args[0],bl.getInput("NUM").connection);
      
      linkedConn.connect(bl.outputConnection);
      resolve(bl);
      return;
    }

    if(SINGLE_OPERATORS[obj.methodName]!=null){
      bl=wk.newBlock('math_single',obj._id);
      bl.initSvg();
      bl.render();

      bl.setFieldValue(SINGLE_OPERATORS[obj.methodName],'OP');
      reverseParser(wk,obj.args[0],bl.getInput("NUM").connection);
      
      linkedConn.connect(bl.outputConnection);
      resolve(bl);
      return;

    }else if(IS_OPERATORS[obj.methodName]!=null){
        bl=wk.newBlock('math_number_property',obj._id);
        bl.initSvg();
        bl.render();

        bl.setFieldValue(IS_OPERATORS[obj.methodName],'PROPERTY');
        reverseParser(wk,obj.args[0],bl.getInput("NUMBER_TO_CHECK").connection);
        
        if (obj.methodName=="isDivisibleBy")
          reverseParser(wk,obj.args[1],bl.getInput("DIVISOR").connection);
        linkedConn.connect(bl.outputConnection);
        resolve(bl);
        return;

    }
    else if(AR_OPERATORS[obj.methodName]!=null){
      bl=wk.newBlock('math_arithmetic',obj._id);
      bl.initSvg();
      bl.render();

      bl.setFieldValue(AR_OPERATORS[obj.methodName],'OP');
      reverseParser(wk,obj.args[0],bl.getInput("A").connection);
      reverseParser(wk,obj.args[1],bl.getInput("B").connection);
    
      linkedConn.connect(bl.outputConnection);
      
      resolve(bl);
      return;

    }

    switch(obj.methodName){
      
      case "modulo":
        bl=wk.newBlock('math_modulo',obj._id);
        bl.initSvg();
        bl.render();

        reverseParser(wk,obj.args[0],bl.getInput("DIVIDEND").connection);
        reverseParser(wk,obj.args[1],bl.getInput("DIVISOR").connection);
        
        linkedConn.connect(bl.outputConnection);

        break;
      
      case "random":
        bl=wk.newBlock('magik_random',obj._id);
        bl.initSvg();
        bl.render();
        reverseParser(wk,obj.args[0],bl.getInput("FROM").connection);
        reverseParser(wk,obj.args[1],bl.getInput("TO").connection);
        linkedConn.connect(bl.outputConnection);
      break;
    }
    resolve(bl);
  });
}

export default numberParser;