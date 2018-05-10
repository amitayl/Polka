import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function query(loggedInUserId) {
  return axios.get(`${BASE_URL}/notification`, { params: { loggedInUserId } })
    .then(res => res.data);
}

export default {
  query
};
