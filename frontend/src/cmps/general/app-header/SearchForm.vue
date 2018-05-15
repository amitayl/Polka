<template>
    <section class="flex align-center">
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
form {
  display: flex;
  height: 40px;
}
select {
  height: 100%;
  background: whitesmoke;
  padding: 0 10px;
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
</style>
