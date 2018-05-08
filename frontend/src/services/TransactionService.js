import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';


function getById(transactionId) {
    console.log ('go to transaction ')
  return axios.get((BASE_URL+'/transacion'+transactionId)).then(res => {
    let transaction = res.data;
    console.log ('transaction' , transaction);
    return transaction;
  });
}

export default{
    getById
}
