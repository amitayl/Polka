<template>
  <section class="new-bid">
        <div class="flex flex-column align-center">
            <p class="md-body-1">{{notification.bidder.nickName}} wants your</p>
            <img :src="notification.owner.product.imgs[0]" class="bid-product" alt="my product">
            <p class="md-caption">{{notification.owner.product.title}}</p>
        </div>

        --->

        <div class="flex flex-column align-center">
            <p class="md-body-1">for his</p>
            <img :src="notification.bidder.product.imgs[0]" class="bid-product" alt="bidded product">
            <p class="md-caption">{{notification.bidder.product.title}}</p>
        </div>

      <button @click="acceptBid()">V</button>
      <button @click="declineBid()">X</button>
  </section>
</template>

<script>
import BidService from '@/services/BidService.js';

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    acceptBid() {
      console.log('accepting');
    },
    declineBid() {
      BidService.declineBid(this.notification).then(() => {
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
</style>
