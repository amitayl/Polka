import axios from "axios";
const BASE_URL = 'http://127.0.0.1:3000';

function sendBid(bidData) {
    return axios.post(`${BASE_URL}/bid`, bidData);
}

function declineBid(notification) {
    return axios.delete(`${BASE_URL}/bid`, {params: {notification}});
}

export default {
    sendBid,
    declineBid
}