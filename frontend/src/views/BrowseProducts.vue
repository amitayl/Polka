<template>
  <div class="browse-products">
    <product-list v-if="products" :products="products"></product-list>
  </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import ProductList from '../components/ProductList.vue';
import { MUTATIONS, ACTIONS } from '../store/ProductStore.js';

export default {
  created() {
    this.$store.dispatch({ type: MUTATIONS.SET_PRODUCTS, queryObj: {} })
  },
  computed: {
    products() {
      return this.$store.state.ProductStore.products;
    }
  },
  components: {
    ProductList
  }
};
</script>