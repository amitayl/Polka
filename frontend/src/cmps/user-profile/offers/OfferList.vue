<template>    
    <section v-if="offers" class="offer-list elevation-4">
        <offer-preview 
            v-for="(offer, idx) in offers" 
            :key="idx"
            :offer="offer"
            @emitSelected="$emit('removeFromUi', idx)">
        </offer-preview>
    </section>
</template>

<script>
import OfferPreview from './OfferPreview.vue';

export default {
  props: {
    offers: {
      type: Array,
      required: true
    }
  },
  methods: {},
  components: {
    OfferPreview
  }
};
</script>

<style>
.offer-list {
  max-width: 400px;
}
</style>