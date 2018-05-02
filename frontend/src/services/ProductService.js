import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function query(criteria) {
    return axios.get(BASE_URL+'/product').then(res => res.data);
}

export default {
    query
}