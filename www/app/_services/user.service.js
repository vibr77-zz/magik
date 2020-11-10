const axios=require('axios');

//import request from '../_helpers/graphql_request'

export const userService = {
    getAll,
    getUser,
    createUser,
    mutateUser,
    deleteUser
};

function  getAll() {

  return axios.get('http:\/\/localvm:8080/api/spell').then(
    response=>{
      return response.data;
  })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  })
}

function  getUser() {
}

function  createUser() {
}

function  mutateUser() {
}

function  deleteUser() {
}
