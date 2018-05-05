import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function add(userData) {
  return axios
    .post(BASE_URL + '/user', userData)
    .then(res => res.data);
}

export default {
  add
};
