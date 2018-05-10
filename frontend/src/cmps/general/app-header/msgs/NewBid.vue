<template>
  <section class="new-bid bid">
    <div class="flex flex-column align-center">
        <p class="md-body-1">{{data.bidder.nickName}} wants your</p>
        <img :src="data.owner.product.imgs[0]" class="bid-product" alt="my product">
        <p class="md-caption">{{data.owner.product.title}}</p>
    </div>

    --->

    <div class="flex flex-column align-center">
        <p class="md-body-1">for his</p>
        <img :src="data.bidder.product.imgs[0]" class="bid-product" alt="bidded product">
        <p class="md-caption">{{data.bidder.product.title}}</p>
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
        console.log('sending delete');
      BidService.declineBid(this.data).then(() => {
        console.log('DELETED');
      });
    }
  }
};
</script>

<style>
.new-bid {
  background-color: rgb(217, 245, 255);
}

.new-bid .md-button {
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