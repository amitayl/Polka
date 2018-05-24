<template>
  <section class="app">

    <user-msg></user-msg>

    <header>
      <transition name="fade" mode="out-in">
        <app-header 
          :isMobile="isMobile"
          @toggleSideMenu="showSideMenu = !showSideMenu">
        </app-header>
      </transition>
    </header>

    <transition name="slide-left">
      <side-menu 
        v-show="isMobile && showSideMenu"
        :isMobile="isMobile">
      </side-menu>
    </transition>

    <main 
      @click="showSideMenu = false"
      class="relative"
      :class="{'padding-top': isHome}">

      <transition name="fade">
        <div 
          v-if="isMobile && showSideMenu" 
          class="dark-overlay">
        </div>
      </transition>
      
      <transition name="fade" mode="out-in">
        <router-view :isMobile="isMobile"/>
      </transition>
    </main>

  </section>
</template>

<script>
import UserMsg from './cmps/general/UserMsg.vue';
import AppHeader from './cmps/general/AppHeader.vue';
import SideMenu from './cmps/general/SideMenu.vue';
import { USER_ACTIONS } from './store/UserStore';

export default {
  created() {
    this.$store
      .dispatch({
        type: USER_ACTIONS.LOGIN_SESSION_USER
      })
      .then(() => {
        const loggedInUser = this.$store.getters.getLoggedInUser;
        if (loggedInUser) {
          this.$socket.emit('joinSocketById', loggedInUser._id);
        }
      });

    // for responsive porpouses
    if (window.innerWidth <= 900) this.isMobile = true;
    else this.isMobile = false;

    window.addEventListener('resize', event => {
      if (event.target.innerWidth > 900 && this.isMobile) {
        this.isMobile = false;
      } else if (event.target.innerWidth <= 900 && !this.isMobile) {
        this.isMobile = true;
        this.showSideMenu = false;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {});
  },
  data() {
    return {
      showSideMenu: false,
      isMobile: false
    };
  },
  computed: {
    isHome() {
      return this.$route.path !== '/'
    }
  },
  watch: {
    $route() {
      this.showSideMenu = false;
    }
  },
  components: {
    UserMsg,
    AppHeader,
    SideMenu
  }
};
</script>

<style scoped>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
main {
  min-height: 100vh;
}
main section {
  min-height: calc(100vh - 88px) 
}
.dark-overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .2)
}
.padding-top {
  padding-top: 64px;
}
</style>
<style>
@import '../public/css/main.css';
</style>