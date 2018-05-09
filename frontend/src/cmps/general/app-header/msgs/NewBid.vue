<template>
  <section class="new-bid">
    <div class="flex flex-column align-center">
        <p class="md-body-1">{{bid.bidder.nickName}} wants your</p>
        <img :src="bid.owner.product.imgs[0]" class="bid-product" alt="my product">
        <p class="md-caption">{{bid.owner.product.title}}</p>
    </div>

    --->

    <div class="flex flex-column align-center">
        <p class="md-body-1">for his</p>
        <img :src="bid.bidder.product.imgs[0]" class="bid-product" alt="bidded product">
        <p class="md-caption">{{bid.bidder.product.title}}</p>
    </div>

    <div class="flex flex-column align-center">
      <md-button class="md-dense accept-btn" @click.native="acceptBid()">accept V</md-button>
      <md-button class="md-dense decline-btn" @click.native="declineBid()">decline X</md-button>
    </div>
  </section>
</template>

<script>
import BidService from '@/services/BidService.js';

export default {
  props: {
    bid: {
      type: Object,
      required: true
    }
  },
  methods: {
    acceptBid() {
      console.log('accepting');
    },
    declineBid() {
      BidService.declineBid(this.bid).then(() => {
        console.log('deleted');
      });
    }
  }
};
</script>

<style scoped>
.new-bid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
}

.bid-product {
  height: 50px;
  width: auto;
}

p {
  margin-bottom: 0;
}

.md-button {
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 50px;
}

.accept-btn {
  background: lightseagreen;
}

.decline-btn {
  background: lightcoral;
}
</style>
