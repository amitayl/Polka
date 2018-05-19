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
    console.log('userffff',this.user);
    BidService.getBids(this.user._id);
  }
};
</script>

<style>

</style>
