<template>
  <div class="contain flex space-between product-details">
    
    <div class="product-imgs flex flex-column"> 
      <img class="primary-img product-img" src="../imgs/car_example2.jpg"> 
      <div class="small-imgs flex space-between">
        <img class="product-img small-img" src="../imgs/car_example2.jpg">
        <img class=" product-img small-img" :src="product.imgs"> 
        <img class="product-img small-img" src="../imgs/car_example2.jpg"> 
        <img class="product-img small-img" src="../imgs/car_example2.jpg">  
      </div>
    </div>

    <div class="non-part-imgs  ">
      <h2 class="product-title title is-2">{{product.userName}}</h2>
      <div class= "user-img-line flex align-center">
        <div> <img class="owner-img" :src="product.ownerImg"></div>
        <h2 class="product-title title is-2">{{product.title}} </h2>
      </div>
    
      <h4 class="product-desc title is-4">{{product.desc}}</h4> 
      <h4 class="title is-4">Things I want:</h4>
      <h4 class="title is-4">Trade location:</h4>
      <router-link :to="'/bid'"><button class="bid">Bid Now</button></router-link>
    </div>

  </div>
</template>

<script>
import { PRODUCT_ACTIONS } from '../store/ProductStore.js';

export default {
  created() {
    const productId = this.$route.params._id;
    console.log(PRODUCT_ACTIONS.GET_PRODUCT_BY_ID);
    // var productId = "5ae9bc40c66def0488aff9ec";
    this.$store
      .dispatch({ type: PRODUCT_ACTIONS.GET_PRODUCT_BY_ID, productId })
      .then(product => {
        console.log('product', product);
        console.log('product titel', product);
        this.product = product;
      });
  },
  data() {
    return {
      product: {}
    };
  },
};
</script>

<style scoped>
div {
  margin-top: 20px;
}
.primary-img {
  width: 500px;
  height: 300px;
}
.product-img {
  border: 3px solid rgb(162, 167, 177);
}
.product-details {
  color: red;
}
.non-part-imgs {
  width: 45%;
  text-align: left;
}
.product-imgs {
  width: 45%;
}
.product-title {
  margin-left: 20px;
  color: rgb(174, 218, 174);
}
.product-desc {
  color: rgb(99, 128, 99);
}
.product-imgs .small-img {
  width: 20%;
  height: 50px;
}
.contain {
  max-width: 1050px;
  margin: 0 auto;
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
img {
  animation-name: fadein;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  /* animation-delay: 100s */
}

.owner-img {
  /* float:left; */
  width: 100px;
  border-radius: 50%;
}
.user-img-line {
  padding-top: 0px;
  margin-top: 0px;
}
button.bid {
  float: right;
}
.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.justify-center {
  justify-content: center;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.align-center {
  align-items: center;
}

.space-around {
  justify-content: space-around;
}
.space-between {
  justify-content: space-between;
}
.space-evenly {
  justify-content: space-evenly;
}
.flex-wrap {
  flex-wrap: wrap;
}

.flex-full {
  flex: 1;
}

.flex-column {
  flex-direction: column;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}
</style>