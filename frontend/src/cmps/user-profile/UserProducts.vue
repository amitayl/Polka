<template>
  <section class="user-products">
    <product-list @emitSelected="emitSelected" v-if="products" :slim="true" :products="products"></product-list>
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
  },
  components: {
    ProductList
  }
};
</script>

<style scoped>
.user-products {
  margin-top: 25px;
}
</style>
