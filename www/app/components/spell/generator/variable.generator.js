import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'



Blockly.JavaScript['variables_set'] = function (block) {
	block.id=checkReplaceId(block.id);
	let ncnx='';
	if (block.nextConnection.isConnected())
		ncnx=',';

	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);	
	//console.log(block.getFieldValue('VAR'));

	var code = '{ "_id":"'+block.id+'","type":"objectVariable","methodName":"setValue","valueObj":'+argument0+',"varName":"'+varName+'"}'+ncnx;
  return code;
}

Blockly.JavaScript['variables_get'] = function(block) {
	block.id=checkReplaceId(block.id);
	var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),Blockly.VARIABLE_CATEGORY_NAME);
 	var code = '{ "_id":"'+block.id+'","type":"objectVariable","methodName":"getValue","varName":"'+varName+'"}';
 	return [code,Blockly.JavaScript.ORDER_ATOMIC]
} 

Blockly.JavaScript['math_change'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = '{ "_id":"'+block.id+'","type":"objectVariable","methodName":"setValue","valueObj":'+argument0+',"varName":"'+varName+'"}'+ncnx;
  return code;
}
