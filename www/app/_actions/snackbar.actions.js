import { snackbarConstants } from '../_constants';
import clone from 'clone'
export const snackbarActions = {
    enqueueSnackbarAction,
    closeSnackbarAction,
    removeSnackbarAction
};

function enqueueSnackbarAction(notification){
  
  //notification.key=notification.options.key ? notification.options.key : new Date().getTime() + Math.random();
	const key = (notification.options && notification.options.key)
  //let notif=clone(notification);
  if (notification.options && notification.options.key)
    notification.key=notification.options.key;
  
  return dispatch => {
    return dispatch ({ type: snackbarConstants.ENQUEUE_SNACK
    	, notification: {
					...notification,
  			key: key||  new Date().getTime() + Math.random(),
			}});
    }
 }

function closeSnackbarAction(key) {
  return {
    type: snackbarConstants.CLOSE_SNACK,
    dismissAll: !key,
    key,
  };
}

function removeSnackbarAction(key) {
  return dispatch => {
    return dispatch ({ 
	    type: snackbarConstants.REMOVE_SNACK,
	    key,
  	})
	}
}
