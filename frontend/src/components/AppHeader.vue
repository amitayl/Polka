<template>
    <section>
        <md-toolbar class="md-medium">
            <div class="flex align-center">
                <h2 class="md-display-1 logo">Polka</h2>
                <form @submit.prevent="searchProducts()">
                  <select v-model="category">
                    <option v-for="(category, idx) in possibleCategories" 
                            :key="idx" :value="category">{{category}}</option>
                  </select>
                  <input v-model="searchStr"
                          ref="search"
                          type="search" 
                          class="search" 
                          placeholder="Find some stuff"/>
                  <button type="submit">🔎</button> 
                </form>
            </div>
            <ul>
                <router-link v-for="str in ['messages', 'upload', 'profile']" 
                            :key="str" to="/browseProducts" 
                            class="md-headline">{{str}}</router-link>
            </ul>
        </md-toolbar>
    </section>
</template>

<script>
import { MUTATIONS, ACTIONS } from '../store/ProductStore.js';

export default {
  mounted() {
    this.$refs.search.focus();
  },
  methods: {
    searchProducts() {
      const inDescOrTitle = (this.searchStr)? 
          {
            $or: [
              { title: { $regex: `.*${this.searchStr}.*` } },
              { desc: { $regex: `.*${this.searchStr}.*` } }
            ]
          }: {};
      const ofCategory = (this.category !== 'all')? {
        categories: { $in: [this.category] }
      } : {};
      const queryObj = { $and: [inDescOrTitle, ofCategory] };
      this.$store.dispatch({ type: ACTIONS.SET_PRODUCTS, queryObj });
    }
  },
  data() {
    return {
      searchStr: null,
      category: 'all',
      possibleCategories: ['all', 'clothes', 'fdsf']
    };
  }
};
</script>

<style>
.md-toolbar {
  padding: 0 30px;
  justify-content: space-between;
  margin-bottom: 20px;
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
.router-link,
.router-link-active {
  color: initial;
  margin-right: 20px;
}
.router-link:last-of-type,
.router-link-active:last-of-type {
  margin-right: 0;
}
</style>
