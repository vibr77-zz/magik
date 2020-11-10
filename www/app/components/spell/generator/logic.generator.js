import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'


Blockly.JavaScript['logic_operation'] = function(block) {
  // Operations 'and', 'or'.

  block.id=checkReplaceId(block.id);
  var operator = block.getFieldValue('OP');
  var order = Blockly.JavaScript.ORDER_LOGICAL_AND;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = '{ "_id":"'+block.id+'","type":"controlAnd","operator":"'+operator+'","args":['+argument0+','+argument1+']}';

  return [code, order];
};

Blockly.JavaScript['logic_compare'] = function(block) {
  block.id=checkReplaceId(block.id);
  // Comparison operator.
  var OPERATORS = {
    'EQ': 'equal',
    'NEQ': 'not_equal',
    'LT': 'inf',
    'LTE': 'inf_equal',
    'GT': 'sup',
    'GTE': 'sup_equal'
  };

  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator === '==' || operator === '!=') ? Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || 'null';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || 'null';
  
  var code = '{ "_id":"'+block.id+'","type":"controlComp","operator":"'+operator+'","args":['+argument0+','+argument1+']}';
  console.log(code);
  return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
  block.id=checkReplaceId(block.id);
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) ||'true';

  var code = '{ "_id":"'+block.id+'","type":"controlNegate","args":['+argument0+']}';
  return [code, order];
};

Blockly.JavaScript['logic_null'] = function(block) {
  block.id=checkReplaceId(block.id);
  var code = '{ "_id":"'+block.id+'","type":"controlNull","args":[]}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};