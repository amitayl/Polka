
<template>
    <section class="offers">
        <div class="flex space-between align-center">
        <div>Offers for </div>
        <img v-if="product" :src="product.imgs[0]">
        <!-- <product-preview :product="product"> </product-preview> -->
        <v-btn @click="goBack">back</v-btn>
         </div> 
      
        
        <!-- <div class="my-product">  
        
       
        <hr>
        <! <div class="product flex" >
            <img :src="product.imgs[0]">
            <p>{{product.title}}</p>
        </div> -->
        <br>
        <br>
        <product-list @emitSelected="getBidId" v-if="offers.length" :products="offers"></product-list>
        <h1 v-if="!offers.length" >No offers</h1>
    </section>
</template>

<script>
import { PRODUCT_MUTATIONS, PRODUCT_ACTIONS } from '@/store/ProductStore.js';
import ProductService from '@/services/ProductService';
import ProductList from '@/cmps/general/ProductList';
import ProductPreview from '@/cmps/general/ProductPreview';

export default {
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chosenProductId: [],
      detailsBids: [],
      productOffersObjs: [],
      productOffersObj: {},
      productIds: [],
      product: null,
      offers: []
    };
  },

  created() {
    //elad move to dispatch
    // this.sum = ProductService.getOffersByProduct('5ae9bc40c66def0488aff9ec');
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
      }
    );
  },
  methods: {
    goBack() {
      this.$emit('toggleOffers', null);
    },
    emitSelected(productBidderId) {
      this.$emit('emitSelected', productBidderId);
    },
    getBidId(id) {
      let chosenProduct = this.detailsBids.find(
        detailsBid => detailsBid.bidderProdId === id
      );
      this.$store.commit({
        type: PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT,
        product: chosenProduct
      });
      let bidId = this.detailsBids.find(
        detailsBid => detailsBid.bidderProdId === id
      ).bidderProdId;
      this.$emit('emitSelected', bidId);
    },
    methods: {
      gatherProductForSelected() {},

      gatherProductForCurr() {}
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
    ProductList,
    ProductPreview
  }
};
</script>

<style scoped>
.button {
  width: 50px;
}
img {
  width: 200px;
  border-radius: 1px solid rgb(182, 171, 171);
  display: inline-block;
}
.product img {
  width: 100px;
  height: 100px;
}
.my-product {
  margin: 0 auto;
  margin-left: 200px;
  color: green;
}
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
