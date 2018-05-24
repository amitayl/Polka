import axios from 'axios';
let BASE_URL = 'http://127.0.0.1:3000';

if (process.env.NODE_ENV !== 'development') {
  BASE_URL = '';
}

function query(queryObj = {}, colsToGet = {}, userCoords, sortBy = {}, limit = 0) {
  const params = { queryObj, colsToGet, sortBy, limit }
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
    const owner = res.data.owner;
    
    let avgReviewRating = null;
    if (owner.reviews.length > 0) {
      const sumReviewRating = owner.reviews.reduce((accumulator, review) => {
        return accumulator += review.rating;
      }, 0)
      avgReviewRating = sumReviewRating / owner.reviews.length
    }

    product.owner = {
      img: owner.img,
      _id: owner._id,
      nickName: owner.nickName,
      desc: owner.desc,
      loc: owner.loc,
      desiredCategories: owner.desiredCategories,
      avgReviewRating
    }

    return product;
  });
}

function incrementViews(productId) {
  return axios.post(BASE_URL + '/product-views-increment', {productId})
}

function getOffersByProductId(productId) {
  return axios
    .get(BASE_URL + '/product/getOffers/' + productId)
    .then(res => {
      ('res.data', res.data);
      return res.data;
    })
    .catch(err => ('Error:', err));
}

function _getProductUrl(productId) {
  return `${BASE_URL}/product/${productId}`;
}

function getProductsByIds(...productIds) {
  return axios.get(`${BASE_URL}/product/${productIds}`).then(res => res.data);
}

function updateProductDetails(product) {
  return axios.put(BASE_URL + '/product', {product});
}

export default {
  query,
  getProductById,
  add,
  incrementViews,
  getOffersByProductId,
  getProductsByIds,
  updateProductDetails,
};
