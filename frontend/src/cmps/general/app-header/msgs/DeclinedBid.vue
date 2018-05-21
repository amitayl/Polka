<template>
  <section class="bid declined-bid">

    <div class="product-container">
        <p class="body-1">{{data.owner.nickName}} refused your</p>
        <img class="bid-product" :src="data.bidder.product.imgs[0]">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <v-icon :size="50">block</v-icon>

    <div class="product-container">
        <p class="body-1">for his</p>
        <img class="bid-product" :src="data.owner.product.imgs[0]">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    <v-icon color="white" :size="20" class="close-btn" @click="$emit('deleteNotification')">close</v-icon>
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
};  
</script>

<style>
.declined-bid {
  flex-direction: row;
  padding-top: 35px;
  align-items: center;
  background-color: rgb(255, 240, 240);
}
</style>