const TRANSACTION_MUTATIONS = {

    ADD_TRANSACTION: 'addTransaction',
    UPDATE_CURR_TRANSACTION: 'updateCurrTransaction'
};
const TRANSACTION_ACTIONS = {
    ADD_TRANSACTION: 'addTransaction',


};
Object.freeze(TRANSACTION_MUTATIONS);
Object.freeze(TRANSACTION_ACTIONS);

export { TRANSACTION_MUTATIONS, TRANSACTION_ACTIONS };

import TransactionService from '@/services/TransactionService.js';
// //   import UserService from '../services/UserService.js';
// //   import StorageService from '../services/StorageService.js';
//   import { USER_MUTATIONS } from './UserStore.js';

export default {
    state: {
        currTransaction: null,
        transactions: null,
    },
    mutations: {
        //   [PRODUCT_MUTATIONS.SET_PRODUCTS](state, { products }) {
        //     state.products = products;
        //   },
        [TRANSACTION_MUTATIONS.ADD_TRANSACTION](state, { product }) {
            return
        },
        [TRANSACTION_MUTATIONS.UPDATE_CURR_TRANSACTION](state, { transaction }) {
            state.currTransaction = transaction;
        }
    },
    getters: {
        //   getSelectedProduct(state) {
        //     return state.selectedProduct;
        //   },
        //   getProducts(state) {
        //     return state.products;
        //   },
        getCurrTransaction(state) {
            return state.currTransaction
        }
    },
    actions: {
        [TRANSACTION_MUTATIONS.ADD_TRANSACTION](state, { product }) {
            return TransactionService.addTransaction()
                .then(transaction => {
                    store.commit({ type: TRANSACTION_MUTATIONS.ADD_TRANSACTION, transaction })
                    return transaction;
                })

        }
    }
}
