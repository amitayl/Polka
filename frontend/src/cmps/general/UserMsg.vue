<template>
    <section class="user-msg" 
             :class="{show: displayUserMsg, 
                      success: success,
                      danger: !success}">
        <h3 class="subheading">{{title}}</h3>
        <span class="subheading">{{desc}}</span>
    </section>
</template>

<script>
import EventBusService, { EVENTS } from '../../services/EventBusService.js';

export default {
  created() {
    EventBusService.$on(
      EVENTS.DISPLAY_USER_MSG,
      ({ title, desc, success = true }) => {
        this.title = title;
        this.desc = desc;
        this.success = success;

        this.displayUserMsg = true;
        setTimeout(() => {
          this.displayUserMsg = false;
        }, 2000);
      }
    );
  },
  data() {
    return {
      displayUserMsg: false,
      title: '',
      desc: '',
      success: true
    };
  }
};
</script>

<style scoped>
.user-msg {
  opacity: 0;
  position: absolute;
  z-index: -1;
  top: 20px;
  right: 20px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px 20px;
  background: white;
  text-align: left;
  transition: opacity 0.3s;
}
.user-msg.show {
  z-index: 4;
  opacity: 0.9;
}
.success {
  border: 2px solid lightseagreen;
}
.danger {
  border: 2px solid lightcoral;
}
h3 {
  font-weight: bold;
}
h3::first-letter, span::first-letter {
  text-transform: capitalize;
}
</style>
