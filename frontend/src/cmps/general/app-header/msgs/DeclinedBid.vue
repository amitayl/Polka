<template>
  <section class="new-bid">
      {{notification}}
  </section>
</template>

<script>
import BidService from '@/services/BidService.js';

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    acceptBid() {
      console.log('accepting');
    },
    declineBid() {
      BidService.declineBid(this.notification).then(() => {
        console.log('deleted');
      });
    }
  }
};
</script>

<style scoped>
.new-bid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  background: orangered;
}

.bid-product {
  height: 50px;
  width: auto;
}
</style>
