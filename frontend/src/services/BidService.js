import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function sendBid(bidData) {
  return axios.post(`${BASE_URL}/bid`, bidData);
}

function declineBid(bid) {
  return axios.delete(`${BASE_URL}/bid`, { params: { bid } });
}

function isExists(ownerProductId, bidderProductId) {
  return axios.get(`${BASE_URL}/bid`, {
    params: { ownerProductId, bidderProductId }
  }).then(res => res.data);
}

export default {
  sendBid,
  declineBid,
  isExists
};
