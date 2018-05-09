
<template>
    <section class="products">
      <user-products v-if="!isShowOffers"  @emitSelected="toggleOffers"></user-products>
      <offers v-if="isShowOffers" :productId="productId" @emitSelected="goToBid"  @toggleOffers="toggleOffers"></offers>
        
    </section>
</template>

<script>
import UserProducts from './UserProducts';
import Offers from './Offers';

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
    // this.productIds = this.$store.getters.getLoggedInUser.productIds;
    // ProductService.getProductsByIds(this.productIds).then(products => {
    //   if (!Array.isArray(products)) this.products = [products];
    //   else this.products = products;
    // });
  },
  methods: {
    toggleOffers(id) {
      console.log('id');
      if (id) {
        this.isShowOffers = true;
        this.productId = id;
      } else {
        this.isShowOffers = false;
        this.productId = null;
      }
      // isShowOffers=true;
    },
      goToBid (productBidderId){
        
        let ids =  this.productId+','+productBidderId;
        console.log ('ids' , ids);
        // this.$router.push('/decideTrade:ids');
        
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
