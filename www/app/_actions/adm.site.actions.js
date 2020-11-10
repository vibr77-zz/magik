import { admSiteConstants } from '../_constants';
import { admSiteService } from '../_services';


export const adminSiteActions = {
    setActiveSiteItem,
    getFloors,
};


function setActiveSiteItem(payload) {
	return dispatch => {
		dispatch({
			type: admSiteConstants.SET_ACTIVE_ITEM,
			payload: payload 
		});
	}
}

function getSiteItem(){

}

function getFloors() {
    return dispatch => {
        
        dispatch(request());

        admSiteService.getFloors()
            .then(res =>{
                console.log(res);
                return dispatch(success(res.data.Floors));
            })
            .catch(function(error) {
                
        
                dispatch(failure(error.toString()))
                return error;
            });
        
    };

    function request() { 			return { type: admSiteConstants.GET_FLOORS_REQUEST } }
    function success(floors) {return { type: admSiteConstants.GET_FLOORS_SUCCESS, floors } }
    function failure(err) { 	return { type: admSiteConstants.GET_FLOORS_FAILURE, error } }
}