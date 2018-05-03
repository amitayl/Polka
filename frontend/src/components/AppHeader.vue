<template>
    <section>
        <md-toolbar class="md-medium">
            <div class="flex">
                <h2 class="md-display-1 logo">Polka</h2>
                <form @submit.prevent="searchProducts()">
                <input v-model="searchStr"
                        ref="search"
                        type="search" 
                        class="search" 
                        placeholder="Find some stuff"/>
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
      const inDescOrTitle = {
        $or: [
          { title: { $regex: `.*${this.searchStr}.*` } },
          { desc: { $regex: `.*${this.searchStr}.*` } }
        ]
      };
      const ofCategory = { category: { $eq: 'clothes'} };

      const queryObj = { $and: [inDescOrTitle, ofCategory] };
      this.$store.dispatch({ type: ACTIONS.SET_PRODUCTS, queryObj })
    }
  },
  data() {
    return {
      searchStr: null
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
.search {
  height: 100%;
  border: 1px solid gray;
  padding: 10px 15px;
  font-size: 1.5rem;
}
.search::first-letter {
  text-transform: uppercase;
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
