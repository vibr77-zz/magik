import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'

Blockly.JavaScript['magik_spell_execute'] = function(block) {
  block.id=checkReplaceId(block.id);
	let ncnx='';  
	if (block.nextConnection.isConnected())
		ncnx=',';
  var dropdown_spell = block.getFieldValue('SPELL');
  // TODO: Assemble JavaScript into code variable.
  	var code = '{ "_id":"'+block.id+'","type":"objectSpell","methodName":"executeSpell","spellId":"'+dropdown_spell+'"}'+ncnx;
 
  return code;
};

Blockly.JavaScript['magik_spell_get'] = function(block) {
  block.id=checkReplaceId(block.id);
  var dropdown_spell = block.getFieldValue('SPELL');
  var dropdown_props = block.getFieldValue('PROPS');
  var code = '{ "_id":"'+block.id+'","type":"objectSpell","methodName":"get","spellId":"'+dropdown_spell+'","arg0":"'+dropdown_props+'"}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_spell_set'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  
  var dropdown_spell = block.getFieldValue('SPELL');
  var dropdown_props = block.getFieldValue('PROPS');
  var value = Blockly.JavaScript.valueToCode(block, 'VAL',Blockly.JavaScript.ORDER_ATOMIC ) || 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectSpell","methodName":"set","spellId":"'+dropdown_spell+'","arg0":"'+dropdown_props+'","arg1":'+value+'}'+ncnx;
 
  return code;
};