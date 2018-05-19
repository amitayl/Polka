
<template>
    <section class="offers">
        <div class="flex space-between align-center">
        
        <v-card>
          <v-container fluid grid-list-lg>
          <v-layout row wrap>
                    <v-flex xs4 row>
                  <div class="headline">Your offers for this</div>
                  </v-flex>
                  <v-flex x12 >
                <v-card >
                  <img v-if="product" :src="product.imgs[0]">
                </v-card>
                </v-flex>
         </v-layout>
        </v-container>
        </v-card>
        
           <!-- <v-card color="white" class="grey--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    
                     <v-flex xs7>
                      <div>
                        <div>{{user.prodTitle}}</div>
                      </div>
                    </v-flex>
                       <img class="koko"  :src="user.prodImg">
                  </v-layout>
                </v-container>
              </v-card>
        </div> -->
        
        <v-btn @click="goBack">back</v-btn>
         </div> 
        <br>
        <br>
        <product-list @emitSelected="getBidId" v-if="offers" :products="offers"></product-list>
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

  },

  components: {
    ProductList,
    // ProductPreview
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
  font-family: "Times New Roman", Times, serif;
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
