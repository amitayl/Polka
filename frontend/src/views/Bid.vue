<template>
  <div class="bid">
    <h1 class="title is-1">New Bid</h1>
    
    
    <div class="flex align-center ">
      <div><img class="product-img" :src="selectedProduct.imgs"></div>
      <div> {{selectedProduct.title}}</div>
      
    </div>
    <!-- <img :src="myproducts[0].imgs"> -->
     <button>upload new product</button>
  

  </div>
</template>
<style scoped>
  .flex {
    display: flex;
}
.align-center {
    align-items: center;
}

.bid{
    /* background-color: rgb(161, 154, 154) */
    
}
.title{
  display:inline
}
img{
  margin-left: 40px;
  margin-bottom:30px;
}
.product-img{
  width: 200px;
}
</style>

<script>
export default{
  data() {
    return {
      selectedProduct: {},
      myProducts:[]
    };
  },
  created() {
    this.selectedProduct = this.$store.getters.selectedProduct;
     this.user = this.$store.getters.getUser;
     this.myProducts = this.$store.getters.getProducts;
     console.log ('myProducts' , this.myProducts); 
  },
 

  // computed : {  
  //   product(){ 
  //   return  this.$store.getters.selectedProduct;
  //   }
  
}

</script>
