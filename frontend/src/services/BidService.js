import axios from "axios";
const BASE_URL = 'http://127.0.0.1:3000';

function sendBid(bidData) {
    return axios.post(`${BASE_URL}/bid`, bidData);
}

function declineBid(bidId) {
    return axios.delete(`${BASE_URL}/bid`, {params: {bidId}});
}

export default {
    sendBid,
    declineBid
}