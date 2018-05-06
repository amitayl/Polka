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
    return axios
    .get(_getProductUrl(productId))
    .then(res => {
      let objDetails =  res.data
      let product = objDetails.product ;
      product.ownerImg = objDetails.owner.img;
      return product;
    })
}

function getOffersByProductId(productId) {
  console.log('in Product service', productId);
  return axios
    .get(BASE_URL + '/product/getOffers/'+ productId)
    .then(res => res.data)
    .catch(err => console.log('Error:', err));
}

function _getProductUrl(productId){
    return `${BASE_URL}/product/${productId}`
}


export default {
  query,
  getProductById,
  add,
  getOffersByProductId
};
