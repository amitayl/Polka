
<template>
<section class="container">
    <div v-if="true" class="nav-profile  has-addons is-grouped"> 
      
        <label class="button" :class="{active: selectedRadio==='profile'   }" >
          Public Profile<input type="radio" @click=changeComponent  value="profile" hidden>
        </label>
        <label class="button" :class="{active: selectedRadio==='bids'  }" >
          Bids<input type="radio" @click=changeComponent  value="bids" hidden>
        </label>
        <label class="button" :class="{active: selectedRadio==='offers'  }" >
          Offers<input type="radio" @click=changeComponent  value="offers" hidden>
        </label>
      </div>
      
      <public-profile v-if="(selectedRadio==='profile')" :user="profileUser"></public-profile> 
      <offers v-if="selectedRadio==='offers'"></offers>
  </section>
</template>

<style>
.button {
  width: 33%;
  opacity: 0.8;
}
.nav-profile {
  margin-bottom: 100px;
}
.active {
  background-color: rgb(217, 222, 241);
}
</style>
<script>
import PublicProfile from '@/cmps/user-profile/PublicProfile.vue';
import Offers from '@/cmps/user-profile/Offers.vue';
import UserService from '@/services/UserService';
export default {
  data() {
    return {
      loggedInUser: {},
      profileUser: {},
      isUserEqualLoggidIn: false,
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
      this.isUserEqualLoggidIn = true;
    } else {
      UserService.getUserById(userId).then(user => (this.profileUser = user));
      this.isUserEqualLoggidIn = false;
    }
  },

  components: {
    PublicProfile,
    Offers
  }
};

// @ is an alias to /src
</script>
