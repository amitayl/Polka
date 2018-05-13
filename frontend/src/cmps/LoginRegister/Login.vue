p<template>
  <section class="login container">
 <!-- <v-app id="inspire"> -->
    <!-- <form>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors" 
        
       
        label="Email"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        
      ></v-text-field>
       
      <v-text-field
        v-model="password"
        
        label="Password"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
        required
        
      ></v-text-field>

      <v-btn block  @click="submit"> submit</v-btn>

    </form> -->
  <!-- </v-app> -->
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
    <h2 v-if="wrongCredentials">wrong credentials, please try again</h2>
  </section>
</template>

<script>
import { USER_ACTIONS } from '../../store/UserStore.js';

export default {
  data() {
    return {
      loginData: {
        email: 'asafshpigler@gmail.com',
        password: 1234
      },
      wrongCredentials: false
    };
  },
  methods: {
    //    selectErrors () {
    //   const errors = []
    //   if (!this.$v.select.$dirty) return errors
    //   !this.$v.select.required && errors.push('Item is required')
    //   return errors
    // },
    // nameErrors () {
    //   const errors = []
    //   if (!this.$v.name.$dirty) return errors
    //   !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
    //   !this.$v.name.required && errors.push('Name is required.')
    //   return errors
    // },
    // emailErrors () {
    //   const errors = []
    //   if (!this.$v.email.$dirty) return errors
    //   !this.$v.email.email && errors.push('Must be valid e-mail')
    //   !this.$v.email.required && errors.push('E-mail is required')
    //   return errors
    // },
  
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
  }
}
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

