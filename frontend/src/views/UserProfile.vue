
<template>
<section class="container">
  user profile
<div v-if="true" class="buttons has-addons is-grouped"> 
  
  <label class="button" :class="{active: selectedRadio==='profile'  }" >
    Public Profile<input type="radio" @click=changeComponent  value="profile" hidden>
  </label>
  <label class="button" :class="{active: selectedRadio==='bids'  }" >
    Bids<input type="radio" @click=changeComponent  value="bids" hidden>
  </label>
  <label class="button" :class="{active: selectedRadio==='offers'  }" >
    Offers<input type="radio" @click=changeComponent  value="offers" hidden>
  </label>
   
  <public-profile  :user="profileUser"></public-profile> 
  <offers></offers>
  </div>
  </section>
  
</template>

<style>
.button {
  width: 33%;
}
.active {
  background-color: green;
}
</style>
<script>
import PublicProfile from "../components/PublicProfile.vue";
import Offers from "../components/Offers.vue";
import UserService from '../services/UserService';
export default {
  data() {
    return {
      loggedInUser: {},
      profileUser: {},

      isUserEqualLoggidIn: false,
      // userWatched: {
      //   productId: "",
      //   name: "",
      //   desc: "",
      //   img: "",
      //   feedbacks: [{ rating, desc }]
      //   //including its products
      // },
      selectedRadio: null
    };
  },
  methods: {
    changeComponent(ev) {
      this.selectedRadio = ev.target.value;
    }
  },
  created() {
    const userId = this.$route.params._id;
    
    this.loggedInUser = this.$store.getters.getLoggedInUser;
    if (this.loggedInUser.id === userId ){
        this.profileUser = loggedInUser;
      isUserEqualLoggidIn = true;
    }
    else{
      
      UserService.getUserById(userId).
      then(user=> this.profileUser=user)
      isUserEqualLoggidIn = false;
      console.log ('get user');
      console.log ('logged in'  , loggedInUser.id , 'userId' ,userId )
       
      console.log ('koko');
    }
    this.selectedUser = this.$store.getters.getSelectedUser;
    console.log("loggedinUser", this.loggedInUser);
    this.isUserEqualProfile =
      this.$store.getters.getSelectedUser === this.loggedInUser;
  },
  components: {
    PublicProfile,
    Offers
  }
  
}

// @ is an alias to /src
</script>
