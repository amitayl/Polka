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
  return axios
    .post(BASE_URL + '/product', product)
    .then(res => res.data)
    .catch(err => console.error('Error:', err));
}

function getProductById(productId) {
  return axios.get(BASE_URL + '/productDetails/' + productId).then(res => {
    return res.data.product;
  });
}

// function getBothById(productId) {
//   return axios
//   .get(BASE_URL + '/product/productDetails/'+ productId)
//   .then(res => {
//     let objDetails =  res.data
//     let product = objDetails.product ;
//     product.ownerImg = objDetails.owner.img;
//     product.ownerId = objDetails.owner._id
//     console.log ('objDetails.owner' , objDetails.owner);
//     return product;
//   })
// }

function getOffersByProductId(productId) {
  return axios
    .get(BASE_URL + '/product/getOffers/' + productId)
    .then(res => res.data)
    .catch(err => console.log('Error:', err));
}

function _getProductUrl(productId) {
  return `${BASE_URL}/product/${productId}`;
}

function getProductsByIds(...productIds) {
  return axios.get(`${BASE_URL}/product/${productIds}`).then(res => res.data);
}

export default {
  query,
  getProductById,
  add,
  getOffersByProductId,
  getProductsByIds
};
