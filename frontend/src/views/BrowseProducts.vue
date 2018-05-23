<template>
  <section 
    class="browse-products pt-4 pb-4"
    :class="{'flex': !products, 'flex-center': !products}">
    <!-- <categories-sub-nav></categories-sub-nav> -->
    <!-- <product-sort></product-sort> -->
    
    <product-list 
      v-if="products" 
      :products="products"
      @emitSelected="routeDetails">
    </product-list>

    <img 
      v-else
      class="loading-gif" 
      src="@/assets/gifs/loading3.gif" 
      alt="indigo gif"/>
      
  </section>
</template>

<script>
import ProductService from '../services/ProductService.js';
import { PRODUCT_MUTATIONS } from '../store/ProductStore.js';
// import CategoriesSubNav from '@/cmps/browse-products/CategoriesSubNav.vue';
// import ProductSort from '@/cmps/browse-products/ProductSort.vue';
import ProductList from '@/cmps/general/ProductList.vue';

export default {
  created() {
    // if there are no products it brings default ones
    setTimeout(()=>{
      if (!this.$store.getters.getProducts) {
        this.$store.dispatch({
          type: PRODUCT_MUTATIONS.SET_PRODUCTS,
          queryObj: {}
        });
      }
    }, 700)
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

<style scoped>
.browse-products {
  min-height: calc(100vh - 88px);
}
.browse-products .loading-gif {
  height: 70px;
  width: 70px;
}
</style>