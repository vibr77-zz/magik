import { admSiteConstants } from '../_constants';


const admSite = (state = {}, action) => {
	//console.log(action);
    switch(action.type){
     	case admSiteConstants.SET_ACTIVE_ITEM:
        return {
        	...state,
          active_item: action.payload,
        }
      case admSiteConstants.GET_FLOORS_REQUEST:
				return {
					getFloorsLoading: true
				};
			case admSiteConstants.GET_FLOORS_SUCCESS:
				console.log(action);
				return {
					...state,
					floors: action.floors,
					getFloorsLoading:false
				};
			case admSiteConstants.GET_FLOORS_FAILURE:
				return {
					error: action.error
				};
        
    	default:
      	return state
    }
}

export default admSite;