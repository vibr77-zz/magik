import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'

Blockly.JavaScript['text_join'] = function(block) {
	block.id=checkReplaceId(block.id);
  var code= '{ "_id":"'+block.id+'","type":"objectString","methodName":"concat","args":[';
  let ncnx='';	
  console.log("here AAAAA");
  console.log(block.itemCount_);

  let i=0;
  do {
    if (i!=0)
      code+=",";  
    code+= Blockly.JavaScript.valueToCode(block, 'ADD' + i,Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
    
    i++;

  }while(block.getInput("ADD"+i));
  // for (var i = 0; i <= block.itemCount_; i++) {
  //   ncnx=''
  //   if (i!=block.itemCount_)
  //   	ncnx=',';
 
  //   code+= Blockly.JavaScript.valueToCode(block, 'ADD' + i,Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  //   code+=ncnx;
  // }

  code+=']}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_changeCase'] = function(block) {
  // Change capitalization.
  block.id=checkReplaceId(block.id);
  var OPERATORS = {
    'UPPERCASE': 'toUpperCase',
    'LOWERCASE': 'toLowerCase',
    'TITLECASE': 'toTitleCase'
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT',Blockly.JavaScript.ORDER_NONE) || '""';
  
  var code = '{ "_id":"'+block.id+'","type":"objectString","methodName":"'+operator+'","args":['+text+']}';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_indexOf'] = function(block) {
  // Search the text for a substring.
  block.id=checkReplaceId(block.id);

  var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  var substring = Blockly.JavaScript.valueToCode(block, 'FIND',Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  //var code = text + '.' + operator + '(' + substring + ')';
  
  var code = '{ "_id":"'+block.id+'","type":"objectString","args":['+text+','+substring+'],"methodName":"contains","operator":"'+operator+'"}'
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  block.id=checkReplaceId(block.id);
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER) || 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectString","args":['+text+'],"methodName":"isEmpty","operator":null}'
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_multiline'] = function(block) {
  block.id=checkReplaceId(block.id);
  var text = JSON.stringify(block.getFieldValue('TEXT'));
  var code = '{ "_id":"'+block.id+'","type":"objectString","args":['+text+'],"methodName":"multiLine"}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};