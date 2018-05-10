import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

function query() {
  return axios.get(BASE_URL + '/transaction').then(res => res.data);
}

function getById(transactionId) {
  console.log('go to transaction ');
  return axios.get(BASE_URL + '/transaction' + transactionId).then(res => {
    let transaction = res.data;
    console.log('transaction', transaction);
    return transaction;
  });
}

export default {
  query,
  getById
};
