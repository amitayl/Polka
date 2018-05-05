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

function add(userData) {
  return axios.post(BASE_URL + '/user', userData).then(res => res.data);
}

function checkLogin(loginData) {
  console.log(loginData);
  return axios
    .get(BASE_URL + '/user', { 
      params: { loginData } 
    })
    .then(res => res.data);
}

// TODO: move this function to product service
function add(product) {
  console.log('in Product service', product);
  return axios
    .post(BASE_URL + '/product', product)
    .then(res => res.data)
    .catch(err => console.log('Error:', err));
}

function getById(productId) {
  console.log('productId');
  return axios.get(_getProductUrl(productId)).then(res => {
    let objDetails = res.data;
    let product = objDetails.product;
    product.ownerImg = objDetails.owner.img;
    return product;
  });
}

function _getProductUrl(productId) {
  return `${BASE_URL}/product/${productId}`;
}

export default {
  query,
  add,
  checkLogin
};
