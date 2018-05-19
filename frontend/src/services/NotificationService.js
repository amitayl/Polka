import axios from 'axios';
let BASE_URL = 'http://127.0.0.1:3000';

if (process.env.NODE_ENV !== 'development') {
  BASE_URL = '';
}

function query(loggedInUserId) {
  return axios
    .get(`${BASE_URL}/notification`, { params: { loggedInUserId } })
    .then(res => res.data);
}

/* function getAcceptedBids(userId) {
  return axios
    .get(`${BASE_URL}/accepted-bid`, { params: { userId } })
    .then(res => res.data);
} */

function remove(notification) {
  return axios.delete(`${BASE_URL}/notification`, { params: { notification } });
}

function setViewed(notificationsToUpdate, loggedInUserId) {
  return axios.put(`${BASE_URL}/notification-viewed`, {notificationsToUpdate, loggedInUserId});
}

export default {
  query,
  // getAcceptedBids,
  remove,
  setViewed
};
