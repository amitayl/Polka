<template>
    <section>
        <md-toolbar class="md-medium" 
                    :class="{ 'margin-bottom': isRouteBrowseProducts}">


            <div class="flex align-center">

                <router-link to="/">
                  <h2 class="md-display-1 logo">Polka</h2>
                </router-link>

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

            </div>


            <ul v-if="isLoggedIn" class="link-list">
              <li @click="showMessages = !showMessages" 
                  class="md-headline">
                <ul v-if="showMessages" class="msgs-container">
                  {{msgs}}
                  <!-- <li v-for="msg in msgs" :key="msg">{{msg}}</li> -->
                </ul>
              </li>

              <li v-for="str in ['upload', 'profile']" 
                  :key="str" class="md-headline"> 
                  <router-link :to="`/${str}`">{{str}}</router-link>
              </li>

              <li class="md-headline"><button @click="logout()">logout</button></li>
            </ul>
 
            <ul v-else class="link-list">
              <li class="md-headline"><router-link to="/register">sign up</router-link></li>
              <li class="md-headline"><router-link to="/login">login</router-link></li>
            </ul>


        </md-toolbar>
    </section>
</template>

<script>
import { PRODUCT_ACTIONS } from '../store/ProductStore.js';
import { USER_ACTIONS } from '../store/UserStore.js';
import { PRODUCT_CATEGORIES } from '../const.js';

export default {
  data() {
    return {
      searchStr: null,
      category: 'all',
      showMessages: false,
      PRODUCT_CATEGORIES
    };
  },
  mounted() {
    this.$refs.search.focus();
  },
  computed: {
    isRouteBrowseProducts() {
      return this.$route.path !== '/browseProducts'
    },
    isLoggedIn() {
      return this.$store.getters.getLoggedInUser;
    },
    // msgs() {
    //   return this.$store.getters.getLoggedInUser;
    // }
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
    },
    logout() {
      this.$store.dispatch({ type: USER_ACTIONS.LOGOUT })
    }
  }
};
</script>

<style scoped>
.md-toolbar {
  padding: 0 30px;
  justify-content: space-between;
  box-shadow: none;
}
.margin-bottom {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
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
.link-list {
  display: flex;
}
.link-list > li {
  margin-right: 20px;
}
.link-list > li:last-of-type {
  margin-right: 0;
}
.msgs-container {
  position: absolute;
  border: 1px solid gray;
  height: 400px;
  width: 400px;
  top: 100px;
  transform: translate(calc(-50% + 50px));
}
</style>
