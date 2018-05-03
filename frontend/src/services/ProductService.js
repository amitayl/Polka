import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function query(queryObj) {
  return axios
    .get(BASE_URL + '/product', {
      params: {
        queryObj
      }
    })
    .then(res => res.data);
}

export default {
  query
};
