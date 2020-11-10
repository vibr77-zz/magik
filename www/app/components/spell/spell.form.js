import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from "@material-ui/core/styles";

import { Formik, Form, Field } from 'formik';

import Box from '@material-ui/core/Box';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

import { TextField,Checkbox } from 'formik-material-ui';

import { Button, LinearProgress } from '@material-ui/core';

import { spellActions } from '../../_actions';

import Moment from 'moment';

const useStyles = theme =>({
  root: {
    display: 'flex',
    fontSize:'small',
    height:"100%",
  },
  inputLabel:{
    paddingTop:theme.spacing(1)
  },
  input: {
    height: 30,
    width:"400px",
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  multiline:{
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    width:"400px"
  },
  button:{
    width:"150px",
    marginTop: theme.spacing(1),
  },
  Box:{
    width:"90%",
  },
  formControl: {
    margin: theme.spacing(1),
  },
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const CustomInputComponent = (props) => (
  <input className="my-custom-input" type="text" {...props} />
);

const mapStateToProps = function(state) {
  return {
    spell: state.spell.active_item,
    spellEvent: state.spell.event,
  }
}

const mapDispatchToProps = dispatch => ({
  createSpell: (displayName) => dispatch(spellActions.createSpell({props:{displayName:displayName}})),
  executeSpell: (_id) => dispatch(spellActions.executeSpell(_id)),
  saveSpell: (spell) => dispatch(spellActions.mutateSpell(spell)),
  setEventSpell:(event)=>dispatch(spellActions.setSpellEvent(event)),
});

class SpellForm extends React.Component {

  constructor(props){
    super(props);
   
    this.state = {
      anchorEl: null
    };
  }
  handleChange = (event) => {
   
    if (this.props.spellEvent.hasChanged==false)
      this.props.setEventSpell({hasChanged:true});
  };
  
  render() {
    var initialValues;
    const classes = this.props.classes;
    const {checked}=this.state

    let creationDate='';
    let modificationDate='';
    
    if (this.props.spell){
      initialValues={
        displayName:this.props.spell.props.displayName,
        creationDate:Moment(this.props.spell.props.creationDate).format("DD/MM/YY HH:MM"), 
        modificationDate:Moment(this.props.spell.props.modificationDate).format("DD/MM/YY HH:MM"),
        
        _id:this.props.spell._id,
        isHidden:this.props.spell.props.isHidden,
        parallelProcess:this.props.spell.props.parallelProcess,
        checkPass:this.props.spell.checkPass,
        status:this.props.spell.props.status,
        description:this.props.spell.props.description,
        storeExecLog:this.props.spell.props.storeExecLog
      }

      creationDate=Moment(this.props.spell.props.creationDate).format("DD/MM/YY HH:MM"); 
      modificationDate=Moment(this.props.spell.props.modificationDate).format("DD/MM/YY HH:MM"); 

    }else{
      initialValues={
        displayName:'',
        _id:'',
        isHidden:false,
        parallelProcess:false,
        checkPass:false,
        descriptiion:null,
        storeExecLog:false,
        status:false
      }
    }

    if (this.props.spell=={}){
      return ("")
    }

    return(
      <Formik enableReinitialize={true} initialValues={initialValues}
        
        onSubmit={(values, {setSubmitting}) => {
      
      this.props.spell.props.displayName=values.displayName;
      this.props.spell.props.parallelProcess=values.parallelProcess;
      this.props.spell.props.status=values.status;
      this.props.spell.props.description=values.description;
      this.props.spell.props.isHidden=values.isHidden;
      this.props.spell.props.storeExecLog=values.storeExecLog;

      this.props.saveSpell(this.props.spell); // Dipatch the saveSpell Action

      // setTimeout(() => {
      //   setSubmitting(false);
      //   alert(JSON.stringify(values, null, 2));
      // }, 500);
    }}>
    {({submitForm, isSubmitting, values, setFieldValue}) => (
      <Form>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <Field component={TextField} name="displayName" type="text" label="displayName"  onKeyUp={this.handleChange} variant="outlined" InputLabelProps={{
              shrink: true, className:classes.inputLabel}} InputProps={{ className: classes.input }} />
         
            <Field component={TextField}  label="_id" name="_id" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>
        
            <Field component={TextField} name="description" label="Description" multiline rows={4} 
              InputProps={{ className: classes.multiline }} 
              InputLabelProps={{ shrink: true , className:classes.inputLabel}} onKeyUp={this.handleChange} variant="outlined"/>

            <Button variant="contained" color="primary" disabled={isSubmitting} className={classes.button} onClick={submitForm}>Submit</Button>
          </FormGroup>
        </FormControl> 
        <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
           <Field component={TextField}  label="Creation" name="creationDate" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

              <Field component={TextField}  label="Modification" name="modificationDate" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

             <FormControlLabel  control={
                <Field   component={Checkbox} name="status" type="checkbox"  color="default"  inputProps={{ onClick:this.handleChange, 'aria-label': 'uncontrolled-checkbox'}}/>
             } label="status"/>
             <FormControlLabel control={
                <Field component={Checkbox} name="isHidden" type="checkbox" color="default" inputProps={{ onClick:this.handleChange,'aria-label': 'uncontrolled-checkbox'}}/>
             } label="isHidden"/>
        
            <FormControlLabel control={
              <Field component={Checkbox} name="storeExecLog" type="checkbox" color="default" inputProps={{ onClick:this.handleChange,'aria-label': 'uncontrolled-checkbox'}}/>
               } label="storeExecLog" />

            <FormControlLabel control={
              <Field component={Checkbox} name="parallelProcess" type="checkbox" color="default" inputProps={{ onClick:this.handleChange,'aria-label': 'uncontrolled-checkbox'
              }}/>
               } label="parallelProcess"/>
        
             <FormControlLabel control={
              <Field component={Checkbox} name="checkPass" type="checkbox" disabled={true} color="default" inputProps={{ 'aria-label': 'uncontrolled-checkbox'
              }} /> } label="checkPass"/>
           </FormGroup>
        </FormControl> 
          
        </Form>
 
    )}
  </Formik>
   )   
   }
 }
SpellForm.defaultProps = {
  spell: null
}

export default compose(withStyles(useStyles),connect(mapStateToProps,mapDispatchToProps))(SpellForm);