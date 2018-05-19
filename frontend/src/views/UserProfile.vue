<template>
  <section>
    <v-tabs
      v-model="active"
      color="cyan"
      slider-color="yellow">

      <v-tab
        v-for="(str, idx) in 
              ['profile', 'products']" 
              :key="idx"
              ripple>
        {{str}}
      </v-tab>

      <v-tab-item
        v-for="(cmp, idx) in 
               ['public-profile', 'products']" 
               :key="idx">

        <component :is="cmp" v-if="profileUser && cmp !== 'products'" :user="profileUser"></component>
      </v-tab-item>

    </v-tabs>
  </section>
</template>

<script>

import UserService from '@/services/UserService';
import PublicProfile from '@/cmps/user-profile/PublicProfile.vue';
import Bids from '@/cmps/user-profile/Bids.vue';
import Products from '@/cmps/user-profile/Products.vue';

export default {
  data() {
    return {
      active: null,
      profileUser: null,
    };
  },
  created() {
    const userId = this.$route.params._id;

    if (this.loggedInUser && this.loggedInUser._id === userId) {
      this.profileUser = this.loggedInUser;
    } else {
      console.log ('momo');
      UserService.getUserById(userId).then(user => {
        this.profileUser = user;
      })
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    }
  },
  components: {
    PublicProfile,
    Bids,
    Products
  }
};
</script>