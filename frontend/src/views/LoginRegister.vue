
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

export default {
  data() {
    return {
      isShowRegister: false,

      loginData: {
        email: 'asafshpigler@gmail.com',
        password: 1234
      },
      wrongCredentials: false
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
        })
        .catch(()=> {
          this.wrongCredentials = true;
          setTimeout(()=>{this.wrongCredentials = false}, 2000);
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
  padding: 0 10px;
  background: whitesmoke;
}

.md-button.login-btn {
  background-color: lightgreen;
  width: 100%;
}
</style>

