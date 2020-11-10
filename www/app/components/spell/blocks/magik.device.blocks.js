import * as Blockly from 'blockly/core';
import check  from 'check-types';


var color_device  ="#2B41B1";

var magik_device_getProps={
  "type": "magik_device_getProps",
  "message0": "device %1 %2",
  "args0": [
    {
      "type": "input_dummy",
      "name": "DEVICE",
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
          "status",
          "status"
        ],
        [
          "location",
          "location"
        ],
        [
          "_id",
          "_id"
        ],
        [
          "pluginName",
          "pluginName"
        ]
      ]
    }
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_device_getProps'] = {
  init: function() {
    this.jsonInit(magik_device_getProps);
    this.getField('PROPS').setValidator(this.updateConnections)
    this.setColour(color_device);
  },
  updateConnections: function(newValue) {
    let bl=this.getSourceBlock();
    switch (newValue){

      case 'location':
        bl.setOutput(true,'String');
        break;
      case 'description':
        bl.setOutput(true,'String');
        break;
      case 'displayName':
        bl.setOutput(true,'String');
        break;

      case 'status':
        bl.setOutput(true,'Boolean');
        break;
      
      case '_id':
        bl.setOutput(true,'String');
        break;

      case 'pluginName':
        bl.setOutput(true,'String');
        break;

      default:
        break;
    }
  }
};

var magik_device_setProps={
  "type": "magik_device_set",
  "message0": "%1 set %2 to %3",
  "args0": [
    {
      "type": "input_dummy",
      "name": "DEVICE",
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
          "status",
          "status"
        ],
        [
          "location",
          "location"
        ]
      ]
    },

    {
      "type": "input_value",
      "name": "VAL"
    }
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_device_setProps'] = {
  init: function() {
    this.jsonInit(magik_device_setProps);
    this.getField('PROPS').setValidator(this.updateConnections)
    this.setColour(color_device);
  },
  updateConnections: function(newValue) {
    let bl=this.getSourceBlock();
    switch (newValue){

      case 'location':
        bl.getInput('VAL').setCheck('String');
        break;
      case 'description':
        bl.getInput('VAL').setCheck('String');
        break;
      case 'displayName':
        bl.getInput('VAL').setCheck('String');
        break;

      case 'status':
        bl.getInput('VAL').setCheck('Boolean');
        break;
      
      default:
        break;
    }
  }
};

var magik_device_setcx={
  "type": "magik_device_setcx",
  "message0": "set value for %1 %2 %3 %4 %5 ",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy",
      "name": "DEVICE"
    },
    {
      "type": "input_dummy",
      "name":"SERVICE"
    },
    
    {
      "type": "input_dummy",
      "name": "CX"
    },
   
    {
      "type": "input_dummy"
    },
    
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
  

Blockly.Blocks['magik_device_setcx'] = {
  init: function() {
    this.jsonInit(magik_device_setcx);
    this.setColour(color_device);
  },

  validDevice:function(newValue){
    let bl=this.getSourceBlock()

    if (newValue=='null'){
      if(bl.getField("CX")){
        bl.getInput("CX").removeField("CX");
      }
      if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
      }
      bl.removeInput('VALUE',true);
      return;
    } 
    for (let plg of bl.props.devices){
      let devices=plg.devices
      for (let dv of devices){
        if (dv._id===newValue){
          let opt=[];
          opt.push(['','null']);
          bl.props.dv=dv;
          console.log(dv.services);
          for (let srv of dv.services){
            if (srv._id!=null && srv._id!=undefined)
              opt.push([srv.props.displayName,srv._id])
            //else
             // opt.push([srv.props.displayName,srv.props.displayName])
          }

          if(bl.getField("SERVICE")){
            bl.getInput("SERVICE").removeField("SERVICE");
          }

          if(bl.getField("CX")){
            bl.getInput("CX").removeField("CX");
          }
          if (check.nonEmptyArray(opt)){
            bl.getInput("SERVICE").appendField(new Blockly.FieldDropdown(opt),'SERVICE');
            bl.getField("SERVICE").setValidator(bl.validService);
          }
          break;
        }
      }
    }
  },
  
  validService:function(newValue){
    let bl=this.getSourceBlock() 
    if (newValue=='null'){
      if(bl.getField("CX")){
        bl.getInput("CX").removeField("CX");
        bl.removeInput('VALUE',true);
        return;
      }
    }
    let opt=[];
    opt.push(['','null']);
    for (let srv of bl.props.dv.services){
      if (srv._id==newValue){
        bl.props.srv=srv;
        console.log(srv.characteristics);
        for (let cx of srv.characteristics){
          if (cx && cx.props  && cx.props.perms && cx.props.perms.indexOf('pw')!=-1)
           opt.push([cx.props.displayName,cx._id]);
        }
      break;
      }
    }

    if(bl.getField("CX")){
      bl.getInput("CX").removeField("CX");
    }

    if (check.nonEmptyArray(opt)){
      bl.getInput("CX").appendField(new Blockly.FieldDropdown(opt),'CX');
      bl.getField("CX").setValidator(bl.validCx);
    }
   
  },
  //TODO MANAGE THE ARRAY
  //Checck if ClassName is the right value

  validCx:function(newValue){
    let bl=this.getSourceBlock()
    if (newValue=='null'){
      bl.removeInput('VALUE',true);
      return;
    }

    bl.removeInput('VALUE',true);
    bl.appendValueInput('VALUE');
    for (let cx of bl.props.srv.characteristics){
      if (newValue==cx._id){
        bl.props.cx; 
        if (cx.props && cx.props.format=="bool"){
          bl.getInput('VALUE').setCheck("Boolean");
        }
        else if (cx.props && (cx.props.format=="int" 
                            || cx.props.format=="float" 
                            || cx.props.format=="uint8" 
                            || cx.props.format=="int16"
                            || cx.props.format=="uint32" 
                            || cx.props.format=="int64")){

        
         bl.getInput('VALUE').setCheck("Number");
      }else if(cx.props && (cx.props.format=="string" || cx.props.format=='data')){
        bl.getInput('VALUE').setCheck("String");
      }
      break;
      } 
    }
  }
};

var magik_device_getcx={
  "type": "magik_device_getcx",
  "message0": "Cx %1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy",
      "name": "DEVICE"
    },
    {
      "type": "input_dummy",
      "name":"SERVICE"
    },
    
    {
      "type": "input_dummy",
      "name": "CX"
    },
   
    {
      "type": "input_dummy"
    },
    
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "inputsInline": true,
  "output": "CX",
  "colour": 230,
  "tooltip": "Just in case",
  "helpUrl": "http:\/\/magik.com"
}

Blockly.Blocks['magik_device_getcx'] = {
  init: function() {
    this.jsonInit(magik_device_getcx);
    this.setColour(color_device);
  },
  validDevice:function(newValue){
    let bl=this.getSourceBlock()

    if (newValue=='null'){
      if(bl.getField("CX")){
        bl.getInput("CX").removeField("CX");
      }
      if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
      }
      return;
    } 

    for (let dv of bl.props.devices){
      if (dv._id===newValue){
        let opt=[];
        opt.push(['','null']);
        bl.props.dv=dv;
        for (let srv of dv.services){
          if (srv._id!=null)
            opt.push([srv.props.displayName,srv._id])
        }

        if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
        }

        if(bl.getField("CX")){
          bl.getInput("CX").removeField("CX");
        }
        if (check.nonEmptyArray(opt)){
          bl.getInput("SERVICE").appendField(new Blockly.FieldDropdown(opt),'SERVICE');
          bl.getField("SERVICE").setValidator(bl.validService);
        }
        break;
      }
    }
  },
  
  validService:function(newValue){
    let bl=this.getSourceBlock() 
    if (newValue=='null'){
      if(bl.getField("CX")){
        bl.getInput("CX").removeField("CX");
        return;
      }
    }
    let opt=[];
    opt.push(['','null']);
    for (let srv of bl.props.dv.services){
      if (srv._id==newValue){
        bl.props.srv=srv;
        for (let cx of srv.characteristics){
           opt.push([cx.props.displayName,cx._id]);
        }
      break;
      }
    }

    if(bl.getField("CX")){
      bl.getInput("CX").removeField("CX");
    }

    if (check.nonEmptyArray(opt)){
      bl.getInput("CX").appendField(new Blockly.FieldDropdown(opt),'CX');
      bl.getField("CX").setValidator(bl.validCx);
    }
   
  },
  //TODO MANAGE THE ARRAY
  //Checck if ClassName is the right value

  validCx:function(newValue){
    let bl=this.getSourceBlock()
    if (newValue=='null'){
      bl.removeInput('VALUE',true);
      return;
    }
   
    for (let cx of bl.props.srv.characteristics){
      if (newValue==cx._id){
        bl.props.cx; 
        if (cx.props && cx.props.format=="bool"){
          bl.setOutput(true,'Boolean');
        }
        else if (cx.props && (cx.props.format=="int" 
                            || cx.props.format=="float" 
                            || cx.props.format=="uint8" 
                            || cx.props.format=="int16"
                            || cx.props.format=="uint32" 
                            || cx.props.format=="int64")){

        
          bl.setOutput(true,'Number');
      }else if(cx.props && (cx.props.format=="string" || cx.props.format=='data')){
         bl.setOutput(true,'String');
      }
      break;
      } 
    }
  }
};

var magik_device_getcxprops={
  "type": "magik_device_getcxprops",
  "message0": "get cx props for %1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy",
      "name": "DEVICE"
    },
    {
      "type": "input_dummy",
      "name":"SERVICE"
    },
    
    {
      "type": "input_dummy",
      "name": "CX"
    },
    {
      "type": "input_dummy",
      "name": "PROPS"
    },
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "Just in case",
  "helpUrl": "http:\/\/magik.com"
}

Blockly.Blocks['magik_device_getcxprops'] = {
  init: function() {
    this.jsonInit(magik_device_getcxprops);
    this.setColour(color_device);
  },
  validDevice:function(newValue){
    let bl=this.getSourceBlock()

    if (newValue=='null'){
      if(bl.getField("CX")){
        bl.getInput("CX").removeField("CX");
      }
      if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
      }

      if(bl.getField("PROPS")){
          bl.getInput("PROPS").removeField("PROPS");
      }

      return;
    } 
    for (let dv of bl.props.devices){
      if (dv._id===newValue){
        let opt=[];
        opt.push(['','null']);
        bl.props.dv=dv;
        for (let srv of dv.services){
          if (srv._id!=null)
            opt.push([srv.props.displayName,srv._id])
        }

        if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
        }

        if(bl.getField("CX")){
          bl.getInput("CX").removeField("CX");
        }
        if (check.nonEmptyArray(opt)){
          bl.getInput("SERVICE").appendField(new Blockly.FieldDropdown(opt),'SERVICE');
          bl.getField("SERVICE").setValidator(bl.validService);
        }
        break;
      }
    }
  },
  
  validService:function(newValue){
    let bl=this.getSourceBlock() 
    if (newValue=='null'){
      if(bl.getField("CX")){
        bl.getInput("CX").removeField("CX");
      }
      if(bl.getField("PROPS")){
        bl.getInput("PROPS").removeField("PROPS");
      }
      return;
    }
    let opt=[];
    opt.push(['','null']);
    for (let srv of bl.props.dv.services){
      if (srv._id==newValue){
        bl.props.srv=srv;
        for (let cx of srv.characteristics){
          if (cx && cx.props && cx.props.perms && cx.props.perms.indexOf('pw')!=-1)
            opt.push([cx.props.displayName,cx._id]);
        }
      break;
      }
    }

    if(bl.getField("CX")){
      bl.getInput("CX").removeField("CX");
    }

    if (check.nonEmptyArray(opt)){
      bl.getInput("CX").appendField(new Blockly.FieldDropdown(opt),'CX');
      bl.getField("CX").setValidator(bl.validCx);
    }
  },
  //TODO MANAGE THE ARRAY
  //Checck if ClassName is the right value

  validCx:function(newValue){
    
    let bl=this.getSourceBlock()
    if (newValue=='null'){
      if(bl.getField("PROPS")){
        bl.getInput("PROPS").removeField("PROPS");
      }
      return;
    }
    
    let opt=[];
    opt.push(['','null']);

    for (let cx of bl.props.srv.characteristics){
      if (newValue==cx._id){
        bl.props.cx; 
        for (let prp of Object.keys(cx.props)){
           opt.push([prp,prp]);
        }
      break;
      } 
    }

    if (check.nonEmptyArray(opt)){
      bl.getInput("PROPS").appendField(new Blockly.FieldDropdown(opt),'PROPS');
    }
  }
};

var magik_device_trigger={

  "type": "magik_device_trigger",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": "Trigger on "
    },
    {
      "type": "input_value",
      "name": "OBJ"
    },
    {
      "type": "input_dummy",
      "name":"OP"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "previousStatement": "TRIGGER",
  "nextStatement": "TRIGGER",
  "colour": color_device,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['magik_device_trigger'] = {
  init: function() {
    this.jsonInit(magik_device_trigger);
    //this.removeInput('VALUE',true);

    let opt_cx=[["any change","ANY"],["=","EQ"],["!=","NEQ"],["<=","LTE"],[">=","GTE"],[">","GT"],["<","LT"]]
  	let inp=this.getInput("OP");
  	inp.appendField(new Blockly.FieldDropdown(opt_cx),'OPERATOR');

    this.objblid='';
    this.pvid='';
  },
  onchange: function(event) {
   
    let conn;
    if (conn=this.previousConnection){
      
      let pvBlock=conn.targetBlock();
      if (pvBlock){
      	this.pvid=pvBlock.id;

        let contains=false;
        if( pvBlock.nextConnection.getCheck()==null)
          contains=false;
        else
          contains=pvBlock.nextConnection.getCheck().includes("TRIGGER");

        if (contains!=true){
          conn.disconnect();
          this.setWarningText("A Trigger block can only be connected to a start block or another Trigger block");
        }else{
          this.setWarningText();
        }
      }
    }

    let objConn=this.getInput("OBJ").connection;
    let tgBlock=objConn.targetBlock();

    if ((tgBlock!=null && this.objblid!=tgBlock.id )|| (tgBlock==null && (this.objlid!='' && this.objlid!=undefined))){

    	let opt_cx=[["any change","ANY"],["=","EQ"],["!=","NEQ"],["<=","LTE"],[">=","GTE"],[">","GT"],["<","LT"]]
  		let opt=[["any change","ANY"]];
    	
    	this.objblid=tgBlock ? tgBlock.id:'';

      let inp=this.getInput("OP");
      
      if (this.getField("OPERATOR"))
      	inp.removeField("OPERATOR");
      
      if (tgBlock && tgBlock.type=="magik_device_getcx"){
      	inp.appendField(new Blockly.FieldDropdown(opt_cx),'OPERATOR');
      	this.getField("OPERATOR").setValidator(this.validate); // keep that in that order
      	this.setFieldValue(this.opvalue,"OPERATOR");
      }
      else{
      	inp.appendField(new Blockly.FieldDropdown(opt),'OPERATOR');
      	this.getField("OPERATOR").setValidator(this.validate);
      	this.removeInput('VALUE',true);
      }
    }

    if(Blockly.Events.CHANGE === event.type) {
            // do something
    }
  },
  validate: function(newValue) {
    let bl=this.getSourceBlock();

    if (newValue=='ANY'){
    	bl.removeInput('VALUE',true);
    }
  }
};

var magik_device_getsrv={
  "type": "magik_device_getsrv",
  "message0": "Service %1 %2 %3 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy",
      "name": "DEVICE"
    },
    {
      "type": "input_dummy",
      "name":"SERVICE"
    },
    
    {
      "type": "input_dummy"
    },
    
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "inputsInline": true,
  "output": "SRV",
  "colour": 230,
  "tooltip": "Just in case",
  "helpUrl": "http:\/\/magik.com"
}

Blockly.Blocks['magik_device_getsrv'] = {
  init: function() {
    this.jsonInit(magik_device_getsrv);
    this.setColour(color_device);
  },
  validDevice:function(newValue){
    let bl=this.getSourceBlock()

    if (newValue=='null'){
      
      if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
      }
      return;
    } 

    for (let dv of bl.props.devices){
      if (dv._id===newValue){
        let opt=[];
        opt.push(['','null']);
        bl.props.dv=dv;
        for (let srv of dv.services){
          if (srv._id!=null)
            opt.push([srv.props.displayName,srv._id])
        }

        if(bl.getField("SERVICE")){
          bl.getInput("SERVICE").removeField("SERVICE");
        }

        if (check.nonEmptyArray(opt)){
          bl.getInput("SERVICE").appendField(new Blockly.FieldDropdown(opt),'SERVICE');
        }
        break;
      }
    }
  },
};

var magik_device_getdevice={
  "type": "magik_device_getdevice",
  "message0": "Device %1 %2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy",
      "name": "DEVICE"
    },
    

    {
      "type": "input_dummy"
    },
    
  ],
  "extensions": ["dynamicDeviceDropDownExtension"],
  "inputsInline": true,
  "output": "DEVICE",
  "colour": 230,
  "tooltip": "Just in case",
  "helpUrl": "http:\/\/magik.com"
}

Blockly.Blocks['magik_device_getdevice'] = {
  init: function() {
    this.jsonInit(magik_device_getdevice);
    this.setColour(color_device);
  }
};



