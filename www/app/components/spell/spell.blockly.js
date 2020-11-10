import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BlocklyComponent, { Block, Value, Field, Shadow,Category,Mutation } from './Blockly';
import BlocklyJS from 'blockly/javascript';
import clone from 'clone'
import '../../css/index.css';

import { spellActions } from '../../_actions';
import { snackbarActions } from '../../_actions';

import './blocks/index';
import './generator/index';
import reverseParser from './parser/index';

import * as Blockly from 'blockly/core';

import MySprite from "../../images/media/sprites.png"; 

const check = require('check-types');

const mapStateToProps = function(state) {
  return {
    spell: state.spell.active_item,
    command: state.spell.command,
    spells:  state.spell.spells,
    devices: state.device.devices,
  }
}

const mapDispatchToProps = dispatch => ({
  createSpell: (displayName) => dispatch(spellActions.createSpell(displayName)),
  executeSpell: (_id) => dispatch(spellActions.executeSpell(_id)),
  saveSpell: (spell) => dispatch(spellActions.mutateSpell(spell)),
  setActiveSpell:(spell)=>dispatch(spellActions.setActiveItem(spell)),
  setEventSpell:(event)=>dispatch(spellActions.setSpellEvent(event)),
  snack:(notification)=>dispatch(snackbarActions.enqueueSnackbarAction(notification))
});

class SpellBlockly extends React.Component {

	constructor(props){
	  super(props);
	  this.firstUI=false;
	  if (Blockly.Extensions.ALL_['dynamicSpellDropDownExtension']==undefined) // Avoid to load the Extension Twice
	  	this.registerExtension();
	}

	mongoObjectId=()=> {
	  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
	  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
	      return (Math.random() * 16 | 0).toString(16);
	  }).toLowerCase();
	}

	generateCode = (bAlert) => {
	  delete BlocklyJS.definitions_;

	  // Let first identify all non connected block to be deleted from the workspace.
	  let wk=this.simpleWorkspace.workspace;
	  let blks=wk.getAllBlocks()
	  for (let bl of blks){
  		if ((bl.outputConnection==null || bl.outputConnection.isConnected()==false) && 
	  		(bl.previousConnection==null || bl.previousConnection.isConnected()==false) && 
	  		bl.type!='magik_start'){
	  		console.log('Found block alone -> delete type:'+bl.type+" id:"+bl.id);
	  		bl.dispose(false);
	  	}
	  }
	  
	  var code='';
	  try{
	  	code = '['+BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace)+']';
	  	JSON.parse(code);
	  	if (bAlert===true)
	  		alert(code);
		}catch(e){
			console.log(code);
			this.props.snack({
        message: 'Save error:'+e.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
          autoHideDuration: 3000,
        }
			});
		}
	  console.log(code);
	  return code;
	}

	registerExtension=()=>{

		var spells=this.props.spells;
		Blockly.Extensions.register('dynamicSpellDropDownExtension',function() {
	  this.getInput('SPELL').appendField(new Blockly.FieldDropdown(
	      
	      function() {
	        var options = [];
	        options.push(['','null']);
	        for (let sp of spells){
	        	options.push([sp.props.displayName,sp._id]);
	        }
	        return options;
	      }), 'SPELL');
		});

		var plugins=this.props.devices;
		console.log(plugins);
		var that=this;
		
		Blockly.Extensions.register('dynamicDeviceDropDownExtension',function() {
	  this.getInput('DEVICE').appendField(new Blockly.FieldDropdown(
	          
	      function() {
	        var options = [];
	        options.push(['','null']);
	        if (check.array(plugins)){
	        	for (let plg of plugins){
	        		let devices=plg.devices
		        	for (let dv of devices){
		        		options.push([dv.props.displayName,dv._id]);
		        	}
		      	}
		      }
	        return options;
	      }), 'DEVICE');

	      this.getField('DEVICE').setValidator(this.validDevice);
	      this.props={}
	      this.props.devices=plugins;
		});
	}

	initBlockly=async (spellContent)=>{
	  this.newId=this.mongoObjectId();
	  
	  let wk=this.simpleWorkspace.workspace;
	 
	  wk.clear();
	  wk.render();
	  
	  let bl=null;
	  let prevObj;
	  bl=wk.newBlock('magik_start');
	  
	  bl.initSvg();
	  bl.render();

	  bl.moveBy(wk.getMetrics().viewLeft , wk.getMetrics().viewTop );
	  
	  for (let obj of spellContent){
	    try{
	      bl=await reverseParser(wk, obj,bl.nextConnection);
	    }catch(e){
	      console.log(obj);
	      console.log(prevObj);
	      console.log(e);
	    }
	    prevObj=obj;
	  }
	  //wk.scroll(0,0);
	}

	clearBlockly=()=>{
	  let wk=this.simpleWorkspace.workspace;
	  wk.clear();
	}

	createSpell=()=>{
	  this.props.createSpell('this is a new test');
	}

	executeSpell=()=>{
	  this.props.executeSpell(this.props.spell._id);
	}

	saveSpell=()=>{
	  //console.log('saveSpell');
	  try{
	  	this.props.spell.spellEntries=JSON.parse(this.generateCode());
	 		this.props.saveSpell(this.props.spell);
	 		this.props.setEventSpell({hasChanged:false});
		}catch(e){
			this.props.snack({
        message: 'Save error:'+e.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          autoHideDuration: 3000,
        }
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.command !== nextProps.command){
		
			if(nextProps.command.command=="generateCode"){
				this.generateCode(true);
			}

			if(nextProps.command.command=="rebuild"){
				this.initBlockly(this.props.spell.spellEntries);
			}

			if(nextProps.command.command=="clearWorkspace"){
				this.clearBlockly();
			}

			if(nextProps.command.command=="generateSpellCodeSave"){
				this.saveSpell();
			}

			return false;
		}else{
			return true;
		}
	}

	componentDidUpdate=()=>{
	  this.firstUI=false;
	   if (this.props.spell){
	    this.initBlockly(this.props.spell.spellEntries);
	  }
	}

	componentDidMount=()=>{
		
		if (this.props.spell){
	    this.initBlockly(this.props.spell.spellEntries);
	  }

	  let wk=this.simpleWorkspace.workspace;
	  wk.addChangeListener(function(event){
	  	if (event.type=='ui'){
	  		this.firstUI=true;
	  	}

	  	else if((event.type=="move" ||event.type=="change") && this.firstUI==true /*&& this.props.spell && this.props.spell.hasChanged!=true*/){
	  		this.props.setEventSpell({hasChanged:true});

	  	}
	  }.bind(this))

	 	window.addEventListener('resize', this.resizeWk.bind(this), false);
  	this.resizeWk();
  	Blockly.svgResize(wk);

	}

	resizeWk(){

		let wk=this.simpleWorkspace.workspace;
		var blocklyArea = document.getElementById('blocklyArea');
		var blocklyDiv = document.getElementById('blocklyDiv');
		var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight -1 + 'px';
    
    Blockly.svgResize(wk);
	}

	componentWillUnmount=()=>{
		//Blockly.Extensions.unregister('dynamicSpellDropDownExtension')

	}

	render() {
	  const classes = this.props.classes;
	  if (this.props.spell==null){
	  	return (" ")
	  }
	  var color_red     ="#BB243F";


	  return(
			<BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} sounds={false} trashcan={true} media={'/assets/'}
	      move={{ scrollbars: true, drag: false, wheel: false }} zoom={{ controls: true, startScale: 0.95, maxScale: 4, minScale: 0.25, scaleSpeed: 1.1}} 
	      initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml">
	      </xml>`}>
	      	<Category name="Time" colour="#E8C62B">

	      	<Block type="magik_timetrigger"></Block>
	      	<Block type="magik_timecron">
	      		<Value name="DOW">
			        <shadow type="text">
			          <Field name="TEXT">*</Field>
			        </shadow>
			      </Value>
			      <Value name="MONTH">
			        <shadow type="text">
			          <Field name="TEXT">*</Field>
			        </shadow>
			      </Value>
			      <Value name="DOM">
			        <shadow type="text">
			          <Field name="TEXT">*</Field>
			        </shadow>
			      </Value>
			       <Value name="HOUR">
			        <shadow type="text">
			          <Field name="TEXT">*</Field>
			        </shadow>
			      </Value>
			        <Value name="MINUTE">
			        <shadow type="text">
			          <Field name="TEXT">*</Field>
			        </shadow>
			      </Value>
	      	</Block>
	        	<Block type="magik_time"></Block>
	        	<Block type="magik_timenow"></Block>
	        	<Block type="magik_timeastro"></Block>
	        	<Block type="magik_timeoffset"></Block>
	        	<Block type="magik_timebetween"></Block>
	        	<Block type="magik_timecomp"></Block>
	        	<Block type="magik_timewait"></Block>
	        	<Block type="magik_timedelay"></Block>
	        	<Block type="magik_timetostring"></Block>
	      	</Category>
	      		<Category name="Home Assistant" colour="#BA2EF2">
	      		<Block type="magik_alexa_scene"></Block>
	      	</Category>
	      	<Category name="Sms" colour="#BA2EF2">
	      		<Block type="magik_sms_send">
      				<Field name="LOG">TRUE</Field>
    				</Block>
    				<Block type="magik_sms_trigger"></Block>
	        	<Block type="magik_sms_props"></Block>
	      	</Category>
	      	<Category name="Spell" colour="#BA2EF2">
	      	 	<Block type="magik_spell_execute">
			      	<Field name="SPELL">select spell</Field>
			      	<Field name="LOG">TRUE</Field>
			    	</Block>
			    	<Block type="magik_spell_get">
			      	<Field name="SPELL">select Spell</Field>
			    	</Block>
			    	<Block type="magik_spell_set">
			      	<Field name="SPELL">select Spell</Field>
			    	</Block>
	      	</Category>
	    
	    <Category name="Device" colour="#2B41B1">
	    	<Block type="magik_device_trigger"></Block>
	    	
	    	<Block type="magik_device_getsrv"></Block>
	    	<Block type="magik_device_getdevice"></Block>

	      <Block type="magik_device_getProps"></Block>
     		<Block type="magik_device_setProps"></Block>
     		<Block type="magik_device_setcx"></Block>
     		<Block type="magik_device_getcx"></Block>
     		<Block type="magik_device_getcxprops"></Block>
     	</Category>

	    <Category name="Condition" colour="#BB243F">
    		<Block type="controls_if" colour="#BB243F"><Mutation else="1"></Mutation></Block>
    		<Block type="logic_compare"><Field name="OP">EQ</Field></Block>
     		<Block type="logic_operation"><Field name="OP">AND</Field></Block>
    		<Block type="logic_boolean"><Field name="BOOL">TRUE</Field></Block>
    		<Block type="logic_null"></Block>
    		<Block type="logic_negate"></Block>
  		</Category>
  		<Category name="List" colour="#5b67a5">
  			<Block type="lists_create_empty"></Block>
  			<Block type="magik_foreach"></Block>
  			<Block type="lists_create_with"></Block>
  			<Block type="lists_getIndex"></Block>
  			<Block type="lists_setIndex"></Block>
  			<Block type="magik_list_remove"></Block>
  			<Block type="lists_isEmpty"></Block>
  			<Block type="lists_length"></Block>
  			<Block type="magik_flow"></Block>	
  		</Category>
  <Category name="Number" colour="#5b67a5">
    <Block type="magik_random"></Block>
    <Block type="math_number">
      <Field name="NUM">0</Field>
    </Block>
    <Block type="math_arithmetic">
      <Field name="OP">ADD</Field>
      <Value name="A">
        <shadow type="math_number">
          <Field name="NUM">1</Field>
        </shadow>
      </Value>
      <Value name="B">
        <shadow type="math_number">
          <Field name="NUM">1</Field>
        </shadow>
      </Value>
    </Block>
    <Block type="math_single">
      <Field name="OP">ROOT</Field>
      <Value name="NUM">
        <shadow type="math_number">
          <Field name="NUM">9</Field>
        </shadow>
      </Value>
    </Block>
    <Block type="math_number_property">
      <Mutation divisor_input="false"></Mutation>
      <Field name="PROPERTY">EVEN</Field>
      <Value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <Field name="NUM">0</Field>
        </shadow>
      </Value>
    </Block>
    <Block type="math_round">
      <Field name="OP">ROUND</Field>
      <Value name="NUM">
        <shadow type="math_number">
          <Field name="NUM">3.1</Field>
        </shadow>
      </Value>
    </Block>
    <Block type="math_modulo">
      <Value name="DIVIDEND">
        <shadow type="math_number">
          <Field name="NUM">64</Field>
        </shadow>
      </Value>
      <Value name="DIVISOR">
        <shadow type="math_number">
          <Field name="NUM">10</Field>
        </shadow>
      </Value>
    </Block>
    <Block type="math_constrain">
      <Value name="VALUE">
        <shadow type="math_number">
          <Field name="NUM">50</Field>
        </shadow>
      </Value>
      <Value name="LOW">
        <shadow type="math_number">
          <Field name="NUM">1</Field>
        </shadow>
      </Value>
      <Value name="HIGH">
        <shadow type="math_number">
          <Field name="NUM">100</Field>
        </shadow>
      </Value>
    </Block>
  </Category>

  //
  // Loop Category
  // 
  <Category name="Loop" colour="#5ba55b">
    <Block type="controls_repeat_ext">
      <Value name="TIMES">
        <shadow type="math_number">
          <Field name="NUM">10</Field>
        </shadow>
      </Value>
    </Block>
    <Block type="controls_whileUntil">
      <Field name="MODE">WHILE</Field>
    </Block>
    <Block type="magik_flow"></Block>
  </Category>
  
  //
  // Text Category
  // 

  <Category name="Text" colour="#5b80a5">
   <Block type="magik_text_parser"> </Block>
   <Block type="magik_text_reverse_parser"> </Block>
    <Block type="text">
      <Field name="TEXT"></Field>
    </Block>
    <Block type="text_join">
      <Mutation items="2"></Mutation>
    </Block>
    <Block type="text_indexOf">
    </Block>
    <Block type="text_multiline">
    </Block>

    <Block type="text_isEmpty">
    </Block>
    <Block type="text_changeCase">
      <Field name="CASE">UPPERCASE</Field>
      <Value name="TEXT">
        <shadow type="text">
          <Field name="TEXT">abc</Field>
        </shadow>
      </Value>
    </Block>
  </Category>

  //
  // Object Category
  // 

  <Category name="Object" colour="#5b80a5">
    <Block type="magik_start"></Block>
    <Block type="magik_comment"></Block>
    
    <Block type="magik_logger">
      <Field name="SEVERITY">INFO</Field>
    </Block>
    
    <Block type="magik_email_send">
      <Field name="LOG">TRUE</Field>
    </Block>
    
    
  </Category>
  <Category name="Variables" colour="#a5745b">
    <Block type="magik_variable_set">
      <Field name="VARNAME" id="ICdA">item</Field>
    </Block>
    
    <Block type="magik_variable_get">
      <Field name="VARNAME" id="ICdA8R=n">item</Field>
    </Block>
  </Category>
	    </BlocklyComponent>
	  )
 	} 
}

export default compose(connect(mapStateToProps,mapDispatchToProps))(SpellBlockly);

