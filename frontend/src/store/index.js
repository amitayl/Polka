import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import ProductStore from './ProductStore.js'

export default new Vuex.Store({
  strict: true,
  modules: {
    ProductStore
  },
});
