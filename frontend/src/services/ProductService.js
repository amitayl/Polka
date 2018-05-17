import axios from 'axios';
let BASE_URL = 'http://127.0.0.1:3000';

if (process.env.NODE_ENV !== 'development') {
  BASE_URL = '';
}

function query(queryObj, colsToGet, userCoords) {
  const params = { queryObj, colsToGet }
  if (userCoords) params.userCoords = userCoords;

  return axios
    .get(BASE_URL + '/product', {params})
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
    let product = res.data.product;
    product.ownerImg = res.data.owner.img;
    product.ownerNickName = res.data.owner.nickName;
    product.ownerId = res.data.owner._id;

    return product;
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
  console.log ('mama');
  return axios
    .get(BASE_URL + '/product/getOffers/' + productId)
    .then(res => {
      console.log('res.data', res.data);
      return res.data;
    })
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
