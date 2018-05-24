<template>
  <section class="bid accepted-bid" @click="moveTo('/transaction/'+data._id)">

    <div class="product-container">
      <img class="bid-product mb-1" :src="data.owner.product.imgs[0]">
      <p class="caption">
        {{data.owner.product.title.substr(0, 13).trim()}}
      </p>
    </div>

    <div class="color-green">
      <i class="far fa-handshake fa-3x"></i>
    </div>

    <div class="product-container">
      <img class="bid-product mb-1" :src="data.bidder.product.imgs[0]">
      <p class="caption">
        {{data.bidder.product.title.substr(0, 13).trim()}}
      </p>
    </div>

    <!-- <v-icon color="white" :size="20" class="close-btn" @click.stop="$emit('deleteNotification')">close</v-icon> -->
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
  /* background-color: rgb(215, 255, 222); */
  background: white;
  box-shadow: inset 8px 0 0 rgb(95, 177, 110);
  align-items: center;
  transition: .1s;
}
.accepted-bid:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, .01);
}
.color-green {
  color: rgb(75, 158, 90);
}
</style>