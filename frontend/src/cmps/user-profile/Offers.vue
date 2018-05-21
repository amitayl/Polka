
<template>
  <section class="offers ms-5">
    <div class="flex space-between align-center">
      <v-card>
        <img v-if="product" :src="product.imgs[0]"/>
      </v-card>
    </div>
      
    <v-btn @click="goBack">back</v-btn>

    <offer-list v-if="detailsBids.length > 0" :offers="detailsBids" @removeFromUi="removeFromUi($event)"></offer-list>

    <!-- <product-list @emitSelected="getBidId" v-if="offers" :slim="true" :products="offers"></product-list> -->
    <h1 v-if="!offers.length" >No Offers Yet Honey</h1>
  </section>
</template>

<script>
import { PRODUCT_MUTATIONS, PRODUCT_ACTIONS } from '@/store/ProductStore.js';
import ProductService from '@/services/ProductService.js';
import OfferList from './offers/OfferList.vue';

export default {
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      detailsBids: [],
      productOffersObj: {},
      product: null,
      offers: []
    };
  },
  created() {
    ProductService.getOffersByProductId(this.productId).then(
      productOffersObj => {
        this.productOffersObj = productOffersObj;
        this.product = productOffersObj.prod;

        this.$store.commit({
          type: PRODUCT_MUTATIONS.UPDATE_CURR_PRODUCT,
          product: this.product
        });
        let curr = this.$store.getters.getCurrProduct;
        this.detailsBids = productOffersObj.bids;
        if (this.detailsBids)
          this.offers = productOffersObj.bids.map(bid => bid.bidderProd);
          console.log({detailsBids: this.detailsBids, productOffersObj: this.productOffersObj
          , product: this.product, offers: this.offers})
      }
    );
  },
  methods: {
    goBack() {
      this.$emit("toggleOffers", null);
    },
    emitSelected(productBidderId) {
      this.$emit("emitSelected", productBidderId);
    },
    getBidId(id) {
      ("id", id);
      let chosenProduct = this.detailsBids.find (detailsBid => detailsBid.bidderProdId === id );
      this.$store.commit({ type: PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT, product: chosenProduct});
      let bidId = this.detailsBids.find (detailsBid => detailsBid.bidderProdId === id ).bidderProdId;
        ('bidId' , bidId);
       this.$emit ('emitSelected' , bidId);
    },
    removeFromUi(idx) {
      this.offers.splice(idx, 1);
    }
  },
  components: {
    OfferList
  }
};
</script>

<style scoped>
img {
  width: 200px;
  border-radius: 1px solid rgb(182, 171, 171);
}
</style>
