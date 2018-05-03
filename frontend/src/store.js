import Vue from 'vue';
import Vuex from 'vuex';
import ProductService from './services/ProductService.js';

Vue.use(Vuex);

const MUTATIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCT_FILTER: 'setProductFilter'
};
const ACTIONS = {
  GET_PRODUCTS_TO_SHOW: 'getProductsToShow'
}
Object.freeze(MUTATIONS);
Object.freeze(ACTIONS);
export { MUTATIONS, ACTIONS };

export default new Vuex.Store({
  state: {
    products: null,
    // productFilter: null,
    // productsToShow: null
  },
  getters: {
    // productsToShow() {
    //   return ProductService.query(this.productFilter);
    // }
  },
  mutations: {
    [MUTATIONS.SET_PRODUCTS](state, { products }) {
      state.products = products;
    },
    // [MUTATIONS.SET_PRODUCT_FILTER](state, { queryObj }) {
    //   state.productFilter = queryObj;
    // }
  },
  actions: {
    [ACTIONS.GET_PRODUCTS_TO_SHOW](store) {
      // const productsToShow = store.state.productsToShow;

      // if (!store.state.productFilter) {
      //   productsToShow = store.state.products
      // } else {
      //   const productFilter = store.state.productFilter;
      //   const queryObj = productFilter ? productFilter : {};

      //   ProductService.query(queryObj).then(filteredProducts => {
      //     productsToShow = filteredProducts;
      // }
    }
  }
});
