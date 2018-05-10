<template>
    <section class="notifications" @click="stopPropogation">
        <ul class="notifications-container md-elevation-2">
          <li v-if="notifications.length > 0" v-for="(notification, idx) in notifications" :key="idx">
            <component :is="notification.type" 
                       :data="notification.bid"
                       @deleteNotification="$emit('deleteNotification', idx)"></component>
          </li>
        </ul>   
    </section>
</template>

<script>
import NewBid from './msgs/NewBid.vue';
import AcceptedBid from './msgs/AcceptedBid.vue';
import DeclinedBid from './msgs/DeclinedBid.vue';

export default {
  props: {
    notifications: {
      required: true
    }
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

<style scoped>
.notifications:hover {
  cursor: initial;
}

.notifications-container {
  position: absolute;
  overflow-y: scroll;
  background: white;
  border-radius: 5px;
  height: 300px;
  width: 400px;
  top: 100px;
  right: -410px;
}

@media (min-width: 1100px) {
  .notifications-container {
    transform: translate(calc(-50% + 50px));
    right: 0;
  }
}

.notifications-container::-webkit-scrollbar-button {
  display: none;
  height: 13px;
  border-radius: 0px;
  background-color: #aaa;
}
.notifications-container::-webkit-scrollbar-button:hover {
  background-color: #aaa;
}
.notifications-container::-webkit-scrollbar-thumb {
  background-color: #d8d8d8;
  border-radius: 10px;
}
.notifications-container::-webkit-scrollbar-thumb:hover {
  background-color: #bfbfbf;
}
.notifications-container::-webkit-scrollbar-track {
  background-color: #f6f6f6;
}
.notifications-container::-webkit-scrollbar-track:hover {
  background-color: #f1f1f1;
}
.notifications-container::-webkit-scrollbar {
  width: 10px;
}
</style>