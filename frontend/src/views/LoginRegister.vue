
<template>
 <section class="login-register container"> 
  
       <v-tabs fixed-tabs grow dark slider-color="green">


    <v-tab @click="showRegiser(false)">
      Login
    </v-tab>
    <v-tab @click="showRegiser(true)">
      Regiter
    </v-tab>
    </v-tabs>
    
<login v-if="!isShowRegister"></login>
<register v-if="isShowRegister"></register>
    <!-- <form class="login-form" @submit.prevent="checkLogin()">
      <md-field>
        <label>email</label>
        <md-input v-model="loginData.email" type="email" required></md-input>
      </md-field>

      <md-field>
        <label>password</label>
        <md-input v-model.number="loginData.password" type="password" required></md-input>
      </md-field>

      <md-button class="login-btn" type="submit">login</md-button>
    </form>
    <h2 v-if="wrongCredentials">wrong credentials, please try again</h2> -->
  </section>
 </template> 

<script>
import Login from '@/cmps/LoginRegister/Login';
import Register from '@/cmps/LoginRegister/Register'
import { USER_ACTIONS } from '../store/UserStore.js';

// import io from 'socket.io-client';
import { SOCKET_MUTATIONS } from '../store/SocketStore.js';
import EventBusService, { EVENTS } from '@/services/EventBusService.js';

export default {
  data() {
    return {
      isShowRegister: false,

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
    showRegiser (bool){
      if (bool === false)  this.isShowRegister = false;
      else  this.isShowRegister = true;
    },
    
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
  },
  computed : {
  },
  components :{
    Login,
    Register
  }
};
</script>

<style>

.login-register{
  margin: 0 auto;
  width: 500px;
}
.login-form {
  margin: 0 auto;
  width: 500px;
  padding: 20px;
  background: whitesmoke;
}
</style>

