<template>
  <section class="new-bid bid" @click="moveTo('/decideTrade/'+data._id)">
    <div class="flex flex-column align-center">
      <p class="subheading">{{data.bidder.nickName}} wants your</p>
      <img :src="data.owner.product.imgs[0]" class="bid-product" alt="my product">
      <p class="caption">{{data.owner.product.title}}</p>
    </div>

    <v-icon :size="50">swap_horiz</v-icon>

    <div class="flex flex-column align-center">
      <p class="subheading">for his</p>
      <img :src="data.bidder.product.imgs[0]" class="bid-product" alt="bidded product">
      <p class="caption">{{data.bidder.product.title}}</p>
    </div>

    <div class="btn-container">
      <v-btn class="accept-btn" @click.native.stop="acceptBid()">
        trade
        <v-icon :size="15">done</v-icon>
      </v-btn>
      <v-btn class="decline-btn" @click.native.stop="declineBid()">
        nope
        <v-icon :size="15">delete</v-icon>
      </v-btn>
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

      BidService.acceptBid(this.data)
        .then(transactionId => {
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

      EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
          title: 'Sending',
          desc: 'one moment',
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
  align-items:stretch;
}
.new-bid:hover {
  cursor: pointer;
  background-color: rgb(186, 235, 253);
}
.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
}
.btn-container .btn {
  padding: 8px 0;
  width: 30px;
}
.btn i {
  margin-left: 5px;
}
.accept-btn {
  background: lightseagreen;
}
.decline-btn {
  background: lightcoral;
}
</style>