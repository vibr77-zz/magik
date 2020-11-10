import React, { useEffect } from 'react';
import { Router,Link, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SceneList from './SceneList';
import blk from './spell/spell';
import AdminDevice from '../admin/device/device';
import Main from './Main';
import Navbar from './Navbar';
import SceneCount from './SceneCount';
import SnackBar from './snackbar';
//import Site from '../admin/Site';

import { history } from '../_helpers/history';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//<Route path='/admin/site' component={Site}/>
//import i18n from '../_helpers/i18n';

const App = (props) => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    grid:{
      height:'92vh',
    },
    paper: {
      height:'100%',
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      backgroundColor: 'transparent',
    }
  }));

  const classes = useStyles();

  return (
    
  	<Router history={history}>
    <div className={classes.root} >
      <Grid container spacing={3}>
        <Grid item xs={12}>
        	<Navbar/>
        </Grid>
      </Grid>
     
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} className={classes.root} >
          <SnackBar/>
          <Paper className={classes.paper}>
          <Switch>
        		<Route exact path='/' component={Main}/>
        		<Route path='/spell' component={SceneList}/>
        		<Route path='/blk' component={blk}/>
            <Route path='/device' component={AdminDevice}/>
      		</Switch>
      		</Paper>
        </Grid>
      </Grid>

    </div>
    </Router>
  );
}

export default App;