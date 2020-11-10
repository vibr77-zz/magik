const axios=require('axios');

export const categoryService = {
    getCategory,
    createCategory,
    mutateCategory,
    deleteCategory,
};

function getCategory(name) {
  return axios.get('http:\/\/localvm:8080/api/category/'+name).then(
    response=>{
      return response.data;
  })
  .catch(error=>{
    
    throw error; // Let's Bubble up to the action component
  }); 
}

function createCategory(category) {
  return axios.post('http:\/\/localvm:8080/api/category/',category).then(
    response=>{
      return response.data;
  }) 
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  });
}

function mutateCategory(category) {
  return axios.put('http:\/\/localvm:8080/api/category/'+category.name,category).then(
    response=>{
      return response.data;
  })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  });
}

function deleteCategory(name) {
  return axios.put('http:\/\/localvm:8080/api/category/'+name).then(
    response=>{
      return response.data;
  })
  .catch(error=>{
    throw error; // Let's Bubble up to the action component
  });
}