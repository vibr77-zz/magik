import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const check = require('check-types');
import clone from 'clone'
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
import { categoryActions } from '../../_actions';

import Moment from 'moment';


const useStyles = theme =>({
  root: {
    display: 'flex',
    fontSize:'small'
  },
  inputLabel:{
    paddingTop:"10px"
  },
  input: {
    height: 30,
    width:"400px",
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  button:{
    width:"150px",
    marginTop: theme.spacing(1),
  },
  multiline:{
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    width:"400px"
  },
  Box:{
    width:"90%",
  },
  formControl: {
    margin: theme.spacing(1),
  },
});


const mapStateToProps = function(state) {
  return {
    category: state.category.category,
    selectedTreeViewItem:state.spell.selectedTreeViewItem,
  }
}

const mapDispatchToProps = dispatch => ({
  saveCategory: (category) => dispatch(categoryActions.mutateCategory(category))
});

class CategoryForm extends React.Component {

  constructor(props){
    super(props);
   
    this.state = {
      anchorEl: null,
      editFolderId:this.props._id
    };
  }

  handleChange = (event) => {
    this.setState({ ...state, [event.target.name]: event.target.checked });
  };
  //handleChange = (event) => {
  //  this.setState({ ...state, [event.target.name]: event.target.checked });
  //};

  handleSubmit(){

  }
  //const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  _findCategoryObject(objTree,_id){
    let ret=null;

    let entries=check.object(objTree) ? objTree.data:objTree;
    
    if (check.nonEmptyArray(entries)){
      for (const entry of entries) {
        if (_id==entry._id){

          return entry;
        }
        if (check.nonEmptyArray(entry.subItem)){
          ret=this._findCategoryObject(entry.subItem,_id);
          if (ret!=null)
            return ret;
        }
      }
    }
    return ret;
  }

  render() {

    const classes = this.props.classes;
    var initialValues;
    

    if (this.props.selectedTreeViewItem){
      this.catClone=clone(this.props.category);
      this.folder=this._findCategoryObject(this.catClone,this.props.selectedTreeViewItem._id);

      initialValues={
        _id:this.folder._id,
        displayName:this.folder.displayName,
        description:this.folder.description,
      }
    }else{
      initialValues={
        displayName:'',
        _id:'',
        descriptiion:'',
      }
    }

    if (this.props.spell=={}){
      return (" ")
    }

    return(
      <Formik enableReinitialize={true} initialValues={initialValues}
    
    onSubmit={(values, {setSubmitting}) => {
      
      this.folder.displayName=values.displayName;
      this.folder.description=values.description;
      this.props.saveCategory(this.catClone);

    // setTimeout(() => {
    //   setSubmitting(false);
    //   alert(JSON.stringify(values, null, 2));
    // }, 500);
    }}

    >{({submitForm, isSubmitting, values, setFieldValue}) => (
      <Form>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
     
            <Field component={TextField} name="displayName" type="text" label="displayName"  variant="outlined" InputLabelProps={{
              shrink: true }} InputProps={{
              className: classes.input }} />
         
            <Field component={TextField}  label="_id" name="_id" disabled={true} variant="outlined" 
              InputLabelProps={{ shrink: true, className:classes.inputLabel}} 
              InputProps={{ className: classes.input }}/>
         
            <Field component={TextField} name="description" label="Description" multiline rows={4} 
            InputProps={{ className: classes.multiline }} 
            InputLabelProps={{ shrink: true, className:classes.inputLabel }} 
            variant="outlined"/>
          
            <Button variant="contained" color="primary" disabled={isSubmitting} className={classes.button} onClick={submitForm}>Submit</Button>
          
           </FormGroup>
          </FormControl> 
        </Form>
 
    )}
  </Formik>
   )   
   }
 }
CategoryForm.defaultProps = {
  spell: null
}

export default compose(withStyles(useStyles),connect(mapStateToProps,mapDispatchToProps))(CategoryForm);