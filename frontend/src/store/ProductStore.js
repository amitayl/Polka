import ProductService from '../services/ProductService.js';

const PRODUCT_MUTATIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_PRODUCT_FILTER: 'setProductFilter',
  ADD_PRODUCT: 'addProduct',
  UPDATE_SELECTED_PRODUCT: 'updateSelectedProduct'
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

export default {
  state: {
    products: null,
    selectedProduct: null,
    uploadedProduct: null
  },
  mutations: {
    [PRODUCT_MUTATIONS.SET_PRODUCTS](state, { products }) {
      state.products = products;
    },
    [PRODUCT_MUTATIONS.ADD_PRODUCT](state, { product }) {
      state.products = [product, ...state.products];
    },
    [PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT](state, { product }) {
      state.selectedProduct = product;
    }
  },
  getters: {
    selectedProduct(state) {
      return state.selectedProduct;
    },
    getProducts(state) {
      return state.products;
    }
    // getCurrUser (state){
    //   console.log ('yoyo');
    //   return state.currUser
    // }
  },
  actions: {
    [PRODUCT_ACTIONS.SET_PRODUCTS](store, { queryObj }) {
      const colsToGet = {
        _id: 1,
        ownerId: 1,
        title: 1,
        desc: 1,
        location: 1,
        imgs: 1
      };
      return ProductService.query(queryObj, colsToGet).then(products => {
        console.log({ products });
        store.commit({ type: PRODUCT_MUTATIONS.SET_PRODUCTS, products });
      });
    },

    [PRODUCT_ACTIONS.ADD_PRODUCT](store, { product }) {
      return new Promise((resolve, reject) => {
        console.log('STORE: Adding new product...', product);
        ProductService.add(product)
          .then(addedProduct => {
            store.commit({ type: 'addProduct', addedProduct });
            console.log('Product has been added.');
            resolve();
          })
          .catch(err => {
            console.log(`Add product failed, ERROR: ${err}`);
            reject(err);
          });
      });
    },

    [PRODUCT_ACTIONS.GET_PRODUCT_BY_ID](store, { productId }) {
      return ProductService.getProductById(productId).then(product => {
        console.log('store', product.title);
        store.commit({ type: PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT, product });
        return product;
      });
    }
  }
};
