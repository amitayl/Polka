import ProductService from '../services/ProductService.js';

const MUTATIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCT_FILTER: 'setProductFilter',
  ADD_PRODUCT: 'addProduct'
};
const ACTIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCTS_TO_SHOW: 'getProductsToShow',
  ADD_PRODUCT: 'addProduct'
}
Object.freeze(MUTATIONS);
Object.freeze(ACTIONS);

export { MUTATIONS, ACTIONS };

export default {
  state: {
    products: [],
  },
  mutations: {
    [MUTATIONS.SET_PRODUCTS](state, { products }) {
      state.products = products;
    },
    [MUTATIONS.ADD_PRODUCT](state, { product }) {
      state.products = [product, ...state.products];
    },
  },
  actions: {
    [ACTIONS.SET_PRODUCTS](store, { queryObj }) {
      // const colsToGet = {"_id": 1, "title": 1, "desc": 1, "owner_id":1};
      const colsToGet = {};
      return ProductService.query(queryObj, colsToGet).then(products => {
        store.commit({ type: MUTATIONS.SET_PRODUCTS, products });
      });
    },
    [ACTIONS.ADD_PRODUCT](store, { product }) {
      return new Promise((resolve, reject) => {
        console.log('STORE: Adding new product...',product)
          ProductService.add(product)
          .then(addedProduct => {
            store.commit({ type: 'addProduct', addedProduct });
            console.log('Product has been added.');
            resolve();
          })
          .catch(err => {
            console.log(`Add product failed, ERROR: ${err}`)
            reject(err);
          })
      })
    },
  }
};
