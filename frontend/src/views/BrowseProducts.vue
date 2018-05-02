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
      })
    }

    this.$store.dispatch(ACTIONS.GET_PRODUCTS_TO_SHOW).then(productsToShow => {
      console.log({productsToShow});
    })
    // this.products = this.$store.getters.productsToShow; 
  },
  // computed: {
  //   queryObj() {
  //     const filter = this.$store.state.filter;
  //     return filter ? filter : {};
  //   }
  // },
  data() {
    return {
      products: null
    };
  },
  components: {
    ProductList
  }
};
</script>
