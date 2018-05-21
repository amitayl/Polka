<template>
  <section>
    <template v-if="isLoggedInUserProfile">

      <v-tabs
        v-model="active"
        centered
        grow
        color="teal lighten-3"
        slider-color="amber lighten-4">

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

          <component :is="cmp" v-if="profileUser" :user="profileUser"></component>
        </v-tab-item>

      </v-tabs>

    </template>

    <public-profile v-else-if="profileUser" :user="profileUser"></public-profile>
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
    if (this.isLoggedInUserProfile) {
      this.profileUser = this.loggedInUser;
    } else {
      const userId = this.$route.params._id;
      UserService.getUserById(userId).then(user => {
        this.profileUser = user;
      })
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },
    isLoggedInUserProfile() {
      const userId = this.$route.params._id;
      return this.loggedInUser && this.loggedInUser._id === userId
    }
  },
  components: {
    PublicProfile,
    Bids,
    Products
  }
};
</script>