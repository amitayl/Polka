<template>
  <section class="accepted-bid bid">
    <div class="flex flex-column align-center">
        <p class="md-body-1">Congradulations!
            {{data.owner.nickName}}</p>
        <img class="bid-product">
        <p class="md-caption">{{data.owner.product.title}}</p>
    </div>

    --V->

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
    closeBid() {
      console.log('closing');
    }
  }
};
</script>

<style>
.accepted-bid {
  background-color: rgb(215, 255, 222);
}
</style>