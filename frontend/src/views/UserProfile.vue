<template>
<section class="container">
    <!-- <div v-if="true" class="nav-profile  has-addons is-grouped"> 
      <label :class="{active: selectedRadio==='profile'   }" >
        Public Profile<input type="radio" @click="changeComponent"  value="profile" hidden>
      </label>
      <label class="button" :class="{active: selectedRadio==='bids'  }" >
        Bids<input type="radio" @click="changeComponent"  value="bids" hidden>
      </label>
      <label class="button" :class="{active: selectedRadio==='products'  }" >
        Products<input type="radio" @click="changeComponent"  value="products" hidden>
      </label>
    </div> -->

    <div>
      <v-toolbar
        color="white"
        dark
        tabs
      >
        <v-tabs
          v-model="frameIdx"
          centered
          slider-color="red lighten-2"
          color="transparent"
        >
          <v-tab
            v-for="(str, idx) in ['profile', 'bids', 'products']"
            :key="str"
            @click.native="frameIdx = idx"
          >
            {{str}}
          </v-tab>
        </v-tabs>
      </v-toolbar>
    </div>
      
    <public-profile v-if="frameIdx === 0" :user="profileUser"></public-profile> 
    <products v-else-if="frameIdx === 2"></products>
  </section>
</template>

<script>
import UserService from '@/services/UserService';
import PublicProfile from '@/cmps/user-profile/PublicProfile.vue';
import Products from '@/cmps/user-profile/Products.vue';

export default {
  data() {
    return {
      loggedInUser: {},
      profileUser: {},
      isUserEqualLoggidIn: false,
      // selectedRadio: 'profile',
      frameIdx: 0
    };
  },
  methods: {
    // changeComponent(ev) {
    //   this.selectedRadio = ev.target.value;
    // },
  },
  created() {
    const userId = this.$route.params._id;
    this.loggedInUser = this.$store.getters.getLoggedInUser;
    if (this.loggedInUser._id === userId) {
      this.profileUser = this.loggedInUser;
      this.isUserEqualLoggidIn = true;
    } else {
      UserService.getUserById(userId).then(user => {
        this.profileUser = user;
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

<style>
/* .button {
  width: 33%;
  opacity: 0.8;
}
.nav-profile {
  margin-bottom: 100px;
}
.active {
  background-color: rgb(217, 222, 241);
} */
</style>