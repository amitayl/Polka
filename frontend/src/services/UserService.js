import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

import StorageService from './StorageService.js';

function query(queryObj, colsToGet) {
  return axios.get(BASE_URL + '/users').then(res => res.data);
}

function getUserById(userId) {
  console.log (zozo);
  return axios.get(_getUserUrl(userId)).then(res => {
    let user = res.data;
    console.log ('user' , user);
    return user;
  });
}

function _getUserUrl(userId) {
  return `${BASE_URL}/user/${userId}`;
}

function add(userData) {
  return axios
    .post(BASE_URL + '/user', userData)
    .then(res => res.data)
    .catch(err => {
      throw new Error('Register Failed');
    });
}

function remove(userId) {
  return axios
    .delete(BASE_URL + '/user',  {params: {userId}})
    .then(res => res.data)
    .catch(err => {
      throw new Error('deletion failed');
    });
}

function checkLogin(loginData) {
  return axios
    .get(BASE_URL + '/user', {
      params: { loginData }
    })
    .then(res => {
      const user = res.data;
      StorageService.session.store('loggedInUser', user);
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

export default {
  query,
  remove,
  getUserById,
  add,
  checkLogin,
  logout,
};
