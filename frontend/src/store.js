import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const MUTATIONS = {
  SET_PRODUCTS: 'setProducts'
}
Object.freeze(MUTATIONS);
export { MUTATIONS };

export default new Vuex.Store({
  state: {
    products: null
  },
  mutations: {
    [MUTATIONS.SET_PRODUCTS](state, {products}) {
      state.products = products;
    }
  },
  actions: {

  }
})
