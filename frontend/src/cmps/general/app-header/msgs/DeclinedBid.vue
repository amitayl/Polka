<template>
  <section class="bid declined-bid">

    <div class="product-container">
      <img class="bid-product mb-1" :src="data.bidder.product.imgs[0]">
      <p class="caption">
        {{data.bidder.product.title.substr(0, 13).trim()}}
      </p>
    </div>

    <div class="color-red">
      <i class="fas fa-ban fa-3x"></i>
    </div>

    <div class="product-container">
      <img class="bid-product mb-1" :src="data.owner.product.imgs[0]">
      <p class="caption">
        {{data.owner.product.title.substr(0, 13).trim()}}
      </p>
    </div>

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
  align-items: center;
  box-shadow: inset 8px 0 0 rgb(214, 73, 73);
  background: white;
}
.color-red {
  color: rgb(214, 73, 73);
}
</style>