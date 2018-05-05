import ProductService from '../services/ProductService.js';

const MUTATIONS = {
}
const ACTIONS = {
  

}
Object.freeze(MUTATIONS);
Object.freeze(ACTIONS);

export { MUTATIONS, ACTIONS };

export default {
  
    state: {
        currUser: {
            _id : '', 
            name: '',
            email: '',
            products:[{id : 1 , img :'' } , {id : 2 , img :''}]
       
            
        },
        userSelected: {
            _id : '2', 
            name: 'yosi',
            img: '../imgs/selectedUser.jpg',
            desc: ' Hello , I am a nice person who likes to travel',
            email: 'yosi@gmail.com',
            products:[{id : 4 , img :'' } , {id : 5 , img :''}]
            
        }

      },
  
  mutations: {
  },
  getters:{
    getCurrUser (state){
        console.log ('yoyo');
        return state.currUser
      },

      getUserSelected(state){
        return state.userSelected
      }
  
  },
  actions: {
    [ACTIONS.SET_PRODUCTS](store, { queryObj }) {
      const colsToGet = { "_id": 1, "ownerId": 1, "title": 1, "desc": 1, "location": 1, "imgs": 1 };
      return ProductService.query(queryObj, colsToGet).then(products => {
        store.commit({ type: MUTATIONS.SET_PRODUCTS, products });
      });
    },
    [ACTIONS.ADD_PRODUCT](store, { product }) {
      return new Promise((resolve, reject) => {
        console.log('STORE: Adding new product...', product)
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

    [ACTIONS.GET_PRODUCT_BY_ID](store, { productId }) {
      return  ProductService.getProductById(productId)
        .then(product => {
          console.log ('store' , product.title);
          store.commit({type: MUTATIONS.UPDATE_SELECTED_PRODUCT , product});
          return product;
        })
    }

  },

};
