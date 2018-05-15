<template>
  <v-toolbar>
      <v-btn v-for="(CATEGORY, idx) in PRODUCT_CATEGORIES" 
                 @click.native="searchByCategory(CATEGORY)" :key="idx">
          {{CATEGORY}}
      </v-btn>
  </v-toolbar>
</template>

<script>
import { PRODUCT_CATEGORIES } from '@/const.js';
import { PRODUCT_ACTIONS } from '@/store/ProductStore.js';

export default {
  data() {
    return {
      PRODUCT_CATEGORIES
    };
  },
  methods: {
    searchByCategory(CATEGORY) {
      const queryObj =
        CATEGORY === 'all' ? {} : { categories: { $in: CATEGORY } };
      this.$store.dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, queryObj });
    }
  }
};
</script>

<style scoped>
</style>
