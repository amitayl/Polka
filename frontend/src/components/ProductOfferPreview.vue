<template>
    <section class="product-offers">             
            <h1 class="title is-2 product" >Offers For product : {{prod.title}} </h1>
            <product-list @emitSelected="routeTrade(offerId)" :products="offers"></product-list>
    </section>
</template>

<script>
// import ProductService from '../services/ProductService';
// import OfferPreview from './OfferPreview';
import ProductList from './ProductList';


export default {
    props: {
        productOffersObj: {
            type: Object,
            required: true
        }
    },
   data(){
       return{
       }
   },
        

    created (){

        
    },
    methods : {
         
    },
    computed : {
        prod () {
             console.log ('prod' , this.productOffersObj.prod.title);
            return this.productOffersObj.prod
            
        },
        // product(){
        //     console.log ('productOffersObj.prod'  , productOffersObj.prod);
        //     return productOffersObj.prod
        // },
        offers (){
            console.log ('yosi  ' , this.productOffersObj   );
            return this.productOffersObj.bidProds
        }
    },

    components:{
        ProductList
    }
};

</script>

<style scoped>
img {
    width:100px;
    min-width:100px;
    height:100px;
}
.product {
    border-bottom:1px solid rgb(155, 140, 140);
}



</style>
