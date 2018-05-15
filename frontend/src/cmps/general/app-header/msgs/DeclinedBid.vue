<template>
  <section class="declined-bid bid">
    <div class="flex flex-column align-center">
        <p class="body-1">{{data.owner.nickName}} refused your</p>
        <img class="bid-product" :src="data.bidder.product.imgs[0]">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    --X->

    <div class="flex flex-column align-center">
        <p class="body-1">for his</p>
        <img class="bid-product" :src="data.owner.product.imgs[0]">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    <v-icon color="white" class="close-btn" @click="$emit('deleteNotification')">close</v-icon>
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
  created() {
    console.log(this.data);
  }
};
</script>

<style>
.declined-bid {
  background-color: rgb(255, 240, 240);
}
</style>