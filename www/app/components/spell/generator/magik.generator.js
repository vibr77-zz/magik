import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'



Blockly.JavaScript['magik_start'] = function(block) {
  return '';
};

Blockly.JavaScript['magik_alexa_scene'] = function(block) {
  return '';
};

Blockly.JavaScript['magik_email_send'] = function(block) {
	block.id=checkReplaceId(block.id);
  let ncnx='';
	if (block.nextConnection.isConnected())
		ncnx=',';

  var value_to = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC) || "";
  var value_subject = Blockly.JavaScript.valueToCode(block, 'SUBJECT', Blockly.JavaScript.ORDER_ATOMIC)|| "";
  var value_body = Blockly.JavaScript.valueToCode(block, 'BODY', Blockly.JavaScript.ORDER_ATOMIC) || "";
  var checkbox_log = block.getFieldValue('LOG') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.

  if (value_to=="")
    value_to='null';

  if (value_subject=="")
    value_subject='null';

  if (value_body=="")
    value_body='null';

  var code = '{ "_id":"'+block.id+'","type":"objectEmail","methodName":"sendEmail","args":['+value_to+','+value_subject
  +','+value_body+']}'+ncnx;

  return code;
};

Blockly.JavaScript['magik_logger'] = function(block) {
	block.id=checkReplaceId(block.id);
	let ncnx='';  
	if (block.nextConnection.isConnected())
			ncnx=',';
  var text_logitem = block.getFieldValue('LOGITEM');
  var value_logitem = Blockly.JavaScript.valueToCode(block, 'LOGITEM', Blockly.JavaScript.ORDER_ATOMIC) ;

  if (value_logitem=='')
  	value_logitem='null';
  var dropdown_severity = block.getFieldValue('SEVERITY');
  // TODO: Assemble JavaScript into code variable.
  var code = '{ "_id":"'+block.id+'","type":"objectLogger","logItem":'+value_logitem+',"severity":"'+dropdown_severity+'"}'+ncnx;
  return code;
};

Blockly.JavaScript['magik_foreach'] = function(block) {
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

Blockly.JavaScript['magik_text_parser'] = function(block) {
  block.id=checkReplaceId(block.id);
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
  let i = 0;
  let arglst='';
  while (block.getInput('VALUE' + i)) {
    arglst+=",";
    arglst+= "\""+block.getFieldValue('ARG'+i)+"\"";
    arglst+=",";
    arglst+=Blockly.JavaScript.valueToCode(block, 'VALUE'+i, Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
    i++;
  }

  var code = '{ "_id":"'+block.id+'","type":"objectString","args":['+text+arglst+'],"methodName":"textParser"}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_text_reverse_parser'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
  let i = 0;
  let arglst='';
  while (block.getField('ARG' + i)) {
    arglst+=",";
    arglst+= "\""+block.getFieldValue('ARG'+i)+"\"";
    i++;
  }

  var code = '{ "_id":"'+block.id+'","type":"objectString","args":['+text+arglst+'],"methodName":"textReverseParser"}'+ncnx;
  return code
};

Blockly.JavaScript['magik_comment'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  var text_comment = JSON.stringify(block.getFieldValue('COMMENT'));
  var code = '{ "_id":"'+block.id+'","type":"objectComment","args":['+text_comment+']}'+ncnx;

  return code;
};






