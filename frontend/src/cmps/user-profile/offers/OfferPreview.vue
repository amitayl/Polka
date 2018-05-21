<template>    
    <section class="offer-preview">
        <div class="offer flex space-around pa-2 elevation-4">
            <div class="offer-product-img" 
                :style="{ 'backgroundImage': `url(${offer.bidderProd.imgs[0]})` }">
            </div>

            <v-btn fab class="accept-btn" @click.native="acceptBid()">
                <v-icon :size="30">done</v-icon>
            </v-btn>
            <v-btn fab class="decline-btn" @click.native="declineBid()">
                <v-icon :size="30">close</v-icon>
            </v-btn>
        </div>
    </section>
</template>

<script>
import BidService from '@/services/BidService.js';
import EventBusService, { EVENTS } from '@/services/EventBusService.js';

export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  methods: {
    acceptBid() {
      // this.$emit('emitSelected');
      console.log(this.offer);
      BidService.acceptBid(this.offer)
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
      // this.$emit('emitSelected');

      BidService.declineBid(this.offer).catch(() => {
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

<style scoped>
.offer-product-img {
  height: inherit;
  width: 68px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
}
.offer-btn {
  width: 48px;
  height: inherit;
}
.accept-btn {
  background: lightseagreen;
}
.decline-btn {
  background: lightcoral;
}
/* overriding vuetify */
.btn i {
  margin-left: 0;
}
</style>