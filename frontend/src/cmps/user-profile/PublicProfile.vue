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

    <div class="deals-reviews-container">

      <div>
        <h2 class="deals-section-headline mt-4 display-1 mb-3">Deals</h2>
        <transaction-list></transaction-list>      
      </div>

      <div>
        <h2 class="deals-section-headline mt-4 display-1 mb-3">Reviews</h2>
        <ul 
          class="reviews" 
          v-if="user.reviews && user.reviews.length > 0">

          <li 
            v-for="review in user.reviews" 
            :key="review.txt"
            class="elevation-4">
            <img :src="review.senderImg">
            <star-rating class="rating" :star-size="25" 
            :show-rating="false" read-only 
            :rating="review.rating"></star-rating>

            <p>{{review.txt}}</p>
          </li>
        </ul> 

        <p 
          v-else
          class="flex flex-center title pa-4 elevation-4"
          >
          no reviews yet
        </p>
      </div>

    </div>

    <v-btn 
      v-if="isLoggedInUserProfile"
      @click.native="toggleEditMode()"
      fab
      light
      fixed
      bottom
      right
      color="indigo lighten-1">
      
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
.deals-reviews-container {
  display: flex;
  flex-direction: column
}
@media (min-width: 750px) {
  .deals-reviews-container {
    flex-direction: initial;
    justify-content: space-between;
  }
  .deals-reviews-container > div {
    width: 48%;
  }
}
.deals-section-headline {
  text-align: center;
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
li p {
  font: 200 1.2rem Georgia, Times New Roman, serif;
  margin: 0;
}
.btn--floating {
  z-index: 1;
}
</style>