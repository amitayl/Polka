<template>
  <section class="login">

    <v-form class="grey-form" @submit.prevent="checkLogin()">
      <v-text-field
        v-model="loginData.email"
        :rules="emailRules"
        :counter="10"
        label="Email"
        autofocus
        required
      ></v-text-field>

      <v-text-field
        v-model="loginData.password"
        :append-icon="visiblePass ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (visiblePass = !visiblePass)"
        :type="visiblePass? 'text' : 'password'"
        label="Enter your password"
        hint="At least 8 characters"
        min="8"
        required
      ></v-text-field>
      
      <div class="flex">
        <v-spacer></v-spacer>
        <v-btn type="submit">login</v-btn>
      </div>
    </v-form>
  </section>
</template>

<script>
import { USER_ACTIONS } from '../store/UserStore.js';

// import io from 'socket.io-client';
// import { SOCKET_MUTATIONS } from '../store/SocketStore.js';
import EventBusService, { EVENTS } from '../services/EventBusService';

export default {
  data() {
    return {
      loginData: {
        email: 'asafshpigler@gmail.com',
        password: '1234'
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      visiblePass: false,
    };
  },
  methods: {
    checkLogin() {
      this.$store
        .dispatch({ type: USER_ACTIONS.CHECK_LOGIN, loginData: this.loginData })
        .then(() => {
          this.$router.push('/browseProducts');
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'welcome',
            desc: 'did you miss me?'
          });

          /* -------------
          SOCKET STUFF
          ---------------*/

          // const loggedInUserId = this.$store.getters.getLoggedInUser._id;
          // emit to create name space of logged in user
          // this.$socket.emit('sendLoggedInUserId', loggedInUserId);

          // const loggedInUserSocket = io(
          //   'http://localhost:3000/' + loggedInUserId
          // );

          // // sign up to that name space
          // this.$store.commit({
          //   type: SOCKET_MUTATIONS.SET_SOCKET,
          //   loggedInUserSocket
          // });

          // // listen to product bidded
          // this.$store.commit({
          //   type: SOCKET_MUTATIONS.SET_LISTENER,
          //   eventName: 'productBidded',
          //   callback: p => {
          //     console.log(p);
          //   }
          // });
        })
        .catch(() => {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'oops',
            desc: 'wrong credentials, try again',
            success: false
          });
        });
    }
  }
};
</script>