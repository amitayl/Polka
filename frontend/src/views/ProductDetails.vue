


<template>
  <div class="contain flex space-between product-details">
       
       <div  class="product-imgs flex flex-column"> 
       
         <img class="primary-img product-img" src="../imgs/car_example2.jpg"> 
         <div class="small-imgs flex space-between"> 
             <img class="product-img small-img" src="../imgs/car_example2.jpg">
             <img class=" product-img small-img" :src="product.imgs"> 
             <img class="product-img small-img" src="../imgs/car_example2.jpg"> 
            <img class="product-img small-img" src="../imgs/car_example2.jpg">  
         </div>
         </div>
         <div class="non-part-imgs  ">
           <h2 class="product-title title is-2">{{product.title}} </h2>
           <h4 class="product-desc title is-4" >{{product.desc}}</h4> 

           <!-- This toy car was made in 1940's by the Nazi's factories (have certificate to show -->
         </div>
     
    </div>
</template>

<style scoped>

  div{
    margin-top:20px;
  }
  .primary-img{
    width:500px;
    height:300px;
    
  }
  .product-img{
    border: 3px solid rgb(162, 167, 177)

  }
  .product-details{
    color: red
  }
  .non-part-imgs{
    width:45%;
  }
  .product-imgs{
    width:45%;
  }
  .product-title{
    color:rgb(174, 218, 174)
  }
  .product-desc{
    color:rgb(99, 128, 99)
    }
    .product-imgs .small-img{
      width:20%;
      height:50px;
    }
    .contain {
      max-width: 1050px;
      margin: 0 auto;
      width: 100%;
    padding-right: 20px;
    padding-left: 20px;
}



  

</style>
<script>
  // import '../css/.css'
  import { ACTIONS } from '../store/ProductStore.js'
// @ is an alias to /src


export default {
    
    data() {
        return {
            product : {title: 'title' , desc:'desc',}
        }
    },
    created() {
        const productId = this.$route.params._id
        // var productId = "5ae9bc40c66def0488aff9ec";
        this.$store.dispatch({ type: ACTIONS.GET_PRODUCT_BY_ID, productId})
            .then(product => {
                this.product = product
            })
    }
}
    
</script>
