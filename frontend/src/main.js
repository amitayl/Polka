import Vue from 'vue';
import VueMaterial from 'vue-material';

import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
// Vue.use(VueCloudinary, {
//   "cloud_name": "<polka>",
//   "api_key": "735122477923243",
//   "cdn_subdomain": true,
// });

// cloudinary.v2.uploader.upload("../../frontend/src/imgs/best_offer.jpg)",
// function(error, result) {console.log(result)});

import App from './App.vue';
import router from './router';
import store from './store/index.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
