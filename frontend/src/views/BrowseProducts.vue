<template>
  <div class="browse-products">
    <categories-sub-nav></categories-sub-nav>
    <product-sort></product-sort>
    <product-list v-if="products" :products="products"></product-list>
  </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import { PRODUCT_MUTATIONS, PRODUCT_ACTIONS } from '../store/ProductStore.js';

import CategoriesSubNav from '../components/CategoriesSubNav.vue'
import ProductSort from '../components/ProductSort.vue';
import ProductList from '../components/ProductList.vue';

export default {
  created() {
    this.$store.dispatch({ type: PRODUCT_MUTATIONS.SET_PRODUCTS, queryObj: {} })
  },
  computed: {
    products() {
      return this.$store.state.ProductStore.products;
    }
  },
  components: {
    CategoriesSubNav,
    ProductSort,
    ProductList,
  }
};
</script>