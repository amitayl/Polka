<template>
  <section 
    class="notifications-container elevation-4"
    :class="{
      'flex': notifications && notifications.length === 0,
      'flex-center': notifications && notifications.length === 0,
      }">

    <ul v-if="notifications && notifications.length > 0">
      <li v-for="(notification, idx) in notifications" :key="idx">
        <component :is="notification.type" 
                    :data="notification.bid"
                    @removeNotificationFromUi="$emit('removeNotificationFromUi', idx)"
                    @deleteNotification="$emit('deleteNotification', {idx, notification})"></component>
      </li>
    </ul>  

    <h2 v-else>
      No Messages yet <br/>
      Start Trading!
    </h2>
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

<style>
.notifications:hover {
  cursor: initial;
}

.notifications-container {
  overflow-y: scroll;
  background: whitesmoke;
  border-radius: 5px;
  height: 300px;
  width: 100%;
  max-width: 350px;
}

h2 {
  line-height: 40px;
}

@media (min-width: 900px) {
  .notifications-container {
    position: absolute;
    top: 80px;
    transform: translateX(-50%);
  }
}
.notifications-container::-webkit-scrollbar-button {
  display: none;
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