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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Switch from '@material-ui/core/Switch';

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

const mapStateToProps = function(state,ownProps) {
  console.log(ownProps);
  return {
    spell: state.spell.active_item,
    spellEvent: state.spell.event,
    //service:ownProps
  }
}

const mapDispatchToProps = dispatch => ({

});

class  DeviceCxTable extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      anchorEl: null
    };

  }
  handleChange = (event) => {
   
    //if (this.props.spellEvent.hasChanged==false)
    //  this.props.setEventSpell({hasChanged:true});
  };
  
  render(){
    var initialValues;
    const classes = this.props.classes;
    const {checked}=this.state

    let creationDate='';
    let modificationDate='';
    //let cx=this.props.cx;
    //console.log(cx.props.perms);

    let srv=this.props.service;
    console.log(this.props.service);
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">displayName</TableCell>
            <TableCell align="left">className</TableCell>
            <TableCell align="left">Format</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Max</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {srv.characteristics.map((cx) => (
            <TableRow key={cx._id}>
              <TableCell align="left">{cx.props.displayName}</TableCell>
              <TableCell align="left">{cx.props.className}</TableCell>
              <TableCell align="left">{cx.props.format}</TableCell>
              <TableCell align="right">{cx.props.minValue}</TableCell>
              <TableCell align="right">{cx.props.maxValue}</TableCell>
              <TableCell align="right">{cx.value} <Switch checked={false} onChange={this.handleChange} name="gilad" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }
 }

export default compose(withStyles(useStyles),connect(mapStateToProps,mapDispatchToProps))(DeviceCxTable);

