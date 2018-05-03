import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function query(queryObj, colsToGet) {
  return axios
    .get(BASE_URL + '/product', {
      params: {
        queryObj,
        colsToGet
      }
    })
    .then(res => res.data);
}

function add(product) {
  console.log('in Product service',product);
  return axios
      .post(BASE_URL + '/product', product)
      .then(res => res.data)
      .catch(err => console.log('Error:', err));
}

export default {
  query,
  add
};
