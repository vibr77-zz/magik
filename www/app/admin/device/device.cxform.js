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

});

class  DeviceCxForm extends React.Component {

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
    let cx=this.props.cx;
    if (this.props.cx){
      initialValues={
        _id:cx.UUID,
        displayName:cx.props.displayName,
        className:cx.props.className,
        format:cx.props.format,
        minValue: cx.props.minValue,
        maxValue: cx.props.maxValue,
        minStep: cx.props.minStep,
        storeLastValues: cx.props.storeLastValues,
        maxStoredLastValues: cx.props.maxStoredLastValues,
        storeAllValues: cx.props.storeAllValues,
        label: cx.props.label,
        subLabel: cx.props.subLabel,
        value:cx.value
      }
    }

    console.log(cx.props.perms);


    return(
      <Formik enableReinitialize={true} initialValues={initialValues}
        
        onSubmit={(values, {setSubmitting}) => {
      
      // this.props.spell.props.displayName=values.displayName;
      // this.props.spell.props.parallelProcess=values.parallelProcess;
      // this.props.spell.props.status=values.status;
      // this.props.spell.props.description=values.description;
      // this.props.spell.props.isHidden=values.isHidden;
      // this.props.spell.props.storeExecLog=values.storeExecLog;

      // this.props.saveSpell(this.props.spell); // Dipatch the saveSpell Action

      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}>
    {({submitForm, isSubmitting, values, setFieldValue}) => (
      <Paper square elevation={1}>
      <Form>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <Field component={TextField} name="displayName" type="text" label="displayName"  onKeyUp={this.handleChange} variant="outlined" InputLabelProps={{
              shrink: true, className:classes.inputLabel}} InputProps={{ className: classes.input }} />
         
            <Field component={TextField}  label="_id" name="_id" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            <Field component={TextField}  label="className" name="className" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            <Field component={TextField}  label="label" name="label" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            <Field component={TextField}  label="format" name="format" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            
        
          
            <Button variant="contained" color="primary" disabled={isSubmitting} className={classes.button} onClick={submitForm}>Submit</Button>
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <Field component={TextField}  label="unit" name="unit" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

          
            <Field component={TextField}  label="minValue" name="minValue" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            <Field component={TextField}  label="minStep" name="minStep" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            <Field component={TextField}  label="maxValue" name="maxValue" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>

            <FormControlLabel  control={
                <Field   component={Checkbox} name="storeLastValues" type="checkbox"  color="default"  inputProps={{ onClick:this.handleChange, 'aria-label': 'uncontrolled-checkbox'}}/>
            } label="storeLastValues"/>

            <FormControlLabel  control={
                <Field   component={Checkbox} name="storeAllValues" type="checkbox"  color="default"  inputProps={{ onClick:this.handleChange, 'aria-label': 'uncontrolled-checkbox'}}/>
            } label="storeAllValues"/>

          </FormGroup>
        </FormControl>     
      </Form>
      </Paper>
 
    )}
  </Formik>
   )}
 }

export default compose(withStyles(useStyles),connect(mapStateToProps,mapDispatchToProps))(DeviceCxForm);

