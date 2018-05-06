
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
   
  <public-profile  :user="userSelected"></public-profile> 
  <offers></offers>
  </div>
  </section>
  
</template>

<style>

.button {
  width: 33%;
}
.active {
  background-color:green;
}
</style>
<script>
import PublicProfile from '../components/PublicProfile.vue'
import Offers from '../components/Offers.vue'
export default {
  data() {
    return {
      loggedInUser: {},
      selectedUser:{},
      isUserEqualProfile: false,
      // userWatched: {
      //   productId: "",
      //   name: "",
      //   desc: "",
      //   img: "",
      //   feedbacks: [{ rating, desc }]
      //   //including its products
      // },
      selectedRadio:null
    };
  },
  methods: {
    changeComponent(ev) {
      console.log("ev", ev);
      console.log("ev.target.value", ev.target.value);
      selectedRadio=ev.target.value;
    },
    func (ev){
      console.log("ev.target.value", ev.target.value);
    }
  },
  created() {
    console.log ('zzz');
    this.loggedInUser = this.$store.getters.getLoggedInUser;
    this.userSelected = this.$store.getters.getSelectedUser
    console.log ('loggedinUser' , this.loggedInUser);
     this.isUserEqualProfile = this.$store.getters.getSelectedUser=== this.loggedInUser;
  },
  components:{
    PublicProfile,
    Offers
  }
};

// @ is an alias to /src
</script>
