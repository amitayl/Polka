import axios from "axios";
const BASE_URL = 'http://127.0.0.1:3000';

function sendBid(bidData) {
    return axios.post(`${BASE_URL}/bid`, bidData).then(res => res.data)
}

export default {
    sendBid
}