<template>
  <div id="app">
    <md-toolbar class="md-medium">
      <div class="flex">
        <h2 class="md-display-1 logo">Polka</h2>
        <input @input="searchProducts()" 
               v-model="searchStr"
               ref="search"
               type="search" 
               class="search" 
               placeholder="Find some stuff"/>
      </div>
      <ul>
        <router-link v-for="str in ['messages', 'upload', 'profile']" 
                    :key="str" to="/browseProducts" 
                    class="md-headline">{{str}}</router-link>
      </ul>
    </md-toolbar>
    <router-view/>
  </div>
</template>

<script>
import { MUTATIONS } from './store.js'

export default {
  mounted() {
    this.$refs.search.focus()
  },
  methods: {
    searchProducts() {
      const queryObj = {$contains:{"location":this.searchStr}};
      this.$store.commit({type: MUTATIONS.SET_PRODUCT_FILTER, queryObj})
    }
  },
  data() {
    return {
      searchStr: null
    }
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md-toolbar {
  padding: 0 30px;
  justify-content: space-between;
}
.flex {
  display: flex;
}
.md-display-1.logo {
  margin-right: 30px;
}
.search {
  border: 1px solid gray;
  padding: 10px 15px;
  font-size: 1.5rem;
}
.search::first-letter {
  text-transform: uppercase;
}
.router-link, .router-link-active {
  color: initial;
  margin-right: 20px;
} .router-link:last-of-type, .router-link-active:last-of-type {
  margin-right: 0;
}
</style>
