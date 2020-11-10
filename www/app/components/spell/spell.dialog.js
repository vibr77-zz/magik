import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from "@material-ui/core/styles";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

class SpellDialog extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Dialog
        open={this.props.openDialog}
        onClose={this.props.handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogCloseDismiss} variant={"outlined"} color="primary">
            {this.props.dismissLabel}
              </Button>
          <Button onClick={this.props.handleDialogCloseOk} variant={"outlined"} color="primary" autoFocus={true}>
                {this.props.okLabel}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


export default SpellDialog