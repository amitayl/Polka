const PRODUCT_MUTATIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCT_FILTER: 'setProductFilter',
  ADD_PRODUCT: 'addProduct',
  UPDATE_SELECTED_PRODUCT: 'updateSelectedProduct',
  UPDATE_CURR_PRODUCT: 'updateCurrProduct'
};
const PRODUCT_ACTIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCTS_TO_SHOW: 'getProductsToShow',
  ADD_PRODUCT: 'addProduct',
  GET_PRODUCT_BY_ID: 'getProductById'
};
Object.freeze(PRODUCT_MUTATIONS);
Object.freeze(PRODUCT_ACTIONS);

export { PRODUCT_MUTATIONS, PRODUCT_ACTIONS };

import ProductService from '../services/ProductService.js';
import UserService from '../services/UserService.js';
import StorageService from '../services/StorageService.js';
import { USER_MUTATIONS } from './UserStore.js';

export default {
  state: {
    currProdut: null,
    products: null,
    selectedProduct: null,
    uploadedProduct: null,
    isGettingProducts: false
  },
  mutations: {
    [PRODUCT_MUTATIONS.SET_PRODUCTS](state, { products }) {
      state.products = products;
    },
    [PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT](state, { product }) {
      state.selectedProduct = product;
    },
    [PRODUCT_MUTATIONS.UPDATE_CURR_PRODUCT](state, { product }) {
      state.currProduct = product;
    }
  },
  getters: {
    getSelectedProduct(state) {
      return state.selectedProduct;
    },
    getProducts(state) {
      return state.products;
    },
    getCurrProduct(state) {
      return state.currProduct;
    }
  },
  actions: {
    [PRODUCT_ACTIONS.SET_PRODUCTS](ctx, { queryObj }) {
      const colsToGet = {
        ownerId: 1,
        title: 1,
        desc: 1,
        imgs: 1
      };

      let userCoords;
      const loggedInUser = ctx.rootGetters.getLoggedInUser;
      if (loggedInUser) {
        userCoords = loggedInUser.loc.coords
        return getProducts();
      }
      else {
        return navigator.geolocation.getCurrentPosition(loc=>{
          userCoords = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
          }
          return getProducts();
        })
      }

      function getProducts() {
        return ProductService.query(queryObj, colsToGet, userCoords).then(products => {
          ctx.commit({
            type: PRODUCT_MUTATIONS.SET_PRODUCTS,
            products
          });
        });
      }
    },

    [PRODUCT_ACTIONS.ADD_PRODUCT](ctx, { product }) {
      return new Promise((resolve, reject) => {
        ProductService.add(product)
          .then(addedProductId => {
            ctx.commit(
              USER_MUTATIONS.PUSH_PRODUCT_ID,
              { productId: addedProductId },
              { root: true }
            );
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    [PRODUCT_ACTIONS.GET_PRODUCT_BY_ID](store, { productId }) {
      return ProductService.getProductById(productId).then(product => {
        store.commit({
          type: PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT,
          product
        });
        return product;
      });
    }
  }
};
