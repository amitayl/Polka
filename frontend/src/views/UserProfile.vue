<template>
<section class="container">
    <!-- <div v-if="true" class="nav-profile  has-addons is-grouped"> 
      <label :class="{active  : selectedRadio==='profile'   }" >
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
      <v-toolbar v-if="isUserEqualLoggidIn"
        color="grey"
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
            v-for="(str, idx) in ['profile','bids', 'products']"
            :key="str"
            @click.native="frameIdx = idx , printframeIdx "
          >
            {{str}}
          </v-tab>
        </v-tabs>
      </v-toolbar>
    </div>
      
     <public-profile v-if="profileUser && frameIdx == 0" :isUserEqualLoggidIn="isUserEqualLoggidIn"  :user="profileUser"></public-profile>  
    <bids :user="profileUser" v-if="frameIdx == 1 && profileUser"></bids> 
    <products v-if="frameIdx == 2"></products> 
   
    
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
      frameIdx: 0,
      loggedInUser: {},
      profileUser: {},
      isUserEqualLoggidIn: false,
      // selectedRadio: 'profile',
      
    };
  },
  methods: {
    // changeComponent(ev) {
    //   this.selectedRadio = ev.target.value;
    // },
  },
  created() {
    
    
    console.log ('frameIdx' , this.frameIdx)
    const userId = this.$route.params._id;

    this.loggedInUser = this.$store.getters.getLoggedInUser;
    console.log ('this.loggedInUserkk' , this.loggedInUser);
    if (this.loggedInUser && (this.loggedInUser._id === userId)) {
     this.profileUser = this.loggedInUser;
      console.log ( 'profile' , this.profileUser);
     this.isUserEqualLoggidIn = true;
    } else {
      console.log ('momo');
      UserService.getUserById(userId).then(user => {
        this.profileUser = user;
        
        
      }).catch (err => console.log('no user'))
      
      this.isUserEqualLoggidIn = false;
    }
  },
  methods: {
    printframeIdx () {
      console.log (this.frameIdx)
    }

  },
  computed:{
  //  loggedInUser (){
  //    return this.$store.getters.getLoggedInUser; 
  //  }
      

      
},

  components: {
    PublicProfile,
    Bids,
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