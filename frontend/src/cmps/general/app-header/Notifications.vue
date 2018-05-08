<template>
    <section class="notifications" @click="stopPropogation">
        <ul class="notifications-container md-elevation-2">
          <li v-if="notifications" v-for="(notification, idx) in notifications" :key="idx">
            <component :is="notification.type" :notification="notification.bid"></component>
          </li>
        </ul>   
    </section>
</template>

<script>
import NotificationService from '@/services/NotificationService.js';
import NewBid from './msgs/NewBid.vue';
import AcceptedBid from './msgs/AcceptedBid.vue';
import DeclinedBid from './msgs/DeclinedBid.vue';

export default {
  created() {
    const loggedInUserId = this.$store.getters.getLoggedInUser._id;
    NotificationService.query(loggedInUserId).then(notifications => {
      this.notifications = notifications;
    });
  },
  data() {
    return {
      notifications: null
    };
  },
  methods: {
    stopPropogation(event) {
      event.cancelBubble = true;
    }
  },
  components: {
    NewBid,
    AcceptedBid,
    DeclinedBid
  }
};
</script>

<style>
.notifications:hover {
  cursor: initial;
}

.notifications-container {
  position: absolute;
  background: white;
  border-radius: 5px;
  height: 400px;
  width: 400px;
  top: 100px;
  transform: translate(calc(-50% + 50px));
}
</style>