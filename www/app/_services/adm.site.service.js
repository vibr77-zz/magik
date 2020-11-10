//adm.site.service

import request from '../_helpers/graphql_request'

export const admSiteService = {
    getSite,
    getFloors,
    getFloorById,
    getRooms,
    getRoomById,
};


const SITE_QUERY =`{
  Spells{
        title,
        id
    }  
	}`;

const GET_FLOORS_QUERY = `{
	Floors{
  	title,
    id,
    rooms{
    	title,
      id
    }
  }  
}`;

const GET_ROOMS_QUERY=`{
  Rooms{
        title,
        id
    }  
	}`;

const GET_ROOM_BY_ID_QUERY=`{
  Rooms{
        title,
        id
    }  
	}`;

function getSite() {

	return request({query: SITE_QUERY})
		.then(
    	data=>{
      	return data;
	  	}
	  )
    .catch(function(error) {
      throw new Error(error.message);
      return error;
    }); 
}

function getFloors() {

	return request({query: GET_FLOORS_QUERY})
		.then(
    	data=>{
      	return data;
	  	}
	  )
    .catch(function(error) {
      throw new Error(error.message);
      return error;
    }); 
}

function getFloorById() {

	return request({query: SITE_QUERY})
		.then(
    	data=>{
      	return data;
	  	}
	  )
    .catch(function(error) {
      throw new Error(error.message);
      return error;
    }); 
}

function getRooms() {

	return request({query: SITE_QUERY})
		.then(
    	data=>{
      	return data;
	  	}
	  )
    .catch(function(error) {
      throw new Error(error.message);
      return error;
    }); 
}

function getRoomById() {

	return request({query: SITE_QUERY})
		.then(
    	data=>{
      	return data;
	  	}
	  )
    .catch(function(error) {
      throw new Error(error.message);
      return error;
    }); 
}


