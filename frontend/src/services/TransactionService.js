
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';


function getById(transactionId) {
    console.log('go to transaction ')
    return axios.get((BASE_URL + '/transacion' + transactionId)).then(res => {
        let transaction = res.data;
        console.log('transaction', transaction);
        return transaction;
    });
}
function addTransaction (isDeal){
    let transaction = gatherTransaction(isDeal);
    return axios.post((BASE_URL + '/transaction'  ,  transaction)).then(res => {
        let fullTransaction = res.data;
        console.log('transaction', fullTransaction);
        return fullTransaction;
    });
        

}
function gatherTransaction(isDeal){
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



export default {
    getById,
    addTransaction
   
}
