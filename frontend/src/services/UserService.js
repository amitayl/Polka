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

function getUserById(userId) {
  return axios.get(_getUserUrl(userId)).then(res => {
    let user = res.data;
    console.log ('user' , user);
    return user;
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
  console.log (loginData);
  return axios
    .get(BASE_URL + '/user', {
      params: { loginData }
    })
    .then(res => {
      console.log ('res' , res.data);
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

function _getUserUrl(userId) {
  return `${BASE_URL}/user/${userId}`;
}


export default {
  query,
  getUserById,
  add,
  checkLogin,
  logout,
};
