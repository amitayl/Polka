<template>
  <md-toolbar>
      <md-button v-for="(CATEGORY, idx) in PRODUCT_CATEGORIES" 
                 @click.native="searchByCategory(CATEGORY)" :key="idx" class="md-primary">
          {{CATEGORY}}
      </md-button>
  </md-toolbar>
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
.md-toolbar {
  position: initial;
  margin-bottom: 20px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
