import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'

Blockly.JavaScript['magik_device_setProps'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  
  var dropdown_device = block.getFieldValue('DEVICE');
  var dropdown_props = block.getFieldValue('PROPS');
  var value = Blockly.JavaScript.valueToCode(block, 'VAL',Blockly.JavaScript.ORDER_ATOMIC ) || 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"set","deviceId":"'+dropdown_device+'","args":["'+dropdown_props+'",'+value+']}'+ncnx;
 
  return code;
};

Blockly.JavaScript['magik_device_getProps'] = function(block) {
  block.id=checkReplaceId(block.id);
  var dropdown_device = block.getFieldValue('DEVICE');
  var dropdown_props = block.getFieldValue('PROPS');
  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"get","deviceId":"'+dropdown_device+'","args":['+dropdown_props+']}'
 
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timecomp'] = function(block) {
  block.id=checkReplaceId(block.id);
  var value_a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var operator = block.getFieldValue('OP');
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeComp","operator":"'+operator+'","args":['+value_a+','+value_b+']}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_device_getcx'] = function(block) {
  block.id=checkReplaceId(block.id);
  

  if (block.getField('DEVICE'))
    var dropdown_device = block.getFieldValue('DEVICE');
  else 
    var dropdown_device ='null';

  if (block.getField('SERVICE'))
    var dropdown_service = block.getFieldValue('SERVICE');
  else
     var dropdown_service = 'null';
  
  if (block.getField('CX'))
      var dropdown_cx = block.getFieldValue('CX');
  else
       var dropdown_cx ='null';
     // var value_name = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  // TODO: Assemble JavaScript into code variable.
 
  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"getCx","args":["'+dropdown_device+'","'+dropdown_service+'","'+dropdown_cx+'"]}'
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_device_getsrv'] = function(block) {
  block.id=checkReplaceId(block.id);
  

  if (block.getField('DEVICE'))
    var dropdown_device = block.getFieldValue('DEVICE');
  else 
    var dropdown_device ='null';

  if (block.getField('SERVICE'))
    var dropdown_service = block.getFieldValue('SERVICE');
  else
     var dropdown_service = 'null';
  
  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"getSrv","args":["'+dropdown_device+'","'+dropdown_service+'"]}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_device_getdevice'] = function(block) {
  block.id=checkReplaceId(block.id);
  if (block.getField('DEVICE'))
    var dropdown_device = block.getFieldValue('DEVICE');
  else 
    var dropdown_device ='null';

  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"getDevice","args":["'+dropdown_device+'"]}'  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_device_getcxprops'] = function(block) {
  block.id=checkReplaceId(block.id);
  

  if (block.getField('DEVICE'))
    var dropdown_device = block.getFieldValue('DEVICE');
  else 
    var dropdown_device ='null';

  if (block.getField('SERVICE'))
    var dropdown_service = block.getFieldValue('SERVICE');
  else
     var dropdown_service = 'null';
  
  if (block.getField('CX'))
      var dropdown_cx = block.getFieldValue('CX');
  else
       var dropdown_cx ='null';
  if (block.getField('PROPS'))
      var dropdown_props = block.getFieldValue('PROPS');
  else
       var dropdown_props ='null';
     // var value_name = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  // TODO: Assemble JavaScript into code variable.
 
  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"getCxProps","args":["'+dropdown_device+'","'+dropdown_service+'","'+dropdown_cx+'","'+dropdown_props+'"]}'
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_device_setcx'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  if (block.getField('DEVICE'))
    var dropdown_device = block.getFieldValue('DEVICE');
  else 
    var dropdown_device ='';

  if (block.getField('SERVICE'))
    var dropdown_service = block.getFieldValue('SERVICE');
  else
     var dropdown_service = '';
  
  if (block.getField('CX'))
      var dropdown_cx = block.getFieldValue('CX');
  else
       var dropdown_cx ='';
      var value_name = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  // TODO: Assemble JavaScript into code variable.
 
  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"setCx","args":["'+dropdown_device+'","'+dropdown_service+'","'+dropdown_cx+'",'+value_name+']}'+ncnx
  
  return code;
};


Blockly.JavaScript['magik_device_trigger'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  var value_cx = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var dropdown_operator = block.getFieldValue('OPERATOR');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  // TODO: Assemble JavaScript into code variable.

  let objConn=this.getInput("OBJ").connection;
  let tgBlock=objConn.targetBlock();
  let ev="null";
  if (tgBlock){
    //console.log(tgBlock.type);
    if(tgBlock.type=="magik_device_getcx")
      ev="\"eventCx\"";
    else if(tgBlock.type=="magik_device_getsrv")
      ev="\"eventService\"";
    else if(tgBlock.type=="magik_device_getdevice")
      ev="\"eventDevice\"";
  }

  var code = '{ "_id":"'+block.id+'","type":"objectDevice","methodName":"deviceTrigger","trigger":true,"triggerEvents":['+ev+'],"args":['+value_cx+',"'+dropdown_operator+'",'+value_value+']}'+ncnx;
 
  return code;
};

