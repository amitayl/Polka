<template>
    <section class="product-list-section">
        <ul class="clean-list product-list-list">
            <li v-for="product in products" 
                :key="product._id">
                <product-preview :product="product"></product-preview>
            </li>
        </ul>
    </section>
</template>

<script>
import ProductPreview from './ProductPreview.vue';

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {
    ProductPreview
  }
};
</script>

<style scoped>
.product-list-list {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-template-rows: auto;
  grid-gap: 20px;
}
</style>
