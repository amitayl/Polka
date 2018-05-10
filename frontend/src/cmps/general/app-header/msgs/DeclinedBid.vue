<template>
  <section class="declined-bid bid">
    <div class="flex flex-column align-center">
        <p class="md-body-1">{{data.owner.nickName}} refused your offer</p>
        <img class="bid-product">
        <p class="md-caption">{{data.owner.product.title}}</p>
    </div>

    --X->

    <div class="flex flex-column align-center">
        <p class="md-body-1">for your</p>
        <img class="bid-product">
        <p class="md-caption">{{data.bidder.product.title}}</p>
    </div>

    <div class="flex flex-column align-center">
      <md-icon class="close-btn" @click="closeBid()">close</md-icon>
    </div>
  </section>
</template>

<script>
import BidService from '@/services/BidService.js';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    acceptBid() {
      console.log('accepting');
    },
    declineBid() {
      BidService.declineBid(this.data).then(() => {
        console.log('deleted');
      });
    }
  }
};
</script>

<style>
.declined-bid {
  background-color: rgb(255, 211, 211)
}
</style>