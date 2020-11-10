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

// Material UI Icon 
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import { spellActions } from '../../_actions';
import { snackbarActions } from '../../_actions';
import { deviceActions } from '../../_actions';

const mapStateToProps = function(state) {
  return {
    spell: state.spell.active_item,
    spellEvent: state.spell.event,
    command: state.spell.command,
    isSpellLoading:state.spell.loading,
    selectedTreeViewItem:state.spell.selectedTreeViewItem,
    devices:state.device.devices,
  }
}

const mapDispatchToProps = dispatch => ({
  createSpell: (sp) => dispatch(spellActions.createSpell(sp)),
  executeSpell: (_id) => dispatch(spellActions.executeSpell(_id)),
  deleteSpell: (_id) => dispatch(spellActions.deleteSpell(_id)),
  saveSpell: (spell) => dispatch(spellActions.mutateSpell(spell)),
  getSpells: (spells) => dispatch(spellActions.getAll()),
  getSpell: (_id) => dispatch(spellActions.getSpell(_id)),
  setActiveSpell:(spell)=>dispatch(spellActions.setActiveItem(spell)),
  commandSpell:(command)=>dispatch(spellActions.commandSpell(command)),
  setEventSpell:(event)=>dispatch(spellActions.setSpellEvent(event)),
  snack:(notification)=>dispatch(snackbarActions.enqueueSnackbarAction(notification)),
  getDevices: () => dispatch(deviceActions.getAll()),
});

const useStyles = theme =>({
  root: {
    flexGrow: 1,
    opacity:1,
    height:"100%",
    
  },
});



class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.props.getSpells();
    this.props.getDevices();
    this.nextActionHook=null;
   }

   render() {
    const classes = this.props.classes;
  }
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(Login);