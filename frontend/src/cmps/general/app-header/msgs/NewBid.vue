<template>
  <section class="new-bid bid">

    <div class="flex">
      <div class="product-container">
        <img 
          :src="data.owner.product.imgs[0]" 
          class="bid-product mb-1" 
          alt="my product">
        <p class="caption">{{data.owner.product.title.substr(0, 13).trim()}}</p>
      </div>

      <v-icon class="color-blue" :size="50">swap_horiz</v-icon>

      <div class="product-container">
        <img :src="data.bidder.product.imgs[0]" class="bid-product mb-1" alt="bidded product">
        <p class="caption">{{data.bidder.product.title.substr(0, 13).trim()}}</p>
      </div>
    </div>

    <div class="btn-container">
      <v-btn 
        small
        class="decline-btn" 
        @click.native.stop="declineBid()">
        nope
        <v-icon :size="15">delete</v-icon>
      </v-btn>

      <v-btn 
        small
        class="accept-btn" 
        @click.native.stop="acceptBid()">
        trade
        <v-icon :size="15">done</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script>
import EventBusService, { EVENTS } from '@/services/EventBusService.js';
import BidService from '@/services/BidService.js';

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

      BidService.acceptBid(this.data)
        .then(transactionId => {
          this.$router.push('/transaction/' + transactionId);
        })
        .catch(() => {
          EventBusService.$emit(EVENTS.RETURN_REMOVED_NOTIFICATION);

          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'accept failed',
            desc: 'please try again later',
            success: false
          });
        });

      EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
        title: 'Sending',
        desc: 'one moment'
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
  /* box-shadow: inset 8px 0 0 rgb(55, 107, 126); */
  background: white;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
.btn-container .btn {
  margin: 0;
  padding-left: 5px;
  color: whitesmoke;
  font-weight: bold;
}
.btn-container .btn:last-of-type {
  margin-left: 10px;
}
.btn-container .btn__content {
  padding: 8px;
}
.accept-btn {
  background: rgb(139, 214, 153);
}
.decline-btn {
  background: rgb(218, 130, 130);
}
.color-blue {
  color:rgb(55, 107, 126); 
}
</style>