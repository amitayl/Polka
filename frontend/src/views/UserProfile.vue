
<template>
<div class="container">
  user profile
<div v-if="isUserEqualProfile" class="buttons has-addons is-grouped"> 
 <input  @click=changeComponent is-selected class="button" name="koko" value="public profile">
 <input  @click=changeComponent is-selected class="button" name="koko" value="Bids"> 
  <input  @click=changeComponent class="button" name="koko" value="Offers ">
  </div>
  <public-profile :user="userSelected"></public-profile>
  </div>
</template>


<style>
/* label {
    appearance:button;
  }
  .radio-button{
   visibility: hidden;
  } */

/* input:focus {
  ;
} */
input.button {
  /* display:inline-block;
    width:1000px; */
  width: 33%;
}
</style>
<script>
import PublicProfile from '../components/PublicProfile.vue'
export default {
  data() {
    return {
      currUser: {},
      userSelected:{},
      isUserEqualProfile: false,
      userWatched: {
        productId: "",
        name: "",
        desc: "",
        img: "",
        feedbacks: [{ rating, desc }]
        //including its products
      }
    };
  },
  methods: {
    changeComponent(ev) {
      console.log("ev", ev);
      console.log("ev.target.value", ev.target.value);
    }
  },
  created() {
    console.log ('zzz');
    this.currUser = this.$store.getters.getCurrUser;
    this.userSelected = this.$store.getters.getUserSelected
    console.log ('currUser' , this.currUser);
     this.isUserEqualProfile = this.$store.getters.userSelected === currUser;
  },
  components:{
    PublicProfile,
  }
};

// @ is an alias to /src
</script>
