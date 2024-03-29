import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PropTypes from 'prop-types';

import { withSnackbar } from 'notistack';

import { snackbarActions } from '../_actions';

class SnackBar extends Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications, onCloseSnackbar, onRemoveSnackbar }) {
    if (!notifications.length) {
      this.displayed = [];
      return false;
    }

    const { notifications: currentSnacks } = this.props;
    let notExists = false;

    for (let i = 0; i < notifications.length; i += 1) {
      const newSnack = notifications[i];

      if (newSnack.dismissed) {
        onCloseSnackbar(newSnack.key);
        onRemoveSnackbar(newSnack.key);
      }

      if (!notExists) {
        notExists =
          notExists ||
          !currentSnacks.filter(({ key }) => newSnack.key === key).length;
      }
    }

    return notExists;
  }

  componentDidUpdate({ onRemoveSnackbar }) {
    const { notifications = [] } = this.props;

    notifications.forEach(({ key, message, options = {} }) => {
      if (this.displayed.includes(key)) return;

      this.props.enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, id) => {
          if (options.onClose) {
            options.onClose(event, reason, id);
          }
          onRemoveSnackbar(id);
        },
      });

      this.storeDisplayed(key);
    });
  }

  render() {
    console.log("Should reload");
    return null;
  }
}

SnackBar.propTypes = {
  notifications: PropTypes.array,
  enqueueSnackbar: PropTypes.func,
  onRemoveSnackbar: PropTypes.func,
  onCloseSnackbar: PropTypes.func,
};

const mapStateToProps = function(state) {
  return {
    notifications: state.snackbar.notifications
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onRemoveSnackbar: key => dispatch(snackbarActions.removeSnackbarAction(key)),
    onCloseSnackbar: key => dispatch(snackbarActions.closeSnackbarAction(key)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSnackbar,
  withConnect,
)(SnackBar);