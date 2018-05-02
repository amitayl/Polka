import axios from 'axios';

function query(criteria) {
    return axios.get('http://127.0.0.1:3000/product').then(res => res.data);
}

export default {
    query
}