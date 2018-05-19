import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import ProductStore from './ProductStore.js';
import UserStore from './UserStore.js';
// import SocketStore from './SocketStore.js';

export default new Vuex.Store({
  modules: {
    ProductStore,
    UserStore,
  }
});
