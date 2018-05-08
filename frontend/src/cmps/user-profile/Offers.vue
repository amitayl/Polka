<template>
    <section class="offers">
        <h1>offers</h1>
        <button @click="Product"></button>
    </section>
</template>

<script>
import ProductService from '@/services/ProductService';
export default {
  data() {
    return {
      sum: {}
    };
  },
  methods: {
    Product() {
      ProductService.getOffersByProductId('5ae9bc40c66def0488aff9ec');
    }
  }
};
</script>

<style scoped>
.public-profile {
  text-align: left;
}
.user-details {
  padding: 5px;
}

.user-title {
  font-family: 'Times New Roman', Times, serif;
}

.user-img-wrapper {
  margin-right: 50px;
  width: 200px;
}

.user-img {
  box-shadow: 0 2px 2px black;

  border-radius: 50%;
}
</style>