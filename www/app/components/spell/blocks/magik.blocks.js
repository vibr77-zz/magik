
import * as Blockly from 'blockly/core';
import check  from 'check-types';


var magik_start= {
  "type": "magik_start",
  "lastDummyAlign0": "CENTRE",
  "message0": "Start",
  "inputsInline": true,
  "nextStatement": "TRIGGER",
  
  "tooltip": "Start of the Spell",
  "helpUrl": "",
  "style": "hat_blocks"
}



Blockly.Blocks['magik_start'] = {
  init: function() {
    this.jsonInit(magik_start);
    this.setColour("#C433FF");
  
  //this.setCommentText("HOOOH");
  //this.setShadow(true);
  }
};




var magik_random={
  "type": "magik_random",
  "message0": "Random Integer %1 From %2 to %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "FROM",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 230,
  "tooltip": "Generate a random Number between to integer",
  "helpUrl": ""
}

Blockly.Blocks['magik_random'] = {
  init: function() {
    this.jsonInit(magik_random);
  }
};

var magik_list_remove={

  "type": "magik_list_remove",
  "message0": "in list %1 remove %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "LIST"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        [
          "first",
          "FIRST"
        ],
        [
          "last",
          "LAST"
        ],
        [
          "at #",
          "AT"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "POS"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Remove an item from a list",
  "helpUrl": ""
}

Blockly.Blocks['magik_list_remove'] = {
  init: function() {
    this.jsonInit(magik_list_remove);
  }
};


var magik_foreach={
  "type": "magik_foreach",
  "message0": "for each %1 in list %2 %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "VAR",
      "text": "item"
    },
    {
      "type": "input_value",
      "name": "LIST",
      "check": "Array"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": "do"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_foreach'] = {
  init: function() {
    this.jsonInit(magik_foreach);
  }
};

var magik_flow={
  "type": "magik_flow",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FLOW",
      "options": [
        [
          "break out",
          "BREAK"
        ],
        [
          "continue with next iteration",
          "CONTINUE"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "colour": 230,
  "tooltip": "Flow control of loop",
  "helpUrl": ""
}


Blockly.Blocks['magik_flow'] = {
  init: function() {
    this.jsonInit(magik_flow);
  }
};

var magik_email_send={
  "type": "magik_email_send",
  "message0": "Send Email %1 to: %2 subject: %3 body %4 %5 log",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "SUBJECT",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "BODY",
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
  "colour": 230,
  "tooltip": "send an email",
  "helpUrl": ""
}


Blockly.Blocks['magik_email_send'] = {
  init: function() {
    this.jsonInit(magik_email_send);
  }
};

 var magik_alexa_scene={
  "type": "magik_alexa_scene",
  "message0": "Alexa friendly name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "ALEXA_FRIENDLY_NAME",
      "text": ""
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_alexa_scene'] = {
  init: function() {
    this.jsonInit(magik_alexa_scene);
  }
};


var magik_logger={
  "type": "magik_logger",
  "message0": "Logger %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LOGITEM",
      "check": "String"
    },
    {
      "type": "field_dropdown",
      "name": "SEVERITY",
      "options": [
        [
          "Info",
          "INFO"
        ],
        [
          "Warning",
          "WARN"
        ],
        [
          "Error",
          "ERROR"
        ]
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_logger'] = {
  init: function() {
    this.jsonInit(magik_logger);
    //this.setStyle('loop_blocks');
  }
};

var magik_parser_arg_top={
    "type": "magik_parser_arg_top",
    "message0": "arguments list",
    "nextStatement": null,
    "enableContextMenu": false,
    "tooltip": "",
    "colour": 230,
}

Blockly.Blocks['magik_parser_arg_top'] = {
  init: function() {
    this.jsonInit(magik_parser_arg_top);
  }
};

var magik_text_reverse_parser_arg={
  "type": "magik_text_reverse_parser_arg",
  "message0": "assign {x} to %1",
  "args0": [
   
    {
      "type": "field_input",
      "name": "VAR",
      "text": "item"
    }
    
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_text_reverse_parser_arg'] = {
  init: function() {
    this.jsonInit(magik_text_reverse_parser_arg);
    //this.setStyle('loop_blocks');
  }
};

var magik_text_reverse_parser={
  "type": "magik_text_reverse_parser",
  "message0": "with text %1 assign {0} to %2",
  "args0": [
    
    {
      "type": "input_value",
      "name": "TEXT",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "ARG0",
      "text": "item"
    },
  ],
  "mutator": "magik_text_reverse_parser_mutator",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_text_reverse_parser'] = {
  init: function() {
    this.jsonInit(magik_text_reverse_parser);
  }
};

var MAGIK_TXT_REVERSE_PARSER_MUTATOR = {
  args_: 0,
  suppressPrefixSuffix: true,

 
  mutationToDom: function() {
    if (!this.args_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    if (this.args_) {
      container.setAttribute('args', this.args_);
    }
    
    return container;
  },
  
  domToMutation: function(xmlElement) {
    this.args_ = parseInt(xmlElement.getAttribute('args_'), 10) || 0;
    this.rebuildShape_();
  },
  
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('magik_parser_arg_top');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    
    for (var i = 1; i <= this.args_; i++) {
      var argsBlock = workspace.newBlock('magik_text_reverse_parser_arg');
      argsBlock.initSvg();
      connection.connect(argsBlock.previousConnection);
    }
    
    return containerBlock;
  },
  
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.args_ = 0;
    
    var valueConnections = [null];
   
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'magik_text_reverse_parser_arg':
          this.args_++;
          valueConnections.push(clauseBlock.valueConnection_);
        
          break;
        
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    this.reconnectChildBlocks_(valueConnections);
  },
  
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'magik_text_reverse_parser_arg':
          var args = this.getInput('VALUE' + i);
          //clauseBlock.valueConnection_ = args && args.connection.targetConnection;
          i++;
          break;
        
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
      }
      clauseBlock = clauseBlock.nextConnection &&clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Reconstructs the block with all child blocks attached.
   * @this {Blockly.Block}
   */
  rebuildShape_: function() {
    var valueConnections = [null];
   

    var i = 1;
    while (this.getInput('VALUE' + i)) {
      var args = this.getInput('VALUE' + i);
      //var inputDo = this.getInput('DO' + i);
      //valueConnections.push(args.connection.targetConnection);
      //statementConnections.push(inputDo.connection.targetConnection);
      i++;
    }
    this.updateShape_();
    this.reconnectChildBlocks_(valueConnections);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function() {
    // Delete everything.
    
    var i = 1;
    while (this.getInput('VALUE' + i)) {
      this.removeInput('VALUE' + i);
      i++;
    }
    // Rebuild block.
    for (i = 1; i <= this.args_; i++) {
     
      this.appendDummyInput('VALUE' + i)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(new Blockly.FieldLabel('assign {'+i+'} to '))
          .appendField(new Blockly.FieldTextInput('item'),'ARG'+i)
    }
  },
  /**
   * Reconnects child blocks.
   * @param {!Array.<?Blockly.RenderedConnection>} valueConnections List of
   * value connections for 'if' input.
   * @param {!Array.<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for 'do' input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   * @this {Blockly.Block}
   */
  reconnectChildBlocks_: function(valueConnections) {
    for (var i = 1; i <= this.args_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'VALUE' + i);
    }
  }
};

Blockly.Extensions.registerMutator('magik_text_reverse_parser_mutator',MAGIK_TXT_REVERSE_PARSER_MUTATOR, null,['magik_text_reverse_parser_arg']);

var magik_text_parser_arg={
  "type": "magik_text_parser_arg",
  "message0": "replace  %1 by %2",
  "args0": [
    {
      "type": "field_input",
      "name": "VAR",
      "text": "item"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_text_parser_arg'] = {
  init: function() {
    this.jsonInit(magik_text_parser_arg);
    //this.setStyle('loop_blocks');
  }
};

var magik_text_parser={
  "type": "magik_text_parser",
  "message0": "with text %1 replace %2 by %3",
  "args0": [
    
     {
      "type": "input_value",
      "name": "TEXT",
      "align": "LEFT"
    },
    
    {
      "type": "field_input",
      "name": "ARG0",
      "text": "item"
    },
    {
      "type": "input_value",
      "name": "VALUE0",
      "align": "RIGHT"
    }
  ],
  "mutator": "magik_text_parser_mutator",
  "inputsInline": false,
  "output": "String",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_text_parser'] = {
  init: function() {
    this.jsonInit(magik_text_parser);
  }
};


var MAGIK_TXT_PARSER_MUTATOR = {
  args_: 0,

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code.  These will be handled manually in this block's generators.
   */
  suppressPrefixSuffix: true,

  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    if (!this.args_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    if (this.args_) {
      container.setAttribute('args', this.args_);
    }
    
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.args_ = parseInt(xmlElement.getAttribute('args_'), 10) || 0;
    this.rebuildShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('magik_parser_arg_top');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    
    for (var i = 1; i <= this.args_; i++) {
      var argsBlock = workspace.newBlock('magik_text_parser_arg');
      argsBlock.initSvg();
      connection.connect(argsBlock.previousConnection);
    }
    
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.args_ = 0;
    
    var valueConnections = [null];
   
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'magik_text_parser_arg':
          this.args_++;
          valueConnections.push(clauseBlock.valueConnection_);
        
          break;
        
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    this.reconnectChildBlocks_(valueConnections);
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'magik_text_parser_arg':
          var inputIf = this.getInput('VALUE' + i);
          clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
          i++;
          break;
        
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
      }
      clauseBlock = clauseBlock.nextConnection &&clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Reconstructs the block with all child blocks attached.
   * @this {Blockly.Block}
   */
  rebuildShape_: function() {
    var valueConnections = [null];
   

    var i = 1;
    while (this.getInput('VALUE' + i)) {
      var args = this.getInput('VALUE' + i);
      //var inputDo = this.getInput('DO' + i);
      valueConnections.push(args.connection.targetConnection);
      //statementConnections.push(inputDo.connection.targetConnection);
      i++;
    }
    this.updateShape_();
    this.reconnectChildBlocks_(valueConnections);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function() {
    // Delete everything.
    
    var i = 1;
    while (this.getInput('VALUE' + i)) {
      this.removeInput('VALUE' + i);
      i++;
    }
    // Rebuild block.
    for (i = 1; i <= this.args_; i++) {
     
      this.appendValueInput('VALUE' + i)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(new Blockly.FieldLabel('replace '))
          .appendField(new Blockly.FieldTextInput('item'),'ARG'+i)
          .appendField(new Blockly.FieldLabel(' by'));
    }
  },
  /**
   * Reconnects child blocks.
   * @param {!Array.<?Blockly.RenderedConnection>} valueConnections List of
   * value connections for 'if' input.
   * @param {!Array.<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for 'do' input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   * @this {Blockly.Block}
   */
  reconnectChildBlocks_: function(valueConnections) {
    for (var i = 1; i <= this.args_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'VALUE' + i);
    }
  }
};

Blockly.Extensions.registerMutator('magik_text_parser_mutator',MAGIK_TXT_PARSER_MUTATOR, null,['magik_text_parser_arg']);


