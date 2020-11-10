const axios=require('axios');

import config from '../config';

export const loginService = {
  login,
  logout
};


function login(userId){
  return axios.get(config.wsUri+'login/'+userId).then(
    response=>{
      return response.data;
    })
  .catch(error=>{
    throw error // Let's Bubble up to the action component
  })
}

function logout(userId){
  return axios.get(config.wsUri+'logout/'+userId).then(
    response=>{
      return response.data;
    })
  .catch(error=>{
    throw error // Let's Bubble up to the action component
  })
}

