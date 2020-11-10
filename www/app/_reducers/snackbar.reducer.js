import { snackbarConstants } from '../_constants';

export const initialState = {
  notifications: [],
};

const snackbar=(state = initialState, action) =>{
	
	switch (action.type) {
		
		case snackbarConstants.REQUEST_SNACK:
			let key = (action.notification && action.notification.options && action.notification.options.key)
			
			key=key || new Date().getTime() + Math.random()
			return {...state,notifications:[ ...state.notifications,{ key: key, ...action.notification}]};
		break;
		case snackbarConstants.ENQUEUE_SNACK:
			console.log(action.notification);
			return {...state,notifications:[ ...state.notifications,{ key: action.notification.key, ...action.notification}]};
		break;

		case snackbarConstants.CLOSE_SNACK:
			return {...state,notifications: state.notifications.map(notification =>
        action.dismissAll || notification.key === action.key
          ? { ...state.notification, dismissed: true } : { ...state.notification }
        )}
		break;

		case snackbarConstants.REMOVE_SNACK:
			return {...state,notifications:  state.notifications.filter(notification => notification.key !== action.key)};
		break;

		default:
      return state
	}
}

export default snackbar;