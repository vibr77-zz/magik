import { deviceConstants } from '../_constants';


const device=(state = {}, action) =>{
	
	switch (action.type) {

    //
    // Get All Devices
    //	

		case deviceConstants.GETALL_REQUEST:
			return { ...state,loading: true };
		
		case deviceConstants.GETALL_SUCCESS:
			return { ...state, devices: action.devices, loading:false };
		
		case deviceConstants.GETALL_FAILURE:
			return { ...state,error: action.error };
		
		
		case deviceConstants.GETPLUGIN_REQUEST:
			return { ...state,loading: true };
		
		case deviceConstants.GETPLUGIN_SUCCESS:
			return { ...state, plugins: action.plugins, loading:false };
		
		case deviceConstants.GETPLUGIN_FAILURE:
			return { ...state, error: action.error };


		case deviceConstants.SET_ACTIVE_ITEM:
        return { ...state, activeItem:action.item }
		//
		// Not Handled return the state
		//


		default:
          return state
	}
}

export default device;