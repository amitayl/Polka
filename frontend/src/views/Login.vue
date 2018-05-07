<template>
  <div class="login">
    <form class="login-form" @submit.prevent="checkLogin()">
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
  </div>
</template>

<script>
import { USER_ACTIONS } from '../store/UserStore.js';

export default {
  data() {
    return {
      loginData: {
        email: 'asafshpigler@gmail.com',
        password: 1234
      }
    };
  },
  methods: {
    checkLogin() {
      const loginData = this.loginData;
      this.$store
        .dispatch({ type: USER_ACTIONS.CHECK_LOGIN, loginData })
        .then(() => {
          this.$router.push('/browseProducts');
        });
    }
  }
};
</script>

<style>
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

