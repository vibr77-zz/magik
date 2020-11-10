import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import {checkReplaceId} from './libtool'

Blockly.JavaScript['magik_timewait'] = function(block) {
	block.id=checkReplaceId(block.id);
  let ncnx='';
	if (block.nextConnection.isConnected())
		ncnx=',';
  var value_duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeWait","args":['+value_duration+']}'+ncnx;
  return code;
};

Blockly.JavaScript['magik_time'] = function(block) {
  block.id=checkReplaceId(block.id);
  var number_hour = block.getFieldValue('HOUR');
  var number_min = block.getFieldValue('MINUTE');
   var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"time","args":['+number_hour+','+number_min+']}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timenow'] = function(block) {
  block.id=checkReplaceId(block.id);
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeNow","args":[]}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timebetween'] = function(block) {
  block.id=checkReplaceId(block.id);
  var value_a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_c = Blockly.JavaScript.valueToCode(block, 'C', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeBetween","args":['+value_a+','+value_b+','+value_c+']}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timeastro'] = function(block) {
  block.id=checkReplaceId(block.id);
  var astro = block.getFieldValue('ASTRO');
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeAstro","args":["'+astro+'"]}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timeoffset'] = function(block) {
  block.id=checkReplaceId(block.id);
  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var value_hour = Blockly.JavaScript.valueToCode(block, 'HOUR', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_min = Blockly.JavaScript.valueToCode(block, 'MIN', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeOffset","args":['+value_time+','+value_hour+','+value_min+']}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timecron'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  var text_trigger_name = block.getFieldValue('TRIGGER_NAME');
  var value_dow = Blockly.JavaScript.valueToCode(block, 'DOW', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var value_month = Blockly.JavaScript.valueToCode(block, 'MONTH', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var value_dom = Blockly.JavaScript.valueToCode(block, 'DOM', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var value_hour = Blockly.JavaScript.valueToCode(block, 'HOUR', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var value_minute = Blockly.JavaScript.valueToCode(block, 'MINUTE', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeCron","trigger":true,"triggerEvents":["eventTime"],"args":["'+text_trigger_name+'",'+value_minute+','+value_hour+','+value_dom+','+value_month+','+value_dow+']}'+ncnx;
  return code;
};

Blockly.JavaScript['magik_timetostring'] = function(block) {
  block.id=checkReplaceId(block.id);
  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeToString","args":['+value_time+']}'
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['magik_timedelay'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';
  var value_offset = Blockly.JavaScript.valueToCode(block, 'OFFSET', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_exec = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeDelay","objDo":['+statements_exec+'],"args":['+value_offset+']}'+ncnx;
  return code;
};

Blockly.JavaScript['magik_timetrigger'] = function(block) {
  block.id=checkReplaceId(block.id);
  let ncnx='';
  if (block.nextConnection.isConnected())
    ncnx=',';

  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{ "_id":"'+block.id+'","type":"objectTime","methodName":"timeTrigger","trigger":true,"triggerEvents":["eventTime"],"args":['+value_time+']}'+ncnx;
  return code;
};
