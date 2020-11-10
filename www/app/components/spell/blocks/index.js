import * as Blockly from 'blockly/core';
import BlocklyJS from 'blockly/javascript';

import './magik.device.blocks'
import './magik.spell.blocks'
import './magik.time.blocks'
import './magik.sms.blocks'
import './magik.variable.blocks'
import './magik.blocks'

function recolor(block, colr) { 
  var oldInit = block.init; 
  block.init = function() { 
    oldInit.call(this); 
    this.setColour(colr); 
  } 
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = ''; 
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
  return commentCode + code + nextCode;
}

BlocklyJS.finish = function(code) {
  return code;
}

var color_red     ="#BB243F";

recolor(Blockly.Blocks['controls_if'],color_red);
recolor(Blockly.Blocks['logic_compare'],color_red); 
recolor(Blockly.Blocks['logic_operation'],color_red); 
recolor(Blockly.Blocks['logic_boolean'],color_red); 
recolor(Blockly.Blocks['logic_null'],color_red); 
recolor(Blockly.Blocks['logic_negate'],color_red); 