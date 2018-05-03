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
      return ProductService.query(queryObj).then(products => {
        store.commit({ type: MUTATIONS.SET_PRODUCTS, products });
      });
    },
    [ACTIONS.GET_PRODUCT_BY_ID](store, { productId }) {
      console.log ('tatat');
        // return ProductService.getProductById(productId)
        //   .then(product => {
        //     return product;
        //   })
      }
    
  },
  
};
