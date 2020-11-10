import * as Blockly from 'blockly/core';
import check  from 'check-types';

var cronstrue = require('cronstrue');

var color_variable    ="#E8C62B";


var magik_variable_set={
  "type": "magik_variable_set",
  "message0": "set  %1 to %2",
  "args0": [
    {
      "type": "field_input",
      "name": "VARNAME",
      "text": "item"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_variable_set'] = {
  init: function() {
    this.jsonInit(magik_variable_set);
    this.setColour(color_variable)
  }  
};

var magik_variable_get={
  "type": "magik_variable_get",
  "message0": "get %1",
  "args0": [
    {
      "type": "field_input",
      "name": "VARNAME",
      "text": "item"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "get Variable value",
  "helpUrl": ""
}

Blockly.Blocks['magik_variable_get'] = {
  init: function() {
    this.jsonInit(magik_variable_get);
    this.setColour(color_variable)
  }  
};
