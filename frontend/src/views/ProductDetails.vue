<template>
  <section v-if="product" class="contain flex space-between product-details">

    <div class="product-imgs flex flex-column"> 
      <img class="primary-img product-img" :src="product.imgs[0]"> 
      <div class="small-imgs flex space-between">
          <img v-for="(img, idx) in product.imgs" v-if="idx !== 0" 
               :key="img" :src="img" class="product-img small-img">
      </div>
    </div>

    <div class="non-part-imgs">
      <h2 class="product-title title is-2">{{product.userName}}</h2>
      <div class= "user-img-line flex align-center">
        <router-link :to="'/profile/'+product.ownerId">
          <div>
            <img class="owner-img" :src="product.ownerImg">
          </div>
        </router-link>
      </div>
    
    <div>
      <br>
      <h2 class="product-title title is-2">{{product.title}}</h2>
      <h4 class="product-desc title is-4" >{{product.desc}}</h4> 
      <!-- bring desired swap categories frmo owner -->
      <!-- <h4 class="title is-4">Things I want: {{ product.desiredSwapCategories[0] }}</h4> -->
    </div>
      
      <v-btn v-if="loggedInUser" @click="toBid()" 
          class="bid-btn"
          :disabled="!isBidAble">Bid Now</v-btn>

      <v-btn v-else class="bid-btn"
          :disabled="true">Login to bid</v-btn>
        
    </div>

  </section>
</template>

<script>
import { PRODUCT_ACTIONS } from '../store/ProductStore.js';
import BidService from '../services/BidService';

export default {
  created() {
    const productId = this.$route.params._id;

    this.$store
      .dispatch({ type: PRODUCT_ACTIONS.GET_PRODUCT_BY_ID, productId })
      .then(product => {
        this.product = product;
        console.log(this.product);

        const loggedInUser = this.$store.getters.getLoggedInUser;
        if (loggedInUser) {
          this.isBidAble = this.product.ownerId !== loggedInUser._id;
        }
      });
  },
  data() {
    return {
      product: null,
      isBidAble: null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    }
  },
  methods: {
    toBid() {
      this.$router.push(`/bid/${this.$route.params._id}`);
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 20px;
}
.primary-img {
  width: 400px;
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
}

.owner-img {
  width: 100px;
  border-radius: 50%;
}
.user-img-line {
  padding-top: 0px;
  margin-top: 0px;
}
.bid-btn {
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