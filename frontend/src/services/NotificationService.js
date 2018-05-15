import axios from 'axios';
let BASE_URL = 'http://127.0.0.1:3000';

if(process.env.NODE_ENV !== 'development') {
  BASE_URL = '';
}

function query(loggedInUserId) {
  return axios.get(`${BASE_URL}/notification`, { params: { loggedInUserId } })
    .then(res => res.data);
}

export default {
  query
};
