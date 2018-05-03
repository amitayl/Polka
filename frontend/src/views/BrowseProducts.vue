<template>
  <div class="browse-products">
    <h1>BrowseProducts</h1>
    <product-list v-if="products" :products="products"></product-list>
  </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import ProductList from '../components/ProductList.vue';
import { MUTATIONS, ACTIONS } from '../store.js';

export default {
  created() {
    if (!this.$store.state.products) {
      ProductService.query().then(products => {
        this.$store.commit({ type: MUTATIONS.SET_PRODUCTS, products });
      });
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  components: {
    ProductList
  }
};
</script>
