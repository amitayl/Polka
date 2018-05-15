<template>
  <section class="accepted-bid bid">
    <div class="flex flex-column align-center">
        <p class="body-1">Congradulations!
            {{data.owner.nickName}}</p>
        <img class="bid-product">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    --V->

    <div class="flex flex-column align-center">
        <p class="body-1">for your</p>
        <img class="bid-product">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <div class="flex flex-column align-center">
      <v-avatar class="close-btn" @click="closeBid()">close</v-avatar>
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