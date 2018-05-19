import axios from 'axios';
let BASE_URL = 'http://127.0.0.1:3000';

if (process.env.NODE_ENV !== 'development') {
  BASE_URL = '';
}

function sendBid(bidData) {
  return axios.post(`${BASE_URL}/bid`, bidData).then(res => res.data);
}

function acceptBid(bid) {
  return axios.post(`${BASE_URL}/accept`, bid).then(res => res.data);
}

function declineBid(bid) {
  return axios.post(`${BASE_URL}/decline`, bid);
}

function isExists(ownerProductId, bidderProductId) {
  return axios
    .get(`${BASE_URL}/bid`, {
      params: { ownerProductId, bidderProductId }
    })
    .then(res => res.data);
}
function getBids(userId) {
  console.log ('userId' , userId )
  return axios
    .get(`${BASE_URL}/bids`, {
      params: {userId}
    })
    .then(res => res.data);
}


export default {
  sendBid,
  acceptBid,
  declineBid,
  isExists,
  getBids
};
