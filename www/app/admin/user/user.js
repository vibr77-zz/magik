
import { withStyles } from "@material-ui/core/styles";

// Material UI Core & component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';



// React - Redux
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';


const mapStateToProps = function(state) {
  return {
    spell: state.spell.active_item,
    
  }
}

const mapDispatchToProps = dispatch => ({
  createSpell: (sp) => dispatch(spellActions.createSpell(sp)),
});

class User extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      
    };
  }

  render(){
    const classes = this.props.classes;
    return(
      <Grid className={classes.root} container spacing={1}>
       
        <Grid item xs={2}>
          <Paper className={classes.root} spacing={1}>
            <SpellTreeView/>
          </Paper>
        </Grid>

        <Grid className={classes.root} item xs={10} zIndex={100}>
          <AppBar className={classes.navBar} position="static" color="default">
            <Toolbar variant="dense" className={classes.title}>
              <IconButton aria-controls="spellMenu" aria-haspopup="true"  edge={false} onClick={this.handleMenuItemClick} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    );
  }
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(User);