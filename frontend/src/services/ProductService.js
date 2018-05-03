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

function getProductById(productId) {
    console.log ('productId');
    return axios
    .get(_getProductUrl(productId))
    .then(res => {
      let objDetails =  res.data
      // console.log ('objDetails' , objDetails.product);
      // console.log ('objDetails' , objDetails.owner)
      let product = objDetails.product ;
      console.log ('product' , product);
      product.ownerImg = objDetails.owner.img;
      console.log ('product' , product); 
      return res.data;
    })
}

function _getProductUrl(productId){
    return `${BASE_URL}/product/${productId}`
}


export default {
  query,
  getProductById,
  add
};
