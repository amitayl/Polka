<template>
  <section class="new-bid bid" @click="moveTo('/decideTrade/'+data._id)">
    <div class="flex flex-column align-center">
        <p class="body-1">{{data.bidder.nickName}} wants your</p>
        <img :src="data.owner.product.imgs[0]" class="bid-product" alt="my product">
        <p class="caption">{{data.owner.product.title}}</p>
    </div>

    <div class="flex flex-column align-center">
        <p class="body-1">for his</p>
        <img :src="data.bidder.product.imgs[0]" class="bid-product" alt="bidded product">
        <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <div class="flex flex-column align-center">
      <v-btn :small="true" class="accept-btn" @click.native.stop="acceptBid()">accept V</v-btn>
      <v-btn :small="true" class="decline-btn" @click.native.stop="declineBid()">decline X</v-btn>
    </div>
  </section>
</template>

<script>
import BidService from '@/services/BidService.js';
import EventBusService, { EVENTS } from '@/services/EventBusService.js';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTo(path) {
      this.$router.push(path);
    },
    acceptBid() {
      this.$emit('removeNotificationFromUi');

      BidService.acceptBid(this.data).then(transactionId=>{
        console.log ('aaaa');
       this.$router.push('/transaction/'+transactionId);

      })
      .catch(() => {
        EventBusService.$emit(EVENTS.RETURN_REMOVED_NOTIFICATION);

        EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
          title: 'accept failed',
          desc: 'please try again later',
          success: false
        });
      });
    },
    declineBid() {
      this.$emit('removeNotificationFromUi');

      BidService.declineBid(this.data).catch(() => {
        EventBusService.$emit(EVENTS.RETURN_REMOVED_NOTIFICATION);

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
.new-bid:hover {
  cursor: pointer;
  background-color: rgb(186, 235, 253);
}

.accept-btn {
  background: lightseagreen;
}

.decline-btn {
  background: lightcoral;
}
</style>