
<template>
    <section class="offers">
        <button @click="goBack">back</button>
        <div class="product flex" >
            <img :src="product.imgs[0]">
            <p>{{product.title}}</p>
        </div>
        <product-list @emitSelected="getBidId" :products="offers"></product-list>
    </section>
</template>

<script>
import { PRODUCT_MUTATIONS, PRODUCT_ACTIONS } from '@/store/ProductStore.js';
import ProductService from '@/services/ProductService';
import ProductList from '@/cmps/general/ProductList';

export default {
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chosenProductId:[],
      detailsBids: [],
      productOffersObjs: [],
      productOffersObj: {},
      productIds: [],
      product: null,
      offers: []
    }
  },
 
  created() {
    // this.sum = ProductService.getOffersByProduct('5ae9bc40c66def0488aff9ec');
    ProductService.getOffersByProductId(this.productId).then(
      productOffersObj => {
        this.productOffersObj = productOffersObj;
        console.log('productOffersObjslllllllllllll', productOffersObj);
        this.product = productOffersObj.prod;
        
        this.$store.commit({ type: PRODUCT_MUTATIONS.UPDATE_CURR_PRODUCT, product: this.product});
        let currProduct = this.$store.getters.getCurrProduct
        this.detailsBids = productOffersObj.bids
        this.offers = productOffersObj.bids.map ( bid => bid.bidderProd)
      }
    );
  },
  methods: {
    goBack() {
      console.log('koko');
      this.$emit('toggleOffers', null);
    },
    emitSelected(productBidderId){
      this.$emit('emitSelected', productBidderId,);
    },
    getBidIdForChosenProduct(){
      console.log ('bidId' , bidId);
      // let bidId = this.detailBids.find (return bidId) 
    },
    getBidId(id){
      console.log ('id' , id);
      let chosenProduct = this.detailsBids.find (detailsBid => detailsBid.bidderProdId === id );
      this.$store.commit({ type: PRODUCT_MUTATIONS.UPDATE_SELECTED_PRODUCT, product: chosenProduct});
      let bidId = this.detailsBids.find (detailsBid => detailsBid.bidderProdId === id ).bidderProdId;
       console.log ('bidId' , bidId); 
       this.$emit ('emitSelected' , bidId);
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
    ProductList
  }
};
</script>

<style scoped>
.product img {
  width: 100px;
  height: 100px;
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
