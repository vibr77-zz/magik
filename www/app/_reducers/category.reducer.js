import { categoryConstants } from '../_constants';

const category=(state = {}, action) =>{
	//console.log('action:',action);
	
	switch (action.type) {

        case categoryConstants.SET_ACTIVE_ITEM:
            return { ...state, active_item: action.item }
    
        //
        // Get Request
        //
        
        case categoryConstants.GET_REQUEST:
            return { ...state,loading: true };

        case categoryConstants.GET_SUCCESS:
            return { ...state, category:action.item, loading:false}

        case categoryConstants.GET_FAILURE:
            return { ...state,error:action.error}

        //
        // New Creation Request
        //
        
        case categoryConstants.CREATE_REQUEST:
        	return { ...state,loading: true };

        case categoryConstants.CREATE_SUCCESS:
        	return { ...state, active_item:action.item, loading:false}

        case categoryConstants.CREATE_FAILURE:
        	return { ...state,error:action.error}

        //
        // New Mutation Request
        //
        
        case categoryConstants.MUTATE_REQUEST:
            return { ...state,loading: true };

        case categoryConstants.MUTATE_SUCCESS:
            return { ...state, category:action.item, loading:false}

        case categoryConstants.MUTATE_FAILURE:
            return { ...state,error:action.error}

        //
        // New Delete Request
        //

        case categoryConstants.DELETE_REQUEST:
            return { ...state,loading: true };

        case categoryConstants.DELETE_SUCCESS:
            return { ...state, active_item:action.item, loading:false}

        case categoryConstants.DELETE_FAILURE:
            return { ...state,error:action.error}
        default:
            return state
    }
}
export default category;
