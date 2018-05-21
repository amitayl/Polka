<template>
  <section class="bid accepted-bid" @click="moveTo('/transaction/'+data._id)">

    <div class="product-container">
        <p class="body-1">you got</p>
        <img class="bid-product" :src="data.owner.product.imgs[0]">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    <i class="far fa-handshake fa-3x"></i>

    <div class="product-container">
        <p class="body-1">you traded</p>
        <img class="bid-product" :src="data.bidder.product.imgs[0]">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <v-icon color="white" :size="20" class="close-btn" @click.stop="$emit('deleteNotification')">close</v-icon>
  </section>
</template>

<script>
import BidService from '@/services/BidService.js';
import EventBusService,{ EVENTS } from '../../../../services/EventBusService';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTo(path) {
      EventBusService.$emit(EVENTS.CLOSE_NOTIFICATIONS)
      this.$router.push(path);
    }
  }
};
</script>

<style>
.accepted-bid {
  flex-direction: row;
  padding-top: 35px;
  background-color: rgb(215, 255, 222);
  align-items: center;
}
.accepted-bid:hover {
  cursor: pointer;
  background-color: rgb(174, 250, 188);
}
</style>