import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'

Blockly.JavaScript['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  let ncnx='';
	if (block.nextConnection.isConnected())
		ncnx=',';

  block.id=checkReplaceId(block.id);
  var until = block.getFieldValue('MODE') === 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
      until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
      Blockly.JavaScript.ORDER_NONE) || 'null';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  if (until) {
    argument0 = '!' + argument0;
  }
  var code = '{ "_id":"'+block.id+'","type":"controlWhile","objWhile":'+argument0+',"doWhile":['+branch+']}'+ncnx
  return code;
};

Blockly.JavaScript['controls_repeat_ext'] = function(block) {
  block.id=checkReplaceId(block.id);
  
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  if (block.getField('TIMES')) {
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    var repeats = Blockly.JavaScript.valueToCode(block,'TIMES', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }

  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var endVar = repeats;
  
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.JavaScript.variableDB_.getDistinctName('repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = '{ "_id":"'+block.id+'","type":"controlLoop","objCount":'+endVar+',"doLoop":['+branch+']}'+ncnx;

  return code;
};

Blockly.JavaScript['text'] = function(block) {
  // Text value.
  var code = JSON.stringify(block.getFieldValue('TEXT'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['controls_if'] = function (block) {
	block.id=checkReplaceId(block.id);
		var n = 0;
  	var code = '', branchCode,elseBranchCode, conditionCode;
		
		let ncnx='';
		if (block.nextConnection.isConnected())
			ncnx=',';

		conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || 'null';
    branchCode = Blockly.JavaScript.statementToCode(block, 'DO' + n) ||'';
    
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
      branchCode = Blockly.JavaScript.prefixLines(Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,block), Blockly.JavaScript.INDENT) + branchCode;
    }

    if (block.getInput('ELSE') || Blockly.JavaScript.STATEMENT_SUFFIX) {
    	elseBranchCode = Blockly.JavaScript.statementToCode(block, 'ELSE') || '';
  	}else{
      elseBranchCode='';
    }

   	code = '{ "_id":"'+block.id+'","type":"controlIfelse","objIf":'+conditionCode+',"doIf":['+branchCode+'],"doElse":['+elseBranchCode+']}'+ncnx;
    return code;
};


Blockly.JavaScript['controls_forEach'] = function(block) {
  // For each loop.
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
 
  var variable0 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO') ;
  
  var code = '{ "_id":"'+block.id+'","type":"controlForeach","doLoop":['+branch+'],"args":["'+variable0+'",'+argument0+']}'+ncnx;
 
  return code;
};

Blockly.JavaScript['magik_flow'] = function(block) {
  // Flow statements: continue, break.
  block.id=checkReplaceId(block.id);
    let ncnx='';
  //if (block.nextConnection.isConnected())
  //  ncnx=',';

  var code = '{ "_id":"'+block.id+'","type":"controlFlow","args":["'+block.getFieldValue('FLOW')+'"]}'
  return code;
};

