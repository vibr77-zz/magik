import { spellConstants } from '../_constants';
import { snackbarConstants } from '../_constants';
import { spellService } from '../_services';

export const spellActions = {
    getAll,
    getSpell,
    setActiveItem,
    createSpell,
    mutateSpell,
    deleteSpell,
    executeSpell,
    commandSpell,
    setTreeViewSelectedItem,
    setSpellEvent
};

function setSpellEvent(event){
    return dispatch => {
        return dispatch ({ type: spellConstants.SET_SPELL_EVENT, item:event})
    }
}

function setTreeViewSelectedItem(item){
    return dispatch => {
        return dispatch ({ type: spellConstants.SET_TREEVIEW_SELECTED_ITEM, item})
    }
}

function commandSpell(command){
    return dispatch => {
        return dispatch ({ type: spellConstants.COMMAND_REQUEST, command: {
                    ...command,
            key:new Date().getTime() + Math.random()}
        })
    }
}

function setActiveItem(item){
    return dispatch => {
        return dispatch ({ type: spellConstants.SET_ACTIVE_ITEM, item:item })
    }
}

function getAll() {
    return dispatch => {
        
        dispatch(request());

        spellService.getAll()
            .then(res =>{
                return dispatch(success(res));
            })
            .catch(function(error) {
                dispatch(failure(error.toString()))
                return error;
            });
        
    };

    function request() { return { type: spellConstants.GETALL_REQUEST } }
    function success(spells) { return { type: spellConstants.GETALL_SUCCESS, spells } }
    function failure(error) { return { type: spellConstants.GETALL_FAILURE, error } }
}

function getSpell(_id){
    return dispatch=>{
        dispatch({type:spellConstants.GETSPELL_REQUEST});

        spellService.getSpell(_id)
            .then(response=>{

                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'getSpell success',
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'success',
                      autoHideDuration: 2000,
                    }
                }});

                return dispatch({type:spellConstants.GETSPELL_SUCCESS,item:response});
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

                dispatch({type:spellConstants.GETSPELL_FAILURE,error})
                return error;
            })

   }
}

function executeSpell(_id){
    return dispatch=>{
        dispatch({type:spellConstants.EXECUTE_REQUEST});

        spellService.executeSpell(_id)
            .then(response=>{

                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'Execute spell success',
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'success',
                      autoHideDuration: 2000,
                    }
                }});

                return dispatch({type:spellConstants.EXECUTE_SUCCESS,item:response});
            }) 
            .catch(error=>{

                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'Execute spell error'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }
                }});

                dispatch({type:spellConstants.EXECUTE_FAILURE,error})
                return error;
            })

   }
}
function createSpell(sp){

    return dispatch=>{
        dispatch({type:spellConstants.CREATE_REQUEST});

        spellService.createSpell(sp)
            .then(response=>{
                return dispatch({type:spellConstants.CREATE_SUCCESS,item:response});
            })
            .then( ()=>{
                return dispatch(getAll());
            })
            .catch(error=>{

                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'Execute spell error'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }
                }});
                
                dispatch({type:spellConstants.CREATE_FAILURE,error})
                return error;
            })

   }
}

function mutateSpell(spellObj,nextDispatch){

    return dispatch=>{
        dispatch({type:spellConstants.MUTATE_REQUEST});

        spellService.mutateSpell(spellObj)
            .then(response=>{
              
                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'Mutate spell success',
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'success',
                      autoHideDuration: 2000,
                    }
                }});

                return dispatch({type:spellConstants.MUTATE_SUCCESS,item:response,nextDispatch:nextDispatch});

            })
            .then( ()=>{
                if (typeof nextDispatch=="function")
                    nextDispatch();
                return dispatch(getAll());
            })
            .catch(error=>{

                dispatch({type:snackbarConstants.ENQUEUE_SNACK,notification:{
                    message: 'Mutate Spell error:'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }}});

                dispatch({type:spellConstants.MUTATE_FAILURE,error})
                return error;
            })

   }
}

function deleteSpell(_id){

    return dispatch=>{
        dispatch({type:spellConstants.DELETE_REQUEST});

        spellService.deleteSpell(_id)
            .then(response=>{
                return dispatch({type:spellConstants.DELETE_SUCCESS,item:null});
            })
            .then( ()=>{
                return dispatch(getAll());
            })
            .catch(error=>{
                
                dispatch({type:snackbarConstants.REQUEST_SNACK,notification:{
                    message: 'Execute spell error'+error,
                    options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                      autoHideDuration: 3000,
                    }
                }});

                dispatch({type:spellConstants.DELETE_FAILURE,error})
                return error;
            })

   }
}