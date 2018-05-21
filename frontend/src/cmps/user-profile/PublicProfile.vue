<template>    
  <section class="public-profile ms-5">

    <v-card class="elevation-4">

      <div class="public-profile-avatar" 
        :style="{ 'backgroundImage': `url(${user.img})` }">
      </div>

      <v-card-title primary-title>
        <div>
          <h2 class="display-1 capitalize mb-2">{{user.nickName}}</h2>
          <p class="title" 
             :contenteditable="isEditMode"
             ref="desc">{{user.desc}}</p>

          <p class="title">
            <v-icon :size="40">location_on</v-icon>  
            {{user.loc.name}}
          </p>
        </div>
      </v-card-title>

    </v-card>

    <h2 class="deals-section-headline mt-4 display-1 mb-3">Deals</h2>
    <transaction-list></transaction-list>      

    <h2 class="deals-section-headline mt-4 display-1 mb-3">Reviews</h2>
    <review-list></review-list>

    <ul class="reviews">
        <li v-for="review in user.reviews" :key="review.txt">
            <img :src="user.img">
            <star-rating class="rating" :star-size="25" 
            :show-rating="false" read-only 
            :rating="review.rating"></star-rating>

            <p>{{review.txt}}</p>
        </li>
    </ul> 

    <v-btn v-if="isLoggedInUserProfile"
           @click.native="toggleEditMode()"
           fab
           light
           fixed
           bottom
           right
           color="amber darken-3">
            
            <transition name="fade-transition">
              <v-icon v-if="isEditMode" color="white">
                save
              </v-icon>
              <v-icon v-else color="white">
                edit
              </v-icon>
            </transition>
    </v-btn>
    
  </section>
</template>

<script>
// import Review from '@/cmps/user-profile/Review';
import UserService from '@/services/UserService.js';
import EventBusService, { EVENTS } from '@/services/EventBusService.js';
import StarRating from 'vue-star-rating';

import TransactionService from '@/services/TransactionService.js';
import TransactionList from '@/cmps/user-profile/public-profile/TransactionList.vue';
import ReviewList from '@/cmps/user-profile/public-profile/ReviewList.vue';

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  created() {
    this.userData = this.user;
  },
  data(){
    return {
      userData: null,
      isEditMode: false
    }
  },
  methods: {
    toggleEditMode() {
      if (this.isEditMode) {
        this.userData.desc = this.$refs.desc.innerText;
        UserService.update(this.userData).then(()=> {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'Updated',
            desc: 'keeping things fresh, I like that',
          });
        })
      } else {
        setTimeout(()=>{
          this.$refs.desc.focus();
        }, 0)
      }
      this.isEditMode = !this.isEditMode
    },
  },
  computed: {
    isLoggedInUserProfile() {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      const userId = this.$route.params._id;

      return loggedInUser && loggedInUser._id === userId;
    }
  },
  components: {
    TransactionList,
    ReviewList,
    StarRating
  }
  
};
</script>


<style scoped>
.public-profile {
  text-align: left;
  padding-top: 100px;
}
.card {
  padding-top: 60px;
}

.card .public-profile-avatar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 140px;
  width: 140px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.deals-section-headline {
  text-align: center;
}
.reviews{
  display:grid;
  width:100%;
  grid-gap:20px;
   grid-template-columns: 1fr 1fr;
}
li {
  padding: 10px;
  overflow: auto;
}
li img {
  height:70px;
  float: left;
  margin: 0 15px 0 0;
}
.rating{
  margin-top:0px;
  margin-bottom:20px;
}
li p {
  font: 200 1.2rem Georgia, Times New Roman, serif;
}
li:hover {
  background: #eee;
  cursor: pointer;
}
/* overriding vue */
.btn--floating {
  z-index: 1;
}
</style>