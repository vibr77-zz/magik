import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'


Blockly.JavaScript['magik_variable_set'] = function (block) {
	block.id=checkReplaceId(block.id);
	let ncnx='';
	if (block.nextConnection.isConnected())
		ncnx=',';

	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || null;
  var varName = block.getFieldValue('VARNAME')
  
	var code = '{ "_id":"'+block.id+'","type":"objectVariable","methodName":"setValue","args":['+argument0+',"'+varName+'"]}'+ncnx;
  return code;
}

Blockly.JavaScript['magik_variable_get'] = function(block) {
	block.id=checkReplaceId(block.id);
	var varName = block.getFieldValue('VARNAME')
 	var code = '{ "_id":"'+block.id+'","type":"objectVariable","methodName":"getValue","args":["'+varName+'"]}';
 	return [code,Blockly.JavaScript.ORDER_ATOMIC]
}