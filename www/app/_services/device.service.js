const axios=require('axios');

import config from '../config';

export const deviceService = {
    getAll,
    getPlugins,
};

function  getAll() {
	console.log(config.wsUri)
	console.log(config);
  return axios.get(config.wsUri+'device').then(
    response=>{
      return response.data;
  })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  })
}

function  getPlugins() {

  return axios.get(config.wsUri+'devicePlugin').then(
    response=>{
      return response.data;
  })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  })
}

