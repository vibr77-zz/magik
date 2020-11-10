import * as Blockly from 'blockly/core';
import check  from 'check-types';

var cronstrue = require('cronstrue');

var color_time    ="#E8C62B";

var magik_timewait={
  "type": "magik_timewait",
  "message0": "Wait for %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "DURATION",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Pause the execution",
  "helpUrl": ""
}


Blockly.Blocks['magik_timewait'] = {
  init: function() {
    this.jsonInit(magik_timewait);
    this.setColour(color_time)
  }  
};

var magik_timetostring={
  "type": "magik_timetostring",
  "message0": "time to string %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TIME",
      "check": "TIME"
    }
  ],
  "output": "String",
  "colour": 0,
  "tooltip": "Convert a time object into HH:00",
  "helpUrl": ""
}


Blockly.Blocks['magik_timetostring'] = {
  init: function() {
    this.jsonInit(magik_timetostring);
    this.setColour(color_time)
  }
};

var magik_timecron={
  "type": "magik_timecron",
  "message0": "Cron Trigger %1 %2 %3 %4 Day of Week %5 Month %6 Day of month %7 Hour %8 Minute %9",
  "args0": [
    {
      "type": "field_input",
      "name": "TRIGGER_NAME",
      "text": "Trigger name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_label_serializable",
      "name": "RULE",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "DOW",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "MONTH",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "DOM",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "HOUR",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "MINUTE",
      "check": "String",
      "align": "RIGHT"
    }
  ],
  "previousStatement": "TRIGGER",
  "nextStatement": "TRIGGER",
  "colour": 230,
  "tooltip": "Classic crontab",
  "helpUrl": ""
}

Blockly.Blocks['magik_timecron'] = {
  init: function() {
    this.jsonInit(magik_timecron);
    this.setColour(color_time)
  },
  onchange: function(event) {
    


    var value_dow = Blockly.JavaScript.valueToCode(this, 'DOW', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
    var value_month = Blockly.JavaScript.valueToCode(this, 'MONTH', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
    var value_dom = Blockly.JavaScript.valueToCode(this, 'DOM', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
    var value_hour = Blockly.JavaScript.valueToCode(this, 'HOUR', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
    var value_minute = Blockly.JavaScript.valueToCode(this, 'MINUTE', Blockly.JavaScript.ORDER_ATOMIC)|| 'null';

    //console.log(value_dow);
    
    if (typeof JSON.parse(value_minute)=="string" &&
      typeof JSON.parse(value_hour)=="string" &&
      typeof JSON.parse(value_dom)=="string" &&
      typeof JSON.parse(value_month)=="string" &&
      typeof JSON.parse(value_dow)=="string"
      ){
      let crn=JSON.parse(value_minute)+" "+JSON.parse(value_hour)+" "+JSON.parse(value_dom)+" "+JSON.parse(value_month)+" "+JSON.parse(value_dow);
      let hrcrn=cronstrue.toString(crn,{ use24HourTimeFormat: true }) // human readable;
      //console.log(crn);
      this.setCommentText(hrcrn+"\n\n Tips: ',' to separate values,\n '*' for wild card,\n '/' for every,\n '-' for range");
      //this.setFieldValue(hrcrn,"RULE");
      this.setTooltip(hrcrn+"\n\n Tips: ',' to separate values,\n '*' for wild card,\n '/' for every,\n '-' for range");
    }else{
      this.setCommentText("\n\n Tips: ',' to separate values,\n '*' for wild card,\n '/' for every,\n '-' for range");
      //this.setFieldValue("","RULE");
      this.setTooltip("\n\n Tips: ',' to separate values,\n '*' for wild card,\n '/' for every,\n '-' for range");
    }

    let conn;
    if (conn=this.previousConnection){
      
      let tgBlock=conn.targetBlock();
      if (tgBlock){
        
        let contains=false;
        if( tgBlock.nextConnection.getCheck()==null)
          contains=false;
        else
          contains=tgBlock.nextConnection.getCheck().includes("TRIGGER");
        
        //console.log(contains);
        //console.log(tgBlock.nextConnection.getCheck());

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

var magik_timetrigger={
  "type": "magik_timetrigger",
  "message0": "Trigger at %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TIME",
      "check": "TIME"
    }
  ],
  "inputsInline": true,
  "previousStatement": "TRIGGER",
  "nextStatement": "TRIGGER",
  "colour": 210,
  "tooltip": "Trigger Spell at",
  "helpUrl": ""
}

Blockly.Blocks['magik_timetrigger'] = {
  init: function() {
    this.jsonInit(magik_timetrigger);
    this.setColour(color_time)
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

var magik_comment={
  "type": "magik_comment",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "COMMENT",
      "text": "put here a comment"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_comment'] = {
  init: function() {
    this.jsonInit(magik_comment);
    this.setColour("#FFFC33") // Yellow
  }
};


var magik_timedelay={
  "type": "magik_timedelay",
  "message0": "delay execution by %1 ms %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "OFFSET",
      "check": "Number"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "Delay the execution",
  "helpUrl": ""
}

Blockly.Blocks['magik_timedelay'] = {
  init: function() {
    this.jsonInit(magik_timedelay);
    this.setColour(color_time)
  }
};

var magik_timeoffset={
  "type": "magik_timeoffset",
  "message0": "offset time %1 by %2 h %3 min",
  "args0": [
    {
      "type": "input_value",
      "name": "TIME",
      "check": "TIME"
    },
    {
      "type": "input_value",
      "name": "HOUR",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "MIN",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "TIME",
  "colour": 0,
  "tooltip": "Offset input time by",
  "helpUrl": ""
}

Blockly.Blocks['magik_timeoffset'] = {
  init: function() {
    this.jsonInit(magik_timeoffset);
    this.setColour(color_time)
  }
};

var magik_timeastro={
  "type": "magik_timeastro",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ASTRO",
      "options": [
        [
          "sunrise",
          "sunrise"
        ],
        [
          "sunrise end",
          "sunriseEnd"
        ],
        [
          "golden hour",
          "goldenHour"
        ],
        [
          "golden hour end",
          "goldenHourEnd"
        ],
        [
          "solar noon",
          "solarNoon"
        ],
        [
          "sunset",
          "sunset"
        ],
        [
          "sunset end",
          "sunsetEnd"
        ],
        [
          "dusk",
          "dusk"
        ],
        [
          "nautical dusk",
          "nauticalDusk"
        ],
        [
          "night",
          "night"
        ],
        [
          "night end",
          "nightEnd"
        ],
        [
          "dawn",
          "dawn"
        ],
        [
          "nautical dawn",
          "nauticalDawn"
        ],
        [
          "nadir",
          "nadir"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "TIME",
  "colour": 0,
  "tooltip": "get Astro Event time",
  "helpUrl": ""
}

Blockly.Blocks['magik_timeastro'] = {
  init: function() {
    this.jsonInit(magik_timeastro);
    this.setColour(color_time)
  }
};

var magik_timebetween={
  "type": "magik_timebetween",
  "message0": "time %1 is between %2 %3 and %4 %5",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "TIME"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "TIME"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "C",
      "check": "TIME"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 0,
  "tooltip": "Check time in between ",
  "helpUrl": ""
}

Blockly.Blocks['magik_timebetween'] = {
  init: function() {
    this.jsonInit(magik_timebetween);
    this.setColour(color_time)
  }
};

var magik_timenow={
  "type": "magik_timenow",
  "message0": "Now",
  "inputsInline": true,
  "output": "TIME",
  "colour": 0,
  "tooltip": "Time Now",
  "helpUrl": ""
}

Blockly.Blocks['magik_timenow'] = {
  init: function() {
    this.jsonInit(magik_timenow);
    this.setColour(color_time)
  }
};

var magik_time={
  "type": "magik_time",
  "message0": "Time %1 : %2",
  "args0": [
    {
      "type": "field_number",
      "name": "HOUR",
      "value": 12,
      "min": 0,
      "max": 23
    },
    {
      "type": "field_number",
      "name": "MINUTE",
      "value": 0,
      "min": 0,
      "max": 59
    }
  ],
  "inputsInline": true,
  "output": "TIME",
  "colour": 0,
  "tooltip": "Create new time",
  "helpUrl": ""
}

Blockly.Blocks['magik_time'] = {
  init: function() {
    this.jsonInit(magik_time);
    this.setColour(color_time)
  }
};

var magik_timecomp={
  "type": "magik_timecomp",
  "message0": "time %1 %2 is %3 %4 %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "A",
      "check": "TIME"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        [
          "before",
          "before"
        ],
        [
          "equal",
          "equal"
        ],
        [
          "after",
          "after"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "TIME"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_timecomp'] = {
  init: function() {
    this.jsonInit(magik_timecomp);
    this.setColour(color_time)
  }
};