<template>
  <section v-show="!isHome" class="app-header">
    <v-toolbar :class="{'margin-bottom': isMarginBottom}" :clipped-left="true" :height="64">
          
      <div class="hover-pointer-container">
        <i class="far fa-handshake fa-3x logo-icon"></i> 
        <v-toolbar-title @click="moveTo('')" class="display-1 logo">Polka</v-toolbar-title>
      </div>
      <search-form></search-form>

      <v-spacer></v-spacer>
      
      <v-toolbar-items>
          
          <template v-if="loggedInUser">
            <div class="flex align-stretch relative">
              <v-btn flat @click="toggleNotifications()">messages 
                <span class="new-notifications" :class="{ pulse: largeNotificationBadge }" 
                      v-if="newNotificationCount">
                  {{newNotificationCount}}
                </span>
              </v-btn>

              <notifications v-show="showNotifications" 
                              :notifications="notifications"
                              @deleteNotification="deleteNotification($event)"
                              @removeNotificationFromUi="removeNotificationFromUi($event)"></notifications>
            </div>
            
            <v-btn flat @click="moveTo('upload')">upload</v-btn>

            <div class="flex align-center relative margin-left">
              <div class="user-menu-icon" 
                    @click="toggleUserMenu()"
                    :style="{ 'backgroundImage': `url(${loggedInUser.img})` }">
              </div>
            
              <ul v-show="showUserMenu" class="user-menu clean-list elevation-4">
                <li><b>hello {{loggedInUser.nickName}}</b></li>
                <li><v-btn flat @click="moveTo('profile/'+loggedInUser._id)">profile</v-btn></li>
                <li><v-btn flat @click="logout()">logout</v-btn></li>
              </ul>
            </div>

          </template>

          <template v-else>
            <v-btn flat @click.native="moveTo('login')">login / register</v-btn>
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
import EventBusService, { EVENTS } from '../../services/EventBusService';

export default {
  created() {
    EventBusService.$on(EVENTS.RETURN_REMOVED_NOTIFICATION, () => {
      const idx = this.lastRemovedNotification.idx;
      const notification = this.lastRemovedNotification.notification;

      setTimeout(() => {
        this.notifications.splice(idx, 0, notification);
      }, 300);
    });
    
    EventBusService.$on(EVENTS.CLOSE_NOTIFICATIONS, () => {
      this.showNotifications = false;
    });
  },
  sockets: {
    emitGetNotifications() {
      NotificationService.query(this.loggedInUser._id).then(notifications => {
        this.notifications = notifications.reverse();
        ('notification', this.notifications);
      });
    }
  },
  data() {
    return {
      notifications: null,
      showNotifications: false,
      showUserMenu: false,
      lastRemovedNotification: null,
      largeNotificationBadge: null,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },
    isMarginBottom() {
      const route = this.$route.path;
      return route !== '/' && !route.startsWith('/product') && !route.startsWith('/profile') ; 
    },
    isHome() {
      const route = this.$route.path;
      return route === '/';
    },
    newNotificationCount() {
      if (!this.notifications) return;

      let count = 0;
      this.notifications.forEach(notification => {
        if (!notification.isViewed) count++;
      });
      return count;
    }
  },
  watch: {
    loggedInUser() {
      if (this.loggedInUser) {
        NotificationService.query(this.loggedInUser._id).then(notifications => {
          this.notifications = notifications.reverse();
        });
      }
    },
    notifications(newVal, oldVal) {
      if (oldVal && newVal.length > oldVal.length) {
        this.largeNotificationBadge = true;
        setTimeout(()=>{this.largeNotificationBadge=false}, 500)
      }
    },
    showNotifications(newVal) {
      if (newVal) {
        const notificationsToUpdate = [];

        this.notifications.forEach(notification => {
          if (!notification.isViewed) {
            notification.isViewed = true;
            notificationsToUpdate.push(notification);
          }
        });

        if (notificationsToUpdate.length > 0) {
          NotificationService.setViewed(notificationsToUpdate, this.loggedInUser._id).then(() => {
            ('has been set viewed');
          })
        }
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
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
      if (this.showNotifications) this.showNotifications = false;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showUserMenu) this.showUserMenu = false;
      
    },
    logout() {
      this.showUserMenu = false;
      this.showNotifications = false;
      this.$store.dispatch({ type: USER_ACTIONS.LOGOUT }).then(() => {
        this.$router.push('/login');
      });
    },
    removeNotificationFromUi(idx) {
      this.lastRemovedNotification = {
        idx,
        notification: this.notifications.splice(idx, 1)[0]
      };
    },
    deleteNotification({ idx, notification }) {
      this.notifications.splice(idx, 1);
      NotificationService.remove(notification);
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

.hover-pointer-container {
  display: flex;
}

.hover-pointer-container:hover {
  cursor: pointer;
}

.logo,
.logo-icon {
  color: #4cb5ab;
}

.logo {
  font-family: JosefinSans;
  margin-right: 20px;
}

.margin-bottom {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 30px;
}

.user-menu-icon {
  height: 48px;
  width: 48px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
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
.margin-left {
  margin-left: 18px;
}
.new-notifications {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  transition: transform .3s;
}
.pulse {
  transform: scale(1.2);
}

/* // responsive drawer */

/* .toolbar__items {
  background: white;
  position: absolute;
  z-index: -1;
  top: 65px;
  left: 0;
  height: calc(100vh - 64px);
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 
              0 4px 5px 0 rgba(0, 0, 0, 0.14), 
              0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.toolbar__items *:not(.user-menu-icon):not(.notifications-container):not(.new-notifications) {
  padding: 10px 0;
  height: initial;
  width: 100%;
  flex-grow: 0;
}
.notifications-container {
  position: absolute;
  overflow-y: scroll;
  background: white;
  border-radius: 5px;
  height: 300px;
  width: 400px;
  /* top: 80px; */
  /* transform: translateX(-50%); */
  /* left: calc(100% + 12px); */
/* } */
</style>