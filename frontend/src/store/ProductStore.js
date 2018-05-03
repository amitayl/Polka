import ProductService from '../services/ProductService.js';

const MUTATIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCT_FILTER: 'setProductFilter'
};
const ACTIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCTS_TO_SHOW: 'getProductsToShow'
}
Object.freeze(MUTATIONS);
Object.freeze(ACTIONS);

export { MUTATIONS, ACTIONS };

export default {
  state: {
    products: null,
  },
  mutations: {
    [MUTATIONS.SET_PRODUCTS](state, { products }) {
      state.products = products;
    },
  },
  actions: {
    [ACTIONS.SET_PRODUCTS](store, { queryObj }) {
      // const colsToGet = {"_id": 1, "title": 1, "desc": 1, "owner_id":1};
      const colsToGet = {};
      return ProductService.query(queryObj, colsToGet).then(products => {
        store.commit({ type: MUTATIONS.SET_PRODUCTS, products });
      });
    }
  }
};
