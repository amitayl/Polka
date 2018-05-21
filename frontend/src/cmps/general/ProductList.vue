<template>
    <section class="product-list-section">
        <ul class="clean-list product-list-list">
            <li @click="emitSelected(product._id)" v-for="product in products" 
                :key="product._id">
                <product-preview :product="product" :slim="slim"></product-preview>
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
    },
    slim: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitSelected(id) {
      this.$emit('emitSelected', id);
    }
  },
  components: {
    ProductPreview
  }
};
</script>

<style scoped>
.product-list-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-gap: 15px;
  margin: 0 5vw;
}

@media (min-width: 450px) {
  .product-list-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 750px) {
  .product-list-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1000px) {
  .product-list-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1300px) {
  .product-list-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>