
<template>    
    <section class="public-profile container ">
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
                <!-- <p class="title user-loc">{{user.loc.name}}</p> -->
              </div>
              <div class="details" v-if="isEditMode">
                <label >
                <input height="48" v-model="user.nickName" display-4>
                </label>
                <br>
                <br>    
              <p> <textarea v-model="user.desc" display-4></textarea></p>
              <p> <input v-model="user.email" ></p>
                <!-- <p class="title user-loc">{{user.loc.name}}</p> -->
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
<!--        
        <star-rating read-only  :rating="user.reviews[0].rating" ></star-rating> -->
      
    <ul class="reviews">
        <li  v-for="review in user.reviews" :key="review.txt">
            <img  :src="user.img" >
            <star-rating class="rating" :star-size="15" :show-rating="false" read-only  :rating="review.rating" ></star-rating>
            <p>{{review.txt}}</p>
        </li>
   </ul> 


         
  
       
         

           
        <!-- <router-link :to="'/transaction/'"><button>See transactions</button></router-link> -->
    </section>
</template>

<script>
import Review from '@/cmps/user-profile/Review';
  import StarRating from 'vue-star-rating';
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    isUserEqualLoggidIn: {
       type: Boolean,
      required: true
    }
  },
  data (){
    return {
      isEditMode: false
    }

  },
  created(){
    console.log ('user nick' , user.nickName);
   
  },
  computed :{
    // review (){
    //   return user.reviews[0]
    // }
  },
  components :{
    Review
  }
  
};
</script>


<style scoped>
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
  /* background-color:rgb(211, 195, 195);
    opacity:0.8; */
}



.user-email {
  color: rgb(160, 154, 219);
}



.user-title {
  font-family: 'Times New Roman', Times, serif;
}

/* div {
  margin: 20px;
} */

ul {
  list-style-type: none;
  width: 500px;
}
.reviews{
  display:grid;
  width:100%;
  grid-gap:20px;
   grid-template-columns: 1fr 1fr;
/* grid-template-rows: px; */


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