
import axios from 'axios';
let BASE_URL = 'http://127.0.0.1:3000';

if(process.env.NODE_ENV !== 'development') {
    BASE_URL = '';
  }

function getById(transactionId) {
    return axios.get(BASE_URL + '/transaction/' + transactionId).then(res => res.data);
}

function addTransaction(isDeal) {
    let transaction = gatherTransaction(isDeal);
    return axios.post((BASE_URL + '/transaction', transaction)).then(res => {
        let fullTransaction = res.data;
        ('transaction', fullTransaction);
        return fullTransaction;
    });
}

function gatherTransaction(isDeal) {
    let selectedProduct = this.$store.getters.getSelectedProduct;
    let currProduct =  this.$store.getters.getCurrProduct;
    let loggedInUser =  this.$store.getters.getLoggedInUser;
    let transaction  = {
        owner : { id :loggedInUser._id,
            productId: currProduct_id,

        },
        bidder: {id: selectedProduct.bidderProd.ownerId,
            productId : selectedProduct.bidderProd._id,
        },
        isDeal,

    }
    return transaction
}

function getDealsByUserId(userId) {
    return axios.get(BASE_URL + '/dealsByUserId/' + userId).then(res => res.data);
}

export default {
    getById,
    addTransaction,
    getDealsByUserId
}
