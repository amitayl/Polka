<template>
    <section class="product-list">
        <ul>
            <li v-for="product in products" 
                v-if="product.isLive"
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
.flex {
  display: flex;
  align-items: center;
}

.space-between {
  justify-content: space-between;
}

ul {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

li {
    margin-right: 50px;
}
</style>
