<template>
  <div class="register">

    <v-form class="add-user-form" @submit.prevent="addUser()">
      <v-text-field
        v-model="userData.email"
        :rules="emailRules"
        :counter="10"
        label="Email"
        autofocus
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.password"
        :append-icon="visiblePass ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (visiblePass = !visiblePass)"
        :type="visiblePass? 'text' : 'password'"
        label="Enter your password"
        hint="At least 8 characters"
        min="8"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.confirmPassword"
        :append-icon="visibleConfirmPass ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (visibleConfirmPass = !visibleConfirmPass)"
        :type="visibleConfirmPass? 'text' : 'password'"
        label="Enter your password"
        hint="At least 8 characters"
        min="8"
        required
      ></v-text-field>
      
      <v-text-field
        v-model="userData.nickName"
        :rules="[()=>true]"
        min="4"
        label="Nickname"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.desc"
        :rules="[()=>true]"
        label="Tell us about yourself"
        required
      ></v-text-field>

      <upload-img @uploadImg="addImg"></upload-img>

      <div class="flex">
        <v-spacer></v-spacer>
        <v-btn type="submit">sign up</v-btn>
      </div>

    </v-form>
  </div>
</template>

<script>
import { USER_ACTIONS } from '../store/UserStore.js';
import UploadImg from '@/cmps/product-upload/UploadImg';
import EventBusService, { EVENTS } from '../services/EventBusService';

export default {
  data() {
    return {
      visiblePass: false,
      visibleConfirmPass: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      userData: {
        email: 'asafshpigler@gmail.com',
        password: '1234',
        confirmPassword: '1234',
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

      if (userData.password !== userData.confirmPassword) {
        EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
          title: 'whoops',
          desc: 'passwords should match',
          success: false
        });
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
  padding: 20px;
  background: whitesmoke;
}
</style>
