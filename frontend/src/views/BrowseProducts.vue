<template>
  <div class="browse-products">
    <categories-sub-nav></categories-sub-nav>
    <product-sort></product-sort>
    <product-list @emitSelected="routeDetails" v-if="products" :products="products"></product-list>
  </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import { PRODUCT_MUTATIONS, PRODUCT_ACTIONS } from '../store/ProductStore.js';
import CategoriesSubNav from '@/cmps/browse-products/CategoriesSubNav.vue';
import ProductSort from '@/cmps/browse-products/ProductSort.vue';
import ProductList from '@/cmps/general/ProductList.vue';

export default {
  created() {
    this.$store.dispatch({
      type: PRODUCT_MUTATIONS.SET_PRODUCTS,
      queryObj: {}
    });
    console.log(this.products);
  },
  computed: {
    products() {
      return this.$store.state.ProductStore.products;
    }
  },
  components: {
    CategoriesSubNav,
    ProductSort,
    ProductList
  },
  methods: {
    routeDetails(id) {
      this.$router.push('/product/' + id);
    }
  }
};
</script>