<template>
  <div class="register">

    <v-form class="grey-form" @submit.prevent="addUser()">
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
        hint="create as weak a password as you like"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.confirmPassword"
        :append-icon="visibleConfirmPass ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (visibleConfirmPass = !visibleConfirmPass)"
        :type="visibleConfirmPass? 'text' : 'password'"
        label="Enter your password"
        required
      ></v-text-field>

      <v-divider></v-divider>

      <upload-img @uploadImg="addImg" :imgs="[userData.img]" :round="true"></upload-img>
      
      <v-text-field
        v-model="userData.nickName"
        :rules="[()=>true]"
        label="Nickname"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.desc"
        :rules="[()=>true]"
        label="Tell us about yourself"
        required
      ></v-text-field>

      <get-place @selectedPlace="setPlace($event)"></get-place>

      <h2 class="categories-picker-title subheading mb-2">
        What kind of items you like?
      </h2>

      <categories-picker 
        @selectedCategories="setSelectedCategories($event)">
      </categories-picker>
      
      <div class="flex">
        <v-spacer></v-spacer>
        <v-btn type="submit">sign up</v-btn>
      </div>

    </v-form>
  </div>
</template>

<script>
import GetPlace from '@/cmps/LoginRegister/GetPlace';
import UploadImg from '@/cmps/product-upload/UploadImg';
import CategoriesPicker from '@/cmps/general/CategoriesPicker.vue';
import { USER_ACTIONS } from '@/store/UserStore.js';
import EventBusService, { EVENTS } from '@/services/EventBusService';

export default {
  data() {
    return {
      visiblePass: false,
      visibleConfirmPass: false,
      emailRules: [
        email => !!email || 'E-mail is required',
        email =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          'E-mail must be valid'
      ],
      userData: {
        email: 'asafshpigler@gmail.com',
        password: '1234',
        confirmPassword: '1234',
        img: 'https://bit.ly/2rlMMSN',
        nickName: 'John',
        desc: 'I am just a regular everyday normal guy (or girl)',
        loc: null,
        desiredCategories: null
      }
    };
  },
  methods: {
    addUser() {
      const userData = this.userData;

      const isUserFormFilled = 
        userData.email && 
        userData.password &&
        userData.confirmPassword &&
        userData.img && userData.img !== 'https://bit.ly/2rlMMSN';
        userData.nickName &&
        userData.desc &&
        userData.loc &&
        userData.desiredCategories && userData.desiredCategories.length > 0;

      if (!isUserFormFilled) {
        EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
          title: 'Wait a minute',
          desc: 'please fill out the entire form',
          success: false
        });
      } else if (userData.password !== userData.confirmPassword) {
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
          }).catch(err => {
            EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
              title: 'whoops',
              desc: err.response.data,
              success: false
            });
          })
      }
    },
    addImg(urlPath) {
      this.userData.img = urlPath;
    },
    setPlace(loc) {
      this.userData.loc = loc;
    },
    setSelectedCategories(categories) {
      this.userData.desiredCategories = categories;
    }
  },
  components: {
    UploadImg,
    GetPlace,
    CategoriesPicker
  }
};
</script>

<style>
img {
  width: 50px;
  height: 50px;

  margin-left: 0px;
  text-align: left;
}
.user-img {
  margin: 10px;
  text-align: left;
}
.categories-picker-title {
  text-align: left;
}
</style>
