<template>
  <section class="declined-bid bid">
    <div class="flex flex-column align-center">
        <p class="body-1">{{data.owner.nickName}} refused your offer</p>
        <img class="bid-product">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    --X->

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
  created() {
    console.log('im here baby');
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
};
</script>

<style>
.declined-bid {
  background-color: rgb(255, 211, 211)
}
</style>