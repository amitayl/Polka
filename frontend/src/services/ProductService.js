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

function getProductById(productId) {
    return axios
    .get(_getProductUrl(productId))
    .then(res => res.data)
}

function _getProductUrl(productId){
    return `${BASE_URL}/product/${productId}`
}


export default {
  query,
  getProductById
};
