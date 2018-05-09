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
import UserService from '@/services/UserService';
import PublicProfile from '@/cmps/user-profile/PublicProfile.vue';
import Offers from '@/cmps/user-profile/Offers.vue';
import Products from '@/cmps/user-profile/Products.vue';

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
    if (this.loggedInUser._id === userId) {
      this.profileUser = this.loggedInUser;
      this.isUserEqualLoggidIn = true;
    } else {
      UserService.getUserById(userId).then(user => {
        (this.profileUser = user)
      });
      this.isUserEqualLoggidIn = false;
    }
  },

  components: {
    PublicProfile,
    Products
  }
};
</script>