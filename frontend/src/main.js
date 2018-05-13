import Vue from 'vue';
import VueMaterial from 'vue-material';
import Vuetify from 'vuetify'

import 'vue-material/dist/vue-material.min.css';
// Vue.use(vuelidate.default)    
Vue.use(VueMaterial);


 
  // Vue.use(VueCloudinary, {
//   "cloud_name": "<polka>",
//   "api_key": "735122477923243",
//   "cdn_subdomain": true,
// });

// import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
import '../node_modules/vuetify/dist/vuetify.min.css'

import App from './App.vue';
import router from '@/router/index.js';
import store from './store/index.js';

Vue.config.productionTip = false;

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
