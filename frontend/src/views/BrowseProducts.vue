<template>
  <div class="browse-products">
    <h1>BrowseProducts</h1>
    <product-list :products="products"></product-list>
  </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import ProductList from '../components/ProductList.vue'
import { MUTATIONS } from '../store.js';

export default {
  created() {
    ProductService.query().then(products => {
      this.$store.commit({type: MUTATIONS.SET_PRODUCTS, products});
      this.products = products;
    })
  },
  data() {
    return {
      products: null
    }
  },
  components: {
    ProductList
  }
}
</script>
