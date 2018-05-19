<template>
  <section class="bid-container container">

    <section class="logged-in-user-products" v-if="cardsAlreadyBidded.length > 0">

      <v-layout v-for="(loggedInUserProduct, idx) in loggedInUserProducts" 
                :key="idx" class="elevation-2">
        <v-flex>

          <v-card width="100%" @click.native="selectProduct(idx)"
                      :class="{ selected: selectedProductIdx === idx, 
                                disabled: cardsAlreadyBidded[idx] }">

            <v-icon class="done" v-if="selectedProductIdx === idx">done</v-icon>

            <v-card-media
              height="100px"
              :src="loggedInUserProduct.imgs[0]">
            </v-card-media>
            
            <v-card-title>
              <span>{{loggedInUserProduct.title}}</span>
            </v-card-title>

          </v-card>
        </v-flex>
      </v-layout>
    </section>
    
      <h2 v-if="loggedInUserProducts === false">you have no products, please upload some</h2>
    <router-link to="/upload">upload new product</router-link>
    
    <v-btn @click="bidProduct()" 
      :disabled="selectedProductIdx === null || isSelectedProductBidded">
        {{sendBidTxt}}
    </v-btn>
  </section>
</template>

<script>
import ProductService from '../services/ProductService.js';
import BidService from '../services/BidService.js';
import UserService from '../services/UserService';
import EventBusService, { EVENTS } from '../services/EventBusService.js';

export default {
  created() {
    this.biddedProductId = this.$route.params.biddedProductId;

    ProductService.getProductById(this.biddedProductId).then(product => {
      this.biddedProduct = product;
    });

    this.loggedInUser = this.$store.getters.getLoggedInUser;
    if (this.loggedInUser.productIds.length !== 0) {
      ProductService.getProductsByIds(this.loggedInUser.productIds).then(
        products => {
          this.loggedInUserProducts =
            products instanceof Array ? products : [products];

          this.loggedInUserProducts.forEach((loggedInUserProduct, idx) => {
            const ownerProductId = this.$route.params.biddedProductId;
            // check if product was allready bidded. do for each one
            BidService.isExists(ownerProductId, loggedInUserProduct._id).then(
              isExists => {
                this.cardsAlreadyBidded.push(isExists);
              }
            );
          });
        }
      );
    } else this.loggedInUserProducts = false;
  },
  data() {
    return {
      biddedProductId: null,
      loggedInUser: null,
      loggedInUserProducts: null,
      selectedProductIdx: null,
      isSelectedProductBidded: null,
      cardsAlreadyBidded: []
    };
  },
  computed: {
    sendBidTxt() {
      return this.isSelectedProductBidded
        ? 'you allready bidded this product'
        : 'send bid';
    }
  },
  methods: {
    selectProduct(idx) {
      if (this.cardsAlreadyBidded[idx]) return;
      this.selectedProductIdx = idx;
    },
    bidProduct() {
      const owner = { productId: this.biddedProductId };

      const bidProduct = this.loggedInUserProducts[this.selectedProductIdx];
      const bidder = { productId: bidProduct._id };

      const bidData = { owner, bidder };

      BidService.sendBid(bidData)
        .then(() => {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'offer sent!',
            desc: 'we will let you know'
          });

          // ProductService.getProductById(bidData.owner.productId).then(
          //   product => {

          //     (this.$socket, this.$store.getters.socket);
          //     this.$socket.emit('bidSent', product.ownerId);
          //     this.$store.getters.socket.emit('bidSent', product.ownerId);
          //     // emit the owner Id
          //     this.$store.commit({
          //       type: SOCKET_MUTATIONS.EMIT,
          //       eventName: 'bidSent',
          //       params: product.ownerId
          //     });
          //   }
          // );
        })
        .catch(() => {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'offer wasn\'t sent',
            desc: 'try again later',
            success: false
          });
        });

      this.$router.push('/product/' + this.biddedProductId);
    }
  }
};
</script>

<style scoped>
.logged-in-user-products {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-template-rows: auto;
  grid-gap: 20px;
}

.logged-in-user-products > div:hover {
  cursor: pointer;
}

.selected {
  box-shadow: 0 0 0 6px lightseagreen;
}

.disabled {
  background: lightgray;
  filter: grayscale();
}
.disabled:hover {
  cursor: initial;
}
.disabled:hover::after {
  content: 'this product was already bidded';
  position: absolute;
  z-index: 2;
  bottom: -50px;
  left: 0;
  background: darkslategray;
  color: white;
  border-radius: 15px;
}
.selected.disabled {
  box-shadow: none;
}

.icon.done {
  position: absolute;
  z-index: 1;
  top: -15px;
  right: -15px;
  background: lightseagreen;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

@media (min-width: 400px) {
  .logged-in-user-products {
    grid-template-columns: repeat(3, 150px);
  }
}

@media (min-width: 600px) {
  .logged-in-user-products {
    grid-template-columns: repeat(4, 150px);
  }
}

@media (min-width: 800px) {
  .logged-in-user-products {
    grid-template-columns: repeat(5, 150px);
  }
}
</style>