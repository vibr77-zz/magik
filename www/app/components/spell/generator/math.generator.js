import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'




//
// Math Manage Object  
// 

Blockly.JavaScript['math_arithmetic'] = function(block) {
  block.id=checkReplaceId(block.id);
  // Basic arithmetic operators, and power.
  let OPERATORS = {
    'ADD': 'add',
    'MINUS': 'minus',
    'MULTIPLY': 'multiply',
    'DIVIDE': 'divide',
    'POWER': 'power'
  };

  var operator = OPERATORS[block.getFieldValue('OP')];
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || 'null';

  var code = '{ "_id":"'+block.id+'","type":"objectNumber","args":['+argument0+','+argument1+'],"methodName":"'+operator+'"}'
  //return code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};




// To Be Finished


Blockly.JavaScript['math_number'] = function(block) {
  // Numeric value.
  var code = Number(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION;
  //console.log(code);
 // return code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['math_single'] = function(block) {
  block.id=checkReplaceId(block.id);

  let operator = block.getFieldValue('OP');

  let methodName;
  
  let argument0 = Blockly.JavaScript.valueToCode(block, 'NUM',Blockly.JavaScript.ORDER_NONE) || '0';
  if (operator=='ABS' || operator=='ROOT' || operator=='LN' || operator=='EXP' || operator=='POW10' || operator=='ROUND' || operator=='SIN' || operator == 'COS' || operator == 'TAN' || operator=='NEG' || operator == 'ASIN' || operator == 'ACOS' || operator == 'ATAN') {
    methodName=operator.toLowerCase();
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ROUNDUP':
      methodName='roundUp';
      break;
    case 'ROUNDDOWN':
       methodName='roundDown';
    break;
  }

  var code = '{ "_id":"'+block.id+'","type":"objectNumber","args":['+argument0+'],"methodName":"'+methodName+'"}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['math_round'] = function(block) {
  block.id=checkReplaceId(block.id);
  let operator = block.getFieldValue('OP');
  let methodName;
  let argument0 = Blockly.JavaScript.valueToCode(block, 'NUM',Blockly.JavaScript.ORDER_NONE) || '0';
  //First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ROUND':
      methodName='round';
      break;
    case 'ROUNDUP':
      methodName='roundUp';
      break;
    case 'ROUNDDOWN':
       methodName='roundDown';
    break;
  }

  var code = '{ "_id":"'+block.id+'","type":"objectNumber","args":['+argument0+'],"methodName":"'+methodName+'"}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['math_number_property'] = function(block) {
  block.id=checkReplaceId(block.id);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUMBER_TO_CHECK',Blockly.JavaScript.ORDER_MODULUS) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  let methodName;
  let divisor;
  let code;
  switch (dropdown_property) {
    case 'PRIME':
      methodName="isPrime";
      break;
    case 'EVEN':
      methodName="isEven";
      break;
    case 'ODD':
      methodName="isOdd";
      break;
    case 'WHOLE':
      methodName="isWhole";
      break;
    case 'POSITIVE':
      methodName="isPositive";
      break;
    case 'NEGATIVE':
      methodName="isNegatve";
      break;
    case 'DIVISIBLE_BY':
      methodName="isDivisibleBy";
      divisor = Blockly.JavaScript.valueToCode(block, 'DIVISOR',Blockly.JavaScript.ORDER_MODULUS) || '0';
      break;
  }
  if (methodName=='isDivisibleBy')
    code = '{ "_id":"'+block.id+'","type":"objectNumber","args":['+argument0+','+divisor+'],"methodName":"'+methodName+'"}'
  else
    code = '{ "_id":"'+block.id+'","type":"objectNumber","args":['+argument0+'],"methodName":"'+methodName+'"}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['math_modulo'] = function(block) {
  block.id=checkReplaceId(block.id);

  var argument0 = Blockly.JavaScript.valueToCode(block, 'DIVIDEND',Blockly.JavaScript.ORDER_MODULUS) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'DIVISOR',Blockly.JavaScript.ORDER_MODULUS) || '0';
  var code = '{ "_id":"'+block.id+'","type":"objectNumber","args":['+argument0+','+argument1+'],"methodName":"modulo"}'
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_random'] = function(block) {
  // Random integer between [X] and [Y].
  block.id=checkReplaceId(block.id);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
 
  var code = '{ "_id":"'+block.id+'","type":"objectNumber","methodName":"random","args":['+argument0+','+argument1+']}';
   return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'LOW',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(block, 'HIGH',
      Blockly.JavaScript.ORDER_COMMA) || 'Infinity';
  var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

