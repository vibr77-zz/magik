import { userConstants } from '../_constants';
import { snackbarConstants } from '../_constants';
import { userService } from '../_services';

export const spellActions = {
    getAll,
    getUser,

    createUser,
    mutateUser,
    deleteUser,

};


function getAll() {
    return dispatch => {
        
        dispatch(request());

        userService.getAll()
            .then(res =>{
                return dispatch(success(res));
            })
            .catch(function(error) {
                dispatch(failure(error.toString()))
                return error;
            });
        
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(spells) { return { type: userConstants.GETALL_SUCCESS, spells } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getUser() {

}

function createUser() {

}

function mutateUser() {

}

function deleteUser() {

}