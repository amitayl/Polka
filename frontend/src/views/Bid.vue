<template>
  <section class="bid container">

    <section class="logged-in-user-products">
      <md-card-content v-for="(loggedInUserProduct, idx) in loggedInUserProducts" 
                       @click.native="selectedProductIdx = idx"
                       :class="{ selected: selectedProductIdx === idx }"
                       :key="idx" class="md-elevation-2">

        <md-icon v-if="selectedProductIdx === idx" class="done-icon">done</md-icon> 
        <img :src="loggedInUserProduct.imgs[0]">
        <h3>{{loggedInUserProduct.title}}</h3>
      </md-card-content>
    </section>

     <button class="button" disabled>upload new product</button>
     <button @click="bidProduct()" class="button" :disabled="selectedProductIdx === null">send bid</button>
  </section>
</template>

<script>
import ProductService from '../services/ProductService.js';
import BidService from '../services/BidService.js';

export default {
  created() {
    this.biddedProductId = this.$route.params.biddedProductId;

    ProductService.getProductById(this.biddedProductId).then(product => {
      console.log(this.biddedProductId);
      this.biddedProduct = product;
    });

    this.loggedInUser = this.$store.getters.getLoggedInUser;
    ProductService.getProductsByIds(this.loggedInUser.productIds).then(
      products => {
        this.loggedInUserProducts = products;
      }
    );
  },
  data() {
    return {
      biddedProductId: null,
      loggedInUser: null,
      loggedInUserProducts: null,
      selectedProductIdx: null
    };
  },
  methods: {
    bidProduct() {
      const owner = { productId: this.biddedProductId };

      const bidProduct = this.loggedInUserProducts[this.selectedProductIdx];
      const bidder = { productId: bidProduct._id };

      const bidData = { owner, bidder };
      BidService.sendBid(bidData);
    }
  }
};
</script>

<style scoped>
.logged-in-user-products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
}

.md-card-content {
  position: relative;
  border-radius: 5px;
}
.md-card-content:hover {
  cursor: pointer;
}

.selected {
  box-shadow: inset 0 0 0 6px lightseagreen, 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.md-icon.done-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  background: lightseagreen;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

@media (min-width: 400px) {
  .logged-in-user-products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 600px) {
  .logged-in-user-products {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 800px) {
  .logged-in-user-products {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>