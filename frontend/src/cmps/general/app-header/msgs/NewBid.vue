<template>
  <section class="new-bid bid">
    <div class="flex flex-column align-center">
        <p class="body-1">{{data.bidder.nickName}} wants your</p>
        <img :src="data.owner.product.imgs[0]" class="bid-product" alt="my product">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    --->

    <div class="flex flex-column align-center">
        <p class="body-1">for his</p>
        <img :src="data.bidder.product.imgs[0]" class="bid-product" alt="bidded product">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <div class="flex flex-column align-center">
      <v-btn :small="true" class="accept-btn" @click.native="acceptBid()">accept V</v-btn>
      <v-btn :small="true" class="decline-btn" @click.native="declineBid()">decline X</v-btn>
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
      BidService.declineBid(this.data)
        .then(() => {
          this.$emit('deleteNotification');
        })
        .catch(() => {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'decline failed',
            desc: 'please try again later',
            success: false
          });
        });
    }
  }
};
</script>

<style>
.new-bid {
  background-color: rgb(217, 245, 255);
}

.accept-btn {
  background: lightseagreen;
}

.decline-btn {
  background: lightcoral;
}
</style>