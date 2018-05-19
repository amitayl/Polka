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

    <ul class="reviews">
        <li v-for="review in user.reviews" :key="review.txt">
            <img :src="user.img">
            <star-rating class="rating" :star-size="25" 
            :show-rating="false" read-only 
            :rating="review.rating"></star-rating>

            <p>{{review.txt}}</p>
        </li>
    </ul> 
    
  </section>

  <!-- <section class="public-profile container">
      <v-card>
          <div class= "user-img-line flex user-details   ">
            <img  class="user-img"  :src="user.img">
            <div  class="flex details flex-column">
              <div class="details" v-if="!isEditMode">
                <p display-4>{{user.nickName}}</p>
                <br>
                <br>    
                <p  class=" title user-desc">{{user.desc}} </p>
                <p class=" title user-email" >{{user.email}}</p>
                <!-- <p class="title user-loc">{{user.loc.name}}</p>
              </div>
              <div class="details" v-if="isEditMode">
                <label >
                <input height="48" v-model="user.nickName" display-4>
                </label>
                <br>
                <br>    
              <p> <textarea v-model="user.desc" display-4></textarea></p>
              <p> <input v-model="user.email" ></p>
                <!-- <p class="title user-loc">{{user.loc.name}}</p>
              </div>
            </div>
          <div>
            <v-btn class="edit-button" @click="isEditMode=!isEditMode" v-if="!isEditMode">Edit</v-btn>
            <v-btn class="save-edit" @click="isEditMode=!isEditMode" v-if="isEditMode">Save</v-btn>
            
            <v-container wrap>
              <v-card height="100%">
                number of trades:3
                <br>
                <br>
                number of products:5
              </v-card>
            </v-container>
          </div>
        </div>
    </v-card>
    <hr>
 -->
        <!-- <router-link :to="'/transaction/'"><button>See transactions</button></router-link>
    </section>
-->
</template>

<script>
// import Review from '@/cmps/user-profile/Review';
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
  data (){
    return {
      isEditMode: false
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
p {
  font-size: 1.5rem;
  line-height: 1.3rem;
}
.public-profile {
  text-align: left;
}
.details {
  width:200px;
}
textarea{
  height:70px;
  width:200px;
}
.user-img {
  box-shadow: 0 2px 2px black;
  border-radius: 50%;
  margin-right: 50px;
  min-width: 200px;
  width: 200px;
  align-self: baseline;
}
.user-img-line {
  width: 700px;
  padding: 50px;
}
.user-email {
  color: rgb(160, 154, 219);
}
.user-title {
  font-family: 'Times New Roman', Times, serif;
}
div {
  margin: 20px;
}
ul {
  list-style-type: none;
  width: 500px;
}
.reviews{
  display:grid;
  width:100%;
  grid-gap:20px;
   grid-template-columns: 1fr 1fr;
}
h3 {
  font: bold 20px/1.5 Helvetica, Verdana, sans-serif;
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
li {
  padding: 10px;
  overflow: auto;
}
li:hover {
  background: #eee;
  cursor: pointer;
}
</style>