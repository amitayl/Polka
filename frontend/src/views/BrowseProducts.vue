<template>
  <div class="browse-products">
    <!-- <categories-sub-nav></categories-sub-nav> -->
    <!-- <product-sort></product-sort> -->
    <product-list @emitSelected="routeDetails" v-if="products" :products="products"></product-list>
  </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import { PRODUCT_MUTATIONS } from '../store/ProductStore.js';
import { USER_ACTIONS } from '../store/UserStore';
// import CategoriesSubNav from '@/cmps/browse-products/CategoriesSubNav.vue';
// import ProductSort from '@/cmps/browse-products/ProductSort.vue';
import ProductList from '@/cmps/general/ProductList.vue';

export default {
  created() {
    this.$store
      .dispatch({
        type: USER_ACTIONS.LOGIN_SESSION_USER
      })
      .then(() => {
        const loggedInUser = this.$store.getters.getLoggedInUser;
        if (loggedInUser) {
          this.$socket.emit('joinSocketById', loggedInUser._id);
        }
        this.$store.dispatch({
          type: PRODUCT_MUTATIONS.SET_PRODUCTS,
          queryObj: {}
        })/* .then(()=>{(this.products)}); */
      });
  },
  computed: {
    products() {
      return this.$store.state.ProductStore.products;
    }
  },
  components: {
    // CategoriesSubNav,
    // ProductSort,
    ProductList
  },
  methods: {
    routeDetails(id) {
      this.$router.push('/product/' + id);
    }
  }
};
</script>

<style>
</style>