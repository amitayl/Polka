<template>
    <section>

      <v-toolbar :class="{ 'margin-bottom': isBrowseProducts }" :clipped-left="true" :height="64">
            
        <i class="far fa-handshake fa-3x logo-icon"></i> 
        <v-toolbar-title @click.native="moveTo('')" class="display-1 logo">Polka</v-toolbar-title>
        <search-form></search-form>

        <v-spacer></v-spacer>
        
        <v-toolbar-items class="hidden-sm-and-down">
            
            <template v-if="loggedInUser">
              <div class="flex align-stretch relative">
                <v-btn flat @click="showNotifications = !showNotifications">messages</v-btn>

                <notifications v-show="showNotifications" 
                                :notifications="notifications"
                                @deleteNotification="deleteFromUi($event)"></notifications>
              </div>
              

              <v-btn flat @click="moveTo('upload')">upload</v-btn>

              <div class="flex align-center relative">
                <v-avatar class="user-menu-icon" @click="showUserMenu = !showUserMenu">
                  <img :src="loggedInUser.img" :alt="loggedInUser.nickName">
                </v-avatar>
              
                <ul v-show="showUserMenu" class="user-menu elevation-4">
                  <li><b>hello {{loggedInUser.nickName}}</b></li>
                  <li><v-btn flat @click="moveTo('profile/'+loggedInUser._id)">profile</v-btn></li>
                  <li><v-btn flat @click="logout()">logout</v-btn></li>
                </ul>
              </div>

            </template>

            <template v-else>
              <v-btn flat @click.native="moveTo('register')">sign up</v-btn>
              <v-btn flat @click.native="moveTo('login')"> login</v-btn>
            </template>

        </v-toolbar-items>
      </v-toolbar>

    </section>
</template>

<script>
import { USER_ACTIONS } from '@/store/UserStore.js';
import SearchForm from './app-header/SearchForm.vue';
import NotificationService from '@/services/NotificationService.js';
import Notifications from './app-header/Notifications.vue';

export default {
  data() {
    return {
      notifications: null,
      showNotifications: false,
      showUserMenu: false
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },
    isBrowseProducts() {
      const route = this.$route.path;
      return route !== '/browseProducts';
    },
    isHomePage() {
      const route = this.$route.path;
      return route === '/';
    }
  },
  watch: {
    loggedInUser() {
      console.log(this.notifications);
      if (this.loggedInUser) {
        console.log(this.notifications);
        NotificationService.query(this.loggedInUser._id).then(notifications => {
          this.notifications = notifications.reverse();
          console.log(this.notifications);
        });
      }
    }
  },
  methods: {
    moveTo(route) {
      const prevRoute = this.$route.path;
      const nextRoute = '/' + route;

      if (prevRoute !== nextRoute) {
        this.$router.push(nextRoute);
      }
    },
    logout() {
      this.showUserMenu = false;
      this.showNotifications = false;
      this.$store.dispatch({ type: USER_ACTIONS.LOGOUT }).then(() => {
        this.$router.push('/login');
      });
    },
    deleteFromUi(idx) {
      this.notifications.splice(idx, 1);
    }
  },
  components: {
    Notifications,
    SearchForm
  }
};
</script>

<style>
@font-face {
  font-family: JosefinSans;
  src: url('../../../public/css/font/JosefinSans-Bold.ttf');
}
.logo,
.logo-icon {
  color: #4cb5ab;
}
.logo-icon {
  margin-left: 30px;
}
.logo {
  font-family: JosefinSans;
  margin-right: 20px;
}
.margin-bottom {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
}
.user-menu-icon:hover {
  cursor: pointer;
}
.user-menu {
  position: absolute;
  background: white;
  border-radius: 5px;
  width: 150px;
  top: 80px;
  left: -100px;
  padding: 10px;
}
.user-menu li {
  padding: 5px;
}
</style>