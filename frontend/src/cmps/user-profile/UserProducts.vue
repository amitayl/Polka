<template>
    <section class="user-products">
         <h1 class="title is-2 product" >My products </h1>
         <product-list @emitSelected="emitSelected" v-if="products" :products="products"></product-list>
    </section>
</template>

<script>
import ProductList from '@/cmps/general/ProductList';
import ProductService from '@/services/ProductService';

export default {
  data() {
    return {
      products: null,
      productIds: []
    };
  },

  created() {
    this.productIds = this.$store.getters.getLoggedInUser.productIds;
    ProductService.getProductsByIds(this.productIds).then(products => {
      if (!Array.isArray(products)) this.products = [products];
      else {
        this.products = products;
      }
    });
  },
  methods: {
    emitSelected(id) {
      this.$emit('emitSelected', id);
    }
    //  getProducts(){
    //   ProductService.getOffersByProductIds(this.productIds).
    //   then (productOffersObjs=>{
    //       this.productOffersObjs = productOffersObjs;
    //       console.log ('productOffersObjslllllllllllll' , productOffersObjs);
    //   })
    // },
  },

  components: {
    ProductList
  }
};
</script>

<style scoped>

</style>
