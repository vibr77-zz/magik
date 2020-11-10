import { categoryConstants } from '../_constants';
import { snackbarConstants } from '../_constants';
import { categoryService } from '../_services';

export const categoryActions = {
    getCategory,
    setActiveItem,
    createCategory,
    mutateCategory,
    deleteCategory
};

function setActiveItem(item){
    return dispatch => {
        return dispatch ({ type: categoryConstants.SET_ACTIVE_ITEM, item:item })
    }
}

function getCategory(name) {
    return dispatch => {
        
        dispatch(request());

        categoryService.getCategory(name)
            .then(res =>{
                return dispatch(success(res));
            })
            .catch(function(error) {
                dispatch({type:snackbarConstants.ENQUEUE_SNACK,notification:{
                    message: 'getCategory error:'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }   
                }  
            });

                dispatch(failure(error.toString()))
                return error;
            });
        
    };

    function request() { return { type: categoryConstants.GET_REQUEST } }
    function success(item) { return { type: categoryConstants.GET_SUCCESS, item } }
    function failure(error) { return { type: categoryConstants.GET_FAILURE, error } }
}

function createCategory(displayName){

    return dispatch=>{
        dispatch({type:categoryConstants.CREATE_REQUEST});

        spellService.createCategory(displayName)
            .then(response=>{
                return dispatch({type:categoryConstants.CREATE_SUCCESS,item:response});
            })
            .catch(error=>{
                dispatch({type:categoryConstants.CREATE_FAILURE,error})
                return error;
            })

   }
}

function mutateCategory(spellObj){

    return dispatch=>{
        dispatch({type:categoryConstants.MUTATE_REQUEST});

        categoryService.mutateCategory(spellObj)
            .then(response=>{
                return dispatch({type:categoryConstants.MUTATE_SUCCESS,item:spellObj});
            })
            .catch(error=>{
                
                dispatch({type:snackbarConstants.ENQUEUE_SNACK,notification:{
                    message: 'getCategory error:'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }   
                }});
                dispatch({type:categoryConstants.MUTATE_FAILURE,error})
                return error;
            })

   }
}

function deleteCategory(_id){

    return dispatch=>{
        dispatch({type:categoryConstants.DELETE_REQUEST});

        categoryService.deleteCategory(_id)
            .then(response=>{
                return dispatch({type:categoryConstants.DELETE_SUCCESS,item:null});
            })
            .catch(error=>{
                dispatch({type:categoryConstants.DELETE_FAILURE,error})
                return error;
            })

   }
}