<template>
    <section class="flex align-center">
        <button class="hamburger"
                @click="$emit('toggleSideMenu')">%</button>

        <h2 @click="$emit('moveToHome')" class="md-display-1 logo">Polka</h2>

        <form @submit.prevent="searchProducts()">
            <select v-model="category">
            <option v-for="(CATEGORY, idx) in PRODUCT_CATEGORIES" 
                    :key="idx" :value="CATEGORY">{{CATEGORY}}</option>
            </select>
            <input v-model="searchStr"
                    ref="search"
                    type="search" 
                    class="search" 
                    placeholder="Find some stuff"/>
            <button type="submit">🔎</button> 
        </form>
    </section>
</template>

<script>
import { PRODUCT_CATEGORIES } from '@/const.js';
import { PRODUCT_ACTIONS } from '@/store/ProductStore.js';

export default {
  data() {
    return {
      category: 'all',
      PRODUCT_CATEGORIES,
      searchStr: null
    };
  },
  mounted() {
    this.$refs.search.focus();
  },
  methods: {
    searchProducts() {
      this.$router.push('/browseProducts');

      const inDescOrTitle = this.searchStr
        ? {
            $or: [
              { title: { $regex: `.*${this.searchStr}.*` } },
              { desc: { $regex: `.*${this.searchStr}.*` } }
            ]
          }
        : {};
      const ofCategory =
        this.category !== 'all'
          ? {
              categories: { $in: [this.category] }
            }
          : {};

      const queryObj = { $and: [inDescOrTitle, ofCategory] };
      this.$store.dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, queryObj });
    }
  }
};
</script>

<style scoped>
.hamburger {
  position: relative;
  z-index: 1;
}
.md-display-1.logo {
  margin-right: 30px;
}
form {
  display: flex;
  height: 50px;
}
select {
  height: 100%;
}
.search {
  height: 100%;
  border: 1px solid gray;
  padding: 10px 15px;
  font-size: 1rem;
}
.search::first-letter {
  text-transform: uppercase;
}
button[type='submit'] {
  border: 1px solid lightgray;
  width: 50px;
}
@media (min-width: 1100px) {
  .hamburger {
    display: none;
  }
}
</style>
