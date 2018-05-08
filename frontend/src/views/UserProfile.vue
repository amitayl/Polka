
<template>
<section class="container">
    <div v-if="true" class="nav-profile  has-addons is-grouped"> 
      
        <label class="button" :class="{active: selectedRadio==='profile'   }" >
          Public Profile<input type="radio" @click=changeComponent  value="profile" hidden>
        </label>
        <label class="button" :class="{active: selectedRadio==='bids'  }" >
          Bids<input type="radio" @click=changeComponent  value="bids" hidden>
        </label>
        <label class="button" :class="{active: selectedRadio==='products'  }" >
          Products<input type="radio" @click=changeComponent  value="products" hidden>
        </label>
      </div>
      
      <public-profile v-if="(selectedRadio==='profile')" :user="profileUser"></public-profile> 
      <products v-if="selectedRadio==='products'"></products>
  </section>
</template>

<style>
.button {
  width: 33%;
    opacity:0.8
}
.nav-profile{
  margin-bottom: 100px;
}
.active {
  background-color: rgb(217, 222, 241);
}
</style>
<script>
import PublicProfile from "../components/PublicProfile.vue";
import Products from "../components/Products.vue";
import UserService from "../services/UserService";
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
      selectedRadio: 'profile'
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
    if (this.loggedInUser.id === userId) {
      this.profileUser = this.loggedInUser;
      console.log ('kk'  ,  this.profileUser , 'bb' , this.loggedInUser )
      this.isUserEqualLoggidIn = true;
    } else {
      UserService.getUserById(userId)
      .then(user => (this.profileUser = user));
      this.isUserEqualLoggidIn = false;
      console.log ('kk'  ,  this.profileUser , 'bb' , this.loggedInUser )
      console.log("get user");
      console.log("logged in ttt", this.loggedInUser, "userId", userId);

      console.log("koko");
    }
    
  },
  
  components: {
    PublicProfile,
    Products,
  }
};

// @ is an alias to /src
</script>
