import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';


import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

const SiteContent = (props) => {

 const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
    form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



 	const classes = useStyles();
  const active_item = useSelector(state => state.admSite.active_item)

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
	
  return(
		<div>
{/* 			TOOL BAR */}
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"></IconButton>
					<Typography variant="h6" className={classes.title}>Site Item</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
{/* 			FORM CONTENT */}
			<Container maxWidth="sm" style={{ height: '90vh', margin: 0, padding: 0 }}>
				{active_item ? 
			  <div>
{/* 			  ITEM ID */}
					<form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>ID:
              <TextField
                name="item_id"
                variant="outlined"
                required
                fullWidth
                id="item_id"
                label={active_item.id}
                autoFocus
                disabled={true}
              />
            </Grid>
            <Grid item xs={6} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
 
  					<TextField id="outlined-basic" label="Outlined" variant="outlined" />
					</form>
{/* 			  	<FormControl className={clsx(classes.margin, classes.textField)} variant="filled"> */}
{/*           	<FilledInput */}
{/*             	id="item-id" */}
{/*             	value={active_item.id} */}
{/*             	onChange={handleChange('weight')} */}
{/*              */}
{/*             	aria-describedby="filled-weight-helper-text" */}
{/*             	inputProps={{ */}
{/*               	'aria-label': 'Item ID', */}
{/*             	}} */}
{/*           	/> */}
{/*           	<FormHelperText id="filled-weight-helper-text">Item ID</FormHelperText> */}
{/*         	</FormControl> */}
{/*         	ITEM TITLE  */}
{/*         	<FormControl className={clsx(classes.margin, classes.textField)} variant="filled"> */}
{/*           <FilledInput */}
{/*             id="item-id" */}
{/*             value={active_item.id} */}
{/*             onChange={handleChange('weight')} */}
{/*              */}
{/*             aria-describedby="filled-weight-helper-text" */}
{/*             inputProps={{ */}
{/*               'aria-label': 'Item Title', */}
{/*             }} */}
{/*           /> */}
{/*           <FormHelperText id="filled-weight-helper-text">Item Title</FormHelperText> */}
{/*         </FormControl> */}
        </div>

			:<h1>Loading Content</h1>}
			</Container>
		</div>
  )
}

export default SiteContent;