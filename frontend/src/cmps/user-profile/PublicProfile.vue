<template>    
  <section class="public-profile ms-5">

    <v-card class="elevation-4">

      <div class="public-profile-avatar" 
        :style="{ 'backgroundImage': `url(${user.img})` }">
      </div>

      <v-card-title primary-title>
        <div>
          <h2 class="display-1 capitalize">{{user.nickName}}</h2>
          <p class="title">{{user.desc}}</p>
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
  </section>
</template>

<script>
// import Rating from 'v-rating';
import TransactionService from '@/services/TransactionService.js';
import TransactionList from '@/cmps/user-profile/public-profile/TransactionList.vue';
import ReviewList from '@/cmps/user-profile/public-profile/ReviewList.vue';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    TransactionList,
    ReviewList
  }
};
</script>

<style scoped>
.public-profile {
  text-align: left;
}
.card {
  margin-top: 100px;
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
</style>