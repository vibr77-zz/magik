// Module : spell.service
// [AIV]{version}[/AIV]

const axios=require('axios');

//import request from '../_helpers/graphql_request'

export const spellService = {
    getAll,
    getSpell,
    getById,
    createSpell,
    mutateSpell,
    deleteSpell,
    executeSpell
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

function executeSpell(_id){
  return axios.get('http:\/\/localvm:8080/api/spell/'+_id+'/execute').then(
    response=>{
      return response.data;
    })
  .catch(error=>{
    throw error // Let's Bubble up to the action component
  })
}

function getSpell(_id){
  return axios.get('http:\/\/localvm:8080/api/spell/'+_id).then(
    response=>{
      return response.data;
    })
  .catch(error=>{
    throw error // Let's Bubble up to the action component
  })
}

function createSpell(sp){
  return axios.post('http:\/\/localvm:8080/api/spell',sp).then(
    response=>{
      return response.data;
    })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  })
}

function mutateSpell(spellObj){
  return axios.put('http:\/\/localvm:8080/api/spell/'+spellObj._id,spellObj).then(
    response=>{
      return response.data;
    })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  });
}

function deleteSpell(_id){
  return axios.delete('http:\/\/localvm:8080/api/spell/'+_id).then(
    response=>{
      console.log(response)
      return response.data;
    })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  })
}

function getById(id) {

  const SPELL_QUERY = gql`{
    Spell(id:${id}){
        title,
        id
    }  
	}`;
	const [result] = useQuery({ query: SPELL_QUERY });
  const { data, fetching, error } = result
 
  console.log(data);
  console.log(error);
  return result;
}