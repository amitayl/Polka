import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

// const criteria = {hey: 'hey'};
// let products = query(criteria);
// console.log(products);

function query(criteria) {
  return axios
    .get(BASE_URL + '/product', {
      params: {
        criteria
      }
    })
    .then(res => res.data);
}

export default {
  query
};
