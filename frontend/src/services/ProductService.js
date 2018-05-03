import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';

// const criteria = {hey: 'hey'};
// let products = query(criteria);
// console.log(products);

function query(criteria) {
<<<<<<< HEAD
    console.log ('criteria' , criteria );
    
    return axios.get(BASE_URL+'/product').then(res => res.data);
=======
  return axios
    .get(BASE_URL + '/product', {
      params: {
        criteria
      }
    })
    .then(res => res.data);
>>>>>>> 86a13404f7eabb9f5a1257d3a5401489c8bd44cc
}

export default {
  query
};
