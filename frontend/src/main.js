import Vue from 'vue';

import '../node_modules/vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

// Vue.use(VueCloudinary, {
//   "cloud_name": "<polka>",
//   "api_key": "735122477923243",
//   "cdn_subdomain": true,
// });

import App from './App.vue';
import router from '@/router/index.js';
import store from './store/index.js';

Vue.config.productionTip = false;

// import VueSocketIo from 'vue-socket.io';
// Vue.use(VueSocketIo, 'http://127.0.0.1:3000', store);

new Vue({
  // validations: {
//   name: { requiinred, maxLength: maxLength(10) },
  //   email: { required, email },

  // },
  // mixins: [validationMixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app');