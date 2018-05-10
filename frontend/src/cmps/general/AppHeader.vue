<template>
    <section>
        <md-toolbar class="md-medium"
                    :class="{ 'margin-bottom': isBrowseProducts, 'invisible': isHomePage}">

            <hamburger-logo-search @toggleSideMenu="showSideMenu = !showSideMenu"
                                   @moveToHome="moveTo('')"></hamburger-logo-search>

            <link-list :showSideMenu="showSideMenu"
                       @moveTo="moveTo($event)"></link-list>
        </md-toolbar>
    </section>
</template>

<script>
import { USER_ACTIONS } from '@/store/UserStore.js';
import HamburgerLogoSearch from './app-header/HamburgerLogoSearch.vue';
import LinkList from './app-header/LinkList.vue'

export default {
  data() {
    return {
      showSideMenu: false,
    };
  },
  computed: {
    isBrowseProducts() {
      const route = this.$route.path;
      return route !== '/browseProducts';
    },
    isHomePage() {
      const route = this.$route.path;
      return route === '/';
    },
  },
  methods: {
    moveTo(route) {
      const prevRoute = this.$route.path;
      const nextRoute = '/'+route;

      if (prevRoute !== nextRoute) {
        this.$router.push(nextRoute);
        this.showSideMenu = false;
      }
    },
  },
  components: {
    HamburgerLogoSearch,
    LinkList
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
</style>
