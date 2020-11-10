import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar,Toolbar,Button} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const NavBar = () => {

  const navbarItems=[
    {icon:'',key:1,title:'Wall',link:'/wall'},
    {icon:'',key:2,title:'Control',link:'/'},
    {icon:'',key:3,title:'Heating',link:'/heating'},
    {icon:'',key:4,title:'Automation',link:'/spell'},
    {icon:'',key:5,title:'Admin',link:'/admin/site'},
  ]

const useStyles = makeStyles(theme => ({
  
    navBar:{
      backgroundColor: "#444444",
    },
    button:{
      color:"#eeeeee",
    }

  }
));

const classes = useStyles();

  return(

      <AppBar position="static" className={classes.navBar}>
            <Toolbar variant="dense" >
        {navbarItems.map(item=>
        <Button  key={item.key} startIcon={<AccessAlarm />} color="default" className={classes.button} component={Link} to={item.link}>
          {item.title}
        </Button>
        )}
      </Toolbar>
      </AppBar>
  )
}

export default NavBar;    