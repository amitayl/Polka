<template>
    <section>
        <ul class="link-list" :class="{ 'show-side-menu': showSideMenu }">

            <template v-if="isLoggedIn">
                <li @click="showNotifications = !showNotifications">
                    messages
                    <notifications v-show="showNotifications"></notifications>
                </li>

                <li @click="$emit('moveTo', 'upload')">upload</li>
                <li @click="moveToProfile()">profile</li>
                <li><button class="button" @click="logout()">logout</button></li>
            </template>


            <template v-else>
                <li @click="$emit('moveTo', 'register')">sign up</li>
                <li @click="$emit('moveTo', 'login')">login</li>
            </template>

        </ul>
    </section>
</template>

<script>
import { USER_ACTIONS } from '@/store/UserStore.js';
import Notifications from './Notifications.vue';

export default {
  props: {
    showSideMenu: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showNotifications: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getLoggedInUser;
    },
    logout() {
      this.$store.dispatch({ type: USER_ACTIONS.LOGOUT });
    }
  },
  methods: {
    moveToProfile() {
      const prevRoute = this.$route.path.substr(0, 7);
      const nextRoute = '/profile';

      if (prevRoute !== nextRoute) {
        const loggedInUserId = this.$store.getters.getLoggedInUser._id;
        this.$router.push(nextRoute + '/' + loggedInUserId);
        this.showSideMenu = false;
      }
    }
  },
  components: {
    Notifications
  }
};
</script>

<style>
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
  transition: transform 0.3s;
}
.link-list > li {
  font-size: 24px;
  line-height: 32px;
  border-bottom: 1px solid gray;
  padding: 10px 20px;
  text-align: left;
}
.link-list > li:first-of-type {
  border-top: 1px solid gray;
}
.link-list > li:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
.show-side-menu {
  transform: initial;
}
@media (min-width: 1100px) {
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
