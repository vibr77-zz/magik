import * as Blockly from 'blockly/core';
import check  from 'check-types';

var color_spell   ="#9538BB";

var magik_spell_get={
  "type": "magik_spell_get",
  "message0": "Spell %1 get %2",
  "args0": [
     {
      "type": "input_dummy",
      "name": "SPELL",
    },
    {
      "type": "field_dropdown",
      "name": "PROPS",
      "options": [
        [
          "displayName",
          "displayName"
        ],
        [
          "_id",
          "_id"
        ],
        [
          "description",
          "description"
        ],
        [
          "parallelProcess",
          "parallelProcess"
        ],
        [
          "status",
          "status"
        ],
        [
          "isHidden",
          "isHidden"
        ],
        [
          "checkPass",
          "checkPass"
        ],
        [
          "storeExecLog",
          "storeExecLog"
        ],
        [
          "categoryId",
          "categoryId"
        ]   
      ]
    }
  ],
  "extensions": ["dynamicSpellDropDownExtension"],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_spell_get'] = {
  init: function() {
    this.jsonInit(magik_spell_get);
    this.getField('PROPS').setValidator(this.updateConnections);
    this.setColour(color_spell)
  },
  updateConnections: function(newValue) {
    let bl=this.getSourceBlock();
    switch (newValue){

      case 'displayName':
        bl.setOutput(true,'String');
        break;
      case '_id':
        bl.setOutput(true,'String');
        break;
      case 'description':
        bl.setOutput(true,'String');
        break;

      case 'parallelProcess':
        bl.setOutput(true,'Boolean');
        break;

      case 'status':
        bl.setOutput(true,'Boolean');
        break;

      case 'isHidden':
        bl.setOutput(true,'Boolean');
        break;

      case 'checkPass':
        bl.setOutput(true,'Boolean');
        break;

       case 'storeExecLog':
        bl.setOutput(true,'Boolean');
        break;
      
      case 'categoryId':
        bl.setOutput(true,'String');
        break;

      default:
        break;
    }
  }
};

var magik_spell_set={
  "type": "magik_spell_set",
  "message0": "Spell %1 set %2 to %3 ",
  "args0": [
     {
      "type": "input_dummy",
      "name": "SPELL",
    },
    {
      "type": "field_dropdown",
      "name": "PROPS",
      "options": [
        [
          "displayName",
          "displayName"
        ],
        [
          "description",
          "description"
        ],
        [
          "parallelProcess",
          "parallelProcess"
        ],
        [
          "status",
          "status"
        ],
        [
          "isHidden",
          "isHidden"
        ],
        [
          "storeExecLog",
          "storeExecLog"
        ],
        [
          "categoryId",
          "categoryId"
        ]   
      ]
    },
    {
      "type": "input_value",
      "name": "VAL"
    },
  ],
  "extensions": ["dynamicSpellDropDownExtension"],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_spell_set'] = {
  init: function() {
    this.jsonInit(magik_spell_set);
    this.getField('PROPS').setValidator(this.updateConnections)
    this.setColour(color_spell)
  },
  updateConnections: function(newValue) {
    let bl=this.getSourceBlock();
    switch (newValue){

      case 'displayName':
        bl.getInput('VAL').setCheck('String');
        break;
      case 'description':
        bl.getInput('VAL').setCheck('String');
        break;
      case 'parallelProcess':
        bl.getInput('VAL').setCheck('Boolean');
        break;

      case 'status':
        bl.getInput('VAL').setCheck('Boolean');
        break;

      case 'isHidden':
        bl.getInput('VAL').setCheck('Boolean');
        break;

      case 'storeExecLog':
        bl.getInput('VAL').setCheck('Boolean');
        break;

      case 'categoryId':
        bl.getInput('VAL').setCheck('String');
        break;
      
      default:
        break;
    }
  }
};

var magik_spell_execute={
  "type": "magik_spell_execute",
  "message0": "Execute Spell %1 %2 save log",
  "args0": [
    {
      "type": "input_dummy",
      "name": "SPELL",
    },
    
    {
      "type": "field_checkbox",
      "name": "LOG",
      "checked": true
    }
  ],
  "extensions": ["dynamicSpellDropDownExtension"],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Execute Spell",
  "helpUrl": ""
}



Blockly.Blocks['magik_spell_execute'] = {
  init: function() {
    this.jsonInit(magik_spell_execute);
    this.setColour(color_spell)
  }
};