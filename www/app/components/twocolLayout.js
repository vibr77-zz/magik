import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Twocollayout = (props) => {
 
 const {_left,_right}=props;
  const {_left2, set_left2} = useState(_left);
  console.log(_left);

  const dispatch = useDispatch();

  console.log("here C");

  return(
    <div>
     <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper >{_left}</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper >{_right}</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Twocollayout;