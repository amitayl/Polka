<template>
  
</template>

<script>
import BidService from '@/services/BidService' ;
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    BidService.getBids(this.user._id);
  }
};
</script>

<style>

</style>
