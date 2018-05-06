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

function getById(productId) {
  return axios.get(_getProductUrl(productId)).then(res => {
    let objDetails = res.data;
    let product = objDetails.product;
    product.ownerImg = objDetails.owner.img;
    return product;
  });
}

function add(userData) {
  return axios
    .post(BASE_URL + '/user', userData)
    .then(res => res.data)
    .catch(err => {
      throw new Error('Register Failed');
    });
}

function checkLogin(loginData) {
  return axios
    .get(BASE_URL + '/user', {
      params: { loginData }
    })
    .then(res => {
      const user = res.data;
      sessionStorage.loggedInUser = JSON.stringify(user);
      return user;
    });
}

function logout() {
  return axios
    .post(`${BASE_URL}/logout`)
    .then(res => {
      delete sessionStorage.loggedInUser;
    })
    .catch(err => {
      throw new Error('Logout Failed');
    });
}

function _getProductUrl(productId) {
  return `${BASE_URL}/product/${productId}`;
}


export default {
  query,
  getById,
  add,
  checkLogin,
  logout,
};
