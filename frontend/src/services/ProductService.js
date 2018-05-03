import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

// const criteria = {hey: 'hey'};
// let products = query(criteria);
// console.log(products);


function query(queryObj) {
  return axios
    .get(BASE_URL + '/product', {
      params: {
        queryObj
      }
    })
    .then(res => res.data);
}

function getProductById(productId) {
    console.log ('productId');
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
