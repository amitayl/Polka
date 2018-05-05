<template>
  <md-toolbar>
      <md-button v-for="(CATEGORY, idx) in PRODUCT_CATEGORIES" 
                 @click.native="searchByCategory(CATEGORY)" :key="idx" class="md-primary">
          {{CATEGORY}}
      </md-button>
  </md-toolbar>
</template>

<script>
import { PRODUCT_CATEGORIES } from '../const.js';
import { ACTIONS } from '../store/ProductStore.js'

export default {
    data() {
        return {
            PRODUCT_CATEGORIES
        }
    },
    methods: {
        searchByCategory(CATEGORY) {
            const queryObj = (CATEGORY === 'all')? {} : { categories: { $in: CATEGORY } };
            this.$store.dispatch({ type: ACTIONS.SET_PRODUCTS, queryObj });
        }
    }
};
</script>

<style scoped>
.md-toolbar {
  margin-bottom: 20px;
}
</style>
