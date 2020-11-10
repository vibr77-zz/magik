import { deviceConstants } from '../_constants';
import { snackbarConstants } from '../_constants';
import { deviceService } from '../_services';

export const deviceActions = {
    getAll,
    getPlugins,
    setActiveItem
};

function getAll() {
    return dispatch => {
        
        dispatch(request());
        deviceService.getAll()
            .then(res =>{
                return dispatch(success(res));
            })
            .catch(function(error) {
                dispatch(failure(error.toString()))
                return error;
            });
        
    };

    function request() { return { type: deviceConstants.GETALL_REQUEST } }
    function success(devices) { return { type: deviceConstants.GETALL_SUCCESS, devices } }
    function failure(error) { return { type: deviceConstants.GETALL_FAILURE, error } }
}

function setActiveItem(item){
    return dispatch => {
        return dispatch ({ type: deviceConstants.SET_ACTIVE_ITEM, item:item })
    }
}

function getPlugins(){
    return dispatch=>{
        dispatch({type:deviceConstants.GETPLUGIN_REQUEST});

        deviceService.getPlugins()
            .then(response=>{

                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'getPlugins success',
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'success',
                      autoHideDuration: 2000,
                    }
                }});

                return dispatch({type:deviceConstants.GETPLUGIN_SUCCESS,plugins:response});
            }) 
            .catch(error=>{

                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'ExecuteSpell error'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }
                }});

                dispatch({type:deviceConstants.GETPLUGIN_FAILURE,error})
                return error;
            })

   }
}
