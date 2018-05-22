<template>
  <section class="link-list">
    <template v-if="loggedInUser">

      <template v-if="isMobile">
        <v-btn flat @click="logout()">logout</v-btn>
      </template>

      <v-btn flat @click="moveTo('upload')">upload</v-btn>
      
      <div :class="{'messages-container': isMobile}">
        <v-btn flat @click="toggleNotifications()">
          messages 
        <span 
          class="new-notifications" 
          :class="{ pulse: largeNotificationBadge }" 
          v-if="newNotificationCount">
          {{newNotificationCount}}
        </span>
        </v-btn>

        <notifications 
          v-show="showNotifications" 
          :notifications="notifications"
          @deleteNotification="deleteNotification($event)"
          @removeNotificationFromUi="removeNotificationFromUi($event)">
        </notifications>
      </div>

      <div 
        class="flex align-center relative"
        :class="{'margin-left': !isMobile}">
        <div 
          v-if="isMobile"
          class="mobile-user-info" 
          @click="moveTo('profile/'+loggedInUser._id)">
          <div class="flex">
            <div 
              class="user-menu-icon" 
              :style="{ 'backgroundImage': `url(${loggedInUser.img})` }">
            </div>
            <b class="headline ml-4 flex align-center capitalize">{{loggedInUser.nickName}}</b>
          </div>
        </div>

        <template v-else>
          <div 
            class="user-menu-icon" 
            @click="toggleUserMenu()"
            :style="{ 'backgroundImage': `url(${loggedInUser.img})` }">
          </div>
      
          <ul 
            v-show="showUserMenu" 
            class="user-menu clean-list elevation-4">
            <li><b>hello {{loggedInUser.nickName}}</b></li>
            <li>
              <v-btn flat @click="moveTo('profile/'+loggedInUser._id)">
                profile
              </v-btn>
            </li>
            <li><v-btn flat @click="logout()">logout</v-btn></li>
          </ul>
        </template>
      </div>
    </template>

    <template v-else>
      <v-btn flat @click.native="moveTo('login')">login / register</v-btn>
    </template>
  </section>
</template>

<script>
import NotificationService from '@/services/NotificationService.js';
import Notifications from './Notifications.vue';
import EventBusService, { EVENTS } from '@/services/EventBusService';
import { USER_ACTIONS } from '@/store/UserStore.js';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
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
        'notification', this.notifications;
      });
    }
  },
  data() {
    return {
      notifications: null,
      showNotifications: false,

      showUserMenu: false,
      lastRemovedNotification: null,
      largeNotificationBadge: null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
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
        setTimeout(() => {
          this.largeNotificationBadge = false;
        }, 500);
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
          NotificationService.setViewed(
            notificationsToUpdate,
            this.loggedInUser._id
          ).then(() => {
            ('has been set viewed');
          });
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
      this.showUserMenu = !this.showUserMenu;
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
    Notifications
  }
};
</script>

<style scoped>
.link-list {
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
}
.link-list .btn {
  margin: 0;
  height: 50px;
}
@media (min-width: 900px) {
  .link-list .btn {
    margin: 0;
    height: 50px;
  }
}
.link-list .btn.btn__content {
  padding: 60px 0;
}
.messages-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.user-menu-icon {
  height: 48px;
  width: 48px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.user-menu {
  border-radius: 5px;
  padding: 10px;
}
.user-menu li {
  padding: 5px;
}
@media (min-width: 900px) {
  .user-menu-icon:hover {
    cursor: pointer;
  }
  .user-menu {
    position: absolute;
    z-index: 2;
    background: white;
    width: 150px;
    top: 80px;
    left: -100px;
  }
  .user-menu li {
    padding: 0;
  }
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
  transition: transform 0.3s;
}
.pulse {
  transform: scale(1.2);
}
.mobile-user-info {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid lightgray;
}
.mobile-user-info:hover {
  cursor: pointer;
  background-color: #e6e8ea;
}
@media (min-width: 900px) {
  .link-list {
    flex-direction: row;
  }
}
</style>