
const api = 'http:\/\/localvm:8081/graphql'

const graphql_request = ({ variables, query }) => {
  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(response => response.json())
    .then(result => {
      console.log('got here!', result)
      return result;
    })
    .catch(function(error) {
      console.log('error goes here');
      throw new Error(error.message);
      return error;
    });
}
export default graphql_request;
