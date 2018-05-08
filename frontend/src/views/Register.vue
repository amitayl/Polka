<template>
  <div class="register">
    <form class="add-user-form" @submit.prevent="addUser()">
      <md-field>
        <label>email</label>
        <md-input v-model="userData.email" type="email" required></md-input>
      </md-field>

      <md-field>
        <label>password</label>
        <md-input v-model.number="userData.password" type="password" required></md-input>
      </md-field>

      <md-field>
        <label>confirm password</label>
        <md-input v-model.number="userData.confirmPassword" type="password" required></md-input>
      </md-field>

      <!-- <md-button>upload img</md-button> -->
      <upload-img @uploadImg="addImg"></upload-img>

      <md-field>
        <label>nickName</label>
        <md-input v-model="userData.nickName"></md-input>
      </md-field>

      <md-field>
        <label>tell us a bit about yourself</label>
        <md-textarea v-model="userData.desc" type="text"></md-textarea>
      </md-field>

      <!-- <md-field>
        <label>Location</label>
        <md-input v-model.number="userData.confirmPassword" type="text" required></md-input>
      </md-field> -->

      <md-button class="register-btn" type="submit">go</md-button>
    </form>
  </div>
</template>

<script>
import GPlacesService from '../services/GPlacesService.js';
import { USER_ACTIONS } from '../store/UserStore.js';
import UploadImg from '@/cmps/product-upload/UploadImg';

export default {
  data() {
    return {
      userData: {
        email: 'asafshpigler@gmail.com',
        password: 1234,
        confirmPassword: 1234,
        img: 'https://bit.ly/2rlMMSN',
        nickName: 'John',
        desc: 'I am just a regular everyday normal guy (or girl)',
        coords: null
      }
    };
  },
  methods: {
    addUser() {
      const userData = this.userData;

      if (userData.password !== userData.password) {
        console.log('pass doesnt match');
      } else {
        delete userData.confirmPassword;
        this.$store
          .dispatch({ type: USER_ACTIONS.ADD_USER, userData })
          .then(user => {
            this.$router.push('/browseProducts');
          });
      }
    },
    addImg(urlPath) {
      this.userData.img = urlPath;
    }
  },
  components: {
    UploadImg
  }
};
</script>

<style>
.add-user-form {
  margin: 0 auto;
  width: 500px;
  padding: 0 10px;
  background: whitesmoke;
}

.md-button.register-btn {
  background-color: lightgreen;
  width: 100%;
}
</style>
