<template>
    <section>
        <md-toolbar class="md-medium"
                    :class="{ 'margin-bottom': isBrowseProducts, 'invisible': isHomePage}">

            <div class="flex align-center">

                <button class="hamburger"
                        @click="showSideMenu = !showSideMenu">%</button>
                <h2 @click="moveTo('/')" class="md-display-1 logo">Polka</h2>

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
                  <br>
                  <br>
            </div>


            <ul class="link-list" :class="{ 'show-side-menu': showSideMenu }">
              <template v-if="isLoggedIn">
                <li @click="showMessages = !showMessages" 
                    class="md-headline">
                    messages
                  <ul v-if="showMessages" class="msgs-container md-elevation-2">
                    {{msgs}}
                    <!-- <li v-for="msg in msgs" :key="msg">{{msg}}</li> -->
                  </ul>
                </li>

                <li class="md-headline" @click="moveTo('upload')">upload</li>
                <li class="md-headline" @click="moveToProfile()">profile</li>
                <li class="md-headline"><button @click="logout()">logout</button></li>
              </template>


              <template v-else>
                <li class="md-headline" @click="moveTo('register')">sign up</li>
                <li class="md-headline" @click="moveTo('login')">login</li>
              </template>
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
      showSideMenu: false,
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
    isHomePage() {
      const route = this.$route.path;
      return route === '/';
    },
    isBrowseProducts() {
      const route = this.$route.path;
      return route !== '/browseProducts';
    },
    isLoggedIn() {
      return this.$store.getters.getLoggedInUser;
    }
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
      this.$store.dispatch({ type: USER_ACTIONS.LOGOUT });
    },
    moveTo(route) {
      const prevRoute = this.$route.path;
      const nextRoute = '/'+route;

      if (prevRoute !== nextRoute) {
        this.$router.push(nextRoute);
        this.showSideMenu = false;
      }
    },
    moveToProfile() {
      const prevRoute = this.$route.path.substr(0, 7);
      const nextRoute = '/profile';

      if (prevRoute !== nextRoute) {
        const loggedInUserId = this.$store.getters.getLoggedInUser._id;
        this.$router.push(nextRoute+'/'+loggedInUserId);
        this.showSideMenu = false;
      }
    },
  }
};
</script>

<style scoped>
.md-toolbar {
  padding: 0 30px;
  justify-content: space-between;
  box-shadow: none;
}
.md-toolbar.invisible {
  position: absolute;
  background-color: transparent;
}
.margin-bottom {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
}
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
.link-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  height: 100vh;
  width: 200px;
  padding-top: 88px;
  background: whitesmoke;
  transition: transform .3s;
}
.link-list > li {
  border-bottom: 1px solid gray;
  padding: 10px 20px;
  text-align: left;
}
.link-list > li:first-of-type {
  border-top: 1px solid gray;  
}
.link-list > li:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, .1);
}
.show-side-menu {
  transform: initial;
}
.msgs-container {
  position: absolute;
  background: white;
  border-radius: 5px;
  height: 400px;
  width: 400px;
  top: 100px;
  transform: translate(calc(-50% + 50px));
}
@media (min-width: 1100px) {
  .hamburger {
    display: none;
  }
  
  .link-list {
    position: initial;
    background: initial;
    flex-direction: initial;
    align-items: initial;
    transform: initial;
    height: initial;
    width: initial;
    padding-top: initial;
    background: initial;
  }

  .link-list > li {
    border: initial;
  }
  
  .link-list > li:first-of-type {
    border: initial;
  }
}
</style>
