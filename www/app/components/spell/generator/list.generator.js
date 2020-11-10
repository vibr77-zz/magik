import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'

Blockly.JavaScript['lists_create_empty'] = function(block) {
  // Create an empty list.
  block.id=checkReplaceId(block.id);
  var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"emptyList","args":[]}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  block.id=checkReplaceId(block.id);
  let tab="";
  for (var i = 0; i < block.itemCount_; i++) {
    let tmp = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    if (i!=block.itemCount_-1)
      tab+=tmp+','
    else
      tab+=tmp
  }

  var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"listWith","args":['+tab+']}';
 
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lists_length'] = function(block) {
  // String or array length.
  block.id=checkReplaceId(block.id);
  var list = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"lengthOf","args":['+list+']}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return [list + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  block.id=checkReplaceId(block.id);
  var list = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"isEmpty","args":['+list+']}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// A Refaire
// Blockly.JavaScript['lists_indexOf'] = function(block) {
//   // Find an item in the list.
//   var operator = block.getFieldValue('END') == 'FIRST' ?
//       'indexOf' : 'lastIndexOf';
//   var item = Blockly.JavaScript.valueToCode(block, 'FIND',
//       Blockly.JavaScript.ORDER_NONE) || '\'\'';
//   var list = Blockly.JavaScript.valueToCode(block, 'VALUE',
//       Blockly.JavaScript.ORDER_MEMBER) || '[]';
//   var code = list + '.' + operator + '(' + item + ')';
//   if (block.workspace.options.oneBasedIndex) {
//     return [code + ' + 1', Blockly.JavaScript.ORDER_ADDITION];
//   }
//   return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
// };

Blockly.JavaScript['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  block.id=checkReplaceId(block.id);
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var listOrder = (where == 'RANDOM') ? Blockly.JavaScript.ORDER_COMMA : Blockly.JavaScript.ORDER_MEMBER;
  var list = Blockly.JavaScript.valueToCode(block, 'VALUE', listOrder) || '[]';

  switch (where) {
    case ('FIRST'):
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"getFirst","mode":"'+mode+'","args":['+list+']}';
      break;

    case ('LAST'):
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"getLast","mode":"'+mode+'","args":['+list+']}';
      break;

    case ('FROM_START'):
      var at = Blockly.JavaScript.valueToCode(block, 'AT',Blockly.JavaScript.ORDER_ATOMIC);
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"getIdxFromStart","mode":"'+mode+'","args":['+list+','+at+']}';
      break;

    case ('FROM_END'):
      var at = Blockly.JavaScript.valueToCode(block, 'AT',Blockly.JavaScript.ORDER_ATOMIC);
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"getIdxFromEnd","mode":"'+mode+'","args":['+list+','+at+']}';
      break;


    case ('RANDOM'):
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"getRandom","mode":"'+mode+'","args":['+list+']}';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['magik_list_remove'] = function(block) {

  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  var list = Blockly.JavaScript.valueToCode(block, 'LIST',Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var pos = Blockly.JavaScript.valueToCode(block, 'POS',Blockly.JavaScript.ORDER_ATOMIC) || null;
  var mode = block.getFieldValue('OP');

  var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"removeIndex","mode":"'+mode+'","args":['+list+','+pos+']}'+ncnx;
  return code
}

Blockly.JavaScript['lists_setIndex'] = function(block) {
  // Set element at index.
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  var list = Blockly.JavaScript.valueToCode(block, 'LIST',Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var value = Blockly.JavaScript.valueToCode(block, 'TO',Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
  
  switch (where) {
    case ('FIRST'):
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"setFirst","mode":"'+mode+'","args":['+list+','+value+']}'+ncnx;
      break;

    case ('LAST'):
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"setLast","mode":"'+mode+'","args":['+list+','+value+']}'+ncnx;
      break;

    case ('FROM_START'):
      var at = Blockly.JavaScript.valueToCode(block, 'AT',Blockly.JavaScript.ORDER_ATOMIC) || 'null';
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"setIdxFromStart","mode":"'+mode+'","args":['+list+','+value+','+at+']}'+ncnx;
      break;

    case ('FROM_END'):
      var at = Blockly.JavaScript.valueToCode(block, 'AT',Blockly.JavaScript.ORDER_ATOMIC) || 'null';
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"setIdxFromEnd","mode":"'+mode+'","args":['+list+','+value+','+at+']}'+ncnx;
      break;

    case ('RANDOM'):
      var code = '{ "_id":"'+block.id+'","type":"objectList","methodName":"setRandom","mode":"'+mode+'","args":['+list+','+value+']}'+ncnx;
      break;
  }

  return code
};