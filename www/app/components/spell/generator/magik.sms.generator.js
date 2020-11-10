import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'



Blockly.JavaScript['magik_sms_trigger'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  var checkbox_name = block.getFieldValue('SET_VARIABLE_CHK') == 'TRUE';
  var text_name = block.getFieldValue('VARNAME')|| null;
  var dropdown_msisdn_op = block.getFieldValue('MSISDN_OP');
  var value_msisdn_txt = Blockly.JavaScript.valueToCode(block, 'MSISDN_TXT', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var dropdown_msg_op = block.getFieldValue('MSG_OP');
  var value_msg_txt = Blockly.JavaScript.valueToCode(block, 'MSG_TXT', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = '{ "_id":"'+block.id+'","type":"objectSms","methodName":"smsTrigger","trigger":true,"triggerEvents":["eventSms"],"args":['+checkbox_name+',"'+text_name+'",'+value_msisdn_txt+',"'+dropdown_msisdn_op+'",'+value_msg_txt+',"'+dropdown_msg_op+'"]}'+ncnx;

  return code;
};

Blockly.JavaScript['magik_sms_send'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  let msisdn = Blockly.JavaScript.valueToCode(block, 'MSISDN',Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  let msg = Blockly.JavaScript.valueToCode(block, 'MSG',Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectSms","args":['+msisdn+','+msg+'],"methodName":"sendSms"}'+ncnx;

  return code;
}


Blockly.JavaScript['magik_sms_props'] = function(block) {
  block.id=checkReplaceId(block.id);

  var value_sms = Blockly.JavaScript.valueToCode(block, 'SMS', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var dropdown_props = block.getFieldValue('PROPS');
 
  var code = '{ "_id":"'+block.id+'","type":"objectSms","methodName":"getSmsProps","args":['+value_sms+',"'+dropdown_props+'"]}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};