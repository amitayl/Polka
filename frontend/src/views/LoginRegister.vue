
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
    
    <login v-if="!isShowRegister" :route="true"></login>
    <register v-if="isShowRegister"></register>

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

