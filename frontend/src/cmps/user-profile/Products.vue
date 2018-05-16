
<template>
    <section class="products">
      <user-products v-if="!isShowOffers"  @emitSelected="toggleOffers"></user-products> 
       <!-- <offers v-if="isShowOffers"  
       ></offers> -->
      <offers v-if="isShowOffers" :productId="productId"  
      @emitSelected="goToBid"  @toggleOffers="toggleOffers"></offers> 
    </section>
</template>

<script>
import UserProducts from './UserProducts';
import Offers from './Offers';
import ProductService from '@/services/ProductService';

export default {
  data() {
    return {
      productId: null,
      isShowOffers: false,
      products: [],
      productIds: []
    };
  },

  created() {
  },
  methods: {
    toggleOffers(id) {
      console.log('id' , id);
      if (id) {
        this.isShowOffers = true;
        this.productId = id;
      } else {
        this.isShowOffers = false;
        this.productId = null;
      }
      // isShowOffers=true;
    },
    goToBid(bidId) {
      this.$router.push('/decideTrade/' + bidId);
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
    UserProducts,
    Offers
  }
};
</script>

<style scoped>

</style>
