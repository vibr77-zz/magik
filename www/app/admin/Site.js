import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TwocolLayout from '../components/twocolLayout';
import SiteTreeView from '../components/SiteTreeView';
import SiteContent from '../components/SiteContent';

import { adminSiteActions } from '../_actions';
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


const Site = () => {

  const dispatch = useDispatch();

  const [item_id,setItem_id] =useState("ZBB");

  function leftCallback(){
    console.log("The Moon is now under control");

    //useEffect(() => {
    dispatch(adminSiteActions.setActiveSiteItem({ID:"ZIBOU",title:"WAHOO TO EASY"}));
    //}, []);
    //setItem_id("ZBE");
  }
  
  function rightGet(){

  }

  return(
    <div>
      <TwocolLayout _left={<SiteTreeView _callback={leftCallback} />} _right={<SiteContent _val={item_id}/>}/>
    </div>
  )
}

export default Site;