<template>
  <section class="accepted-bid bid" @click="moveTo('/transaction/'+data._id)">
    <div class="flex flex-column align-center">
        <p class="body-1">Congradulations on your new</p>
        <img class="bid-product" :src="data.owner.product.imgs[0]">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    --V->

    <div class="flex flex-column align-center">
        <p class="body-1">you traded it for</p>
        <img class="bid-product" :src="data.bidder.product.imgs[0]">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <v-icon color="white" class="close-btn" @click="$emit('deleteNotification')">close</v-icon>
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
  created() {
    console.log(this.data);
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
  background-color: rgb(215, 255, 222);
}
.accepted-bid:hover {
  cursor: pointer;
  background-color: rgb(174, 250, 188);
}
</style>