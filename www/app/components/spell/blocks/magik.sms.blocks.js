import * as Blockly from 'blockly/core';
import check  from 'check-types';


var color_sms  ="#2B41B1";


var magik_sms_trigger={
  "type": "magik_sms_trigger",
  "message0": "Sms received trigger %1 %2 Store SMS to variable %3 %4 from msisdn %5 %6 message %7 %8",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "SET_VARIABLE_CHK",
      "checked": true
    },
    {
      "type": "field_input",
      "name": "VARNAME",
      "text": "item"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "MSISDN_OP",
      "options": [
        [
          "=",
          "EQUAL"
        ],
        [
          "!=",
          "NOT_EQUAL"
        ],
        [
          "contains",
          "CONTAINS"
        ],
        [
          "not contains",
          "NOT_CONTAINS"
        ],
        [
          "match regex",
          "REGEX"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "MSISDN_TXT",
      "align": "RIGHT"
    },
    {
      "type": "field_dropdown",
      "name": "MSG_OP",
      "options": [
        [
          "=",
          "EQUAL"
        ],
        [
          "!=",
          "NOT_EQUAL"
        ],
        [
          "contains",
          "CONTAINS"
        ],
        [
          "not contains",
          "NOT_CONTAINS"
        ],
        [
          "match regex",
          "REGEX"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "MSG_TXT",
      "align": "RIGHT"
    }
  ],
  "previousStatement": "TRIGGER",
  "nextStatement": null,
  "colour": 230,
  "tooltip": "trigger on SMS receive",
  "helpUrl": ""
}

Blockly.Blocks['magik_sms_trigger'] = {
  init: function() {
    this.jsonInit(magik_sms_trigger);
  },
  onchange: function(event) {
    let conn;
    if (conn=this.previousConnection){
      
      let tgBlock=conn.targetBlock();
      if (tgBlock){
        
        let contains=false;
        if( tgBlock.nextConnection.getCheck()==null)
          contains=false;
        else
          contains=tgBlock.nextConnection.getCheck().includes("TRIGGER");
        
        console.log(contains);
        console.log(tgBlock.nextConnection.getCheck());

        if (contains!=true){
          conn.disconnect();
          this.setWarningText("A Trigger block can only be connected to a start block or another Trigger block");
        }else{
          this.setWarningText();
        }
      }
    }
    if(Blockly.Events.CHANGE === event.type) {
            // do something
    }
  }
};



var magik_sms_send={
  "type": "magik_sms_send",
  "message0": "Sens SMS %1 to: %2 message: %3 %4 log",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "MSISDN",
      "check": "String",
      "align": "RIGHT"
    },
    
    {
      "type": "input_value",
      "name": "MSG",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "field_checkbox",
      "name": "LOG",
      "checked": true
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": color_sms,
  "tooltip": "Send a SMS",
  "helpUrl": ""
}

Blockly.Blocks['magik_sms_send'] = {
  init: function() {
    this.jsonInit(magik_sms_send);
  }
};

var magik_sms_props={
  "type": "magik_sms_props",
  "message0": "Sms %1 property %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SMS"
    },
    {
      "type": "field_dropdown",
      "name": "PROPS",
      "options": [
        [
          "to",
          "to"
        ],
        [
          "from",
          "from"
        ],
        [
          "msg",
          "msg"
        ],
        [
          "status",
          "OPTIONNAME"
        ],
        [
          "creationDate",
          "OPTIONNAME"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_sms_props'] = {
  init: function() {
    this.jsonInit(magik_sms_props);
  }
};


