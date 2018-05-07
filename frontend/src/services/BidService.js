import axios from "axios";
const BASE_URL = 'http://127.0.0.1:3000';

function sendBid(bidData) {
    console.log('new bid leaving frontend', bidData);
    return axios.post(`${BASE_URL}/bid`, bidData);
}

export default {
    sendBid
}