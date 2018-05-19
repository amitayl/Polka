import Vue from 'vue';

import '../node_modules/vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

Vue.component('star-rating', VueStarRating.default);
// Vue.use(VueCloudinary, {
//   "cloud_name": "<polka>",
//   "api_key": "735122477923243",
//   "cdn_subdomain": true,
// });

import App from './App.vue';
import router from '@/router/index.js';
import store from './store/index.js';

Vue.config.productionTip = false;

import VueSocketio from 'vue-socket.io';
const socketURL =
  process.env.NODE_ENV !== 'development' ? '/' : '//127.0.0.1:3000';
Vue.use(VueSocketio, socketURL, store);

new Vue({
  sockets: {
    connect() {
      ('Connected to socket!');
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
