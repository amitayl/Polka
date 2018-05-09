
<template>
    <section class="offers">
        <button @click="goBack">back</button>
        <div class="product flex" >
            <img :src="product.imgs[0]">
            <p>{{product.title}}</p>
        </div>
        <product-list :products="offers"></product-list>
    </section>
</template>

<script>
import ProductService from '@/services/ProductService';
import ProductList from '../browse-products/ProductList';

export default {
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      productOffersObjs: [],
      productOffersObj: {},
      productIds: [],
      product: null,
      offers: []
    };
  },

  created() {
    console.log('blabla');
    // this.sum = ProductService.getOffersByProduct('5ae9bc40c66def0488aff9ec');
    ProductService.getOffersByProductId(this.productId).then(
      productOffersObj => {
        this.productOffersObj = productOffersObj;
        console.log('productOffersObjslllllllllllll', productOffersObj);
        this.product = productOffersObj.prod;
        this.offers = productOffersObj.bidProds;
      }
    );
  },
  methods: {
    goBack() {
      console.log('koko');
      this.$emit('toggleOffers', null);
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
