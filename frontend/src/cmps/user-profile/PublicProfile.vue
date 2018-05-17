
<template>    
    <section class="public-profile ">
        <div class= "user-img-line flex user-details   ">
                 <img class="user-img"  :src="user.img">

             <div  class="flex details flex-column">
                <h2 class="user-title title is-1">{{user.nickName}} </h2>
                
                <br>
                <br>    
                <p class=" title user-desc">{{user.desc}} </p>
                <p class=" title user-email" >{{user.email}}</p>
                <p class="title user-loc">{{user.loc.name}}</p>
            </div>
        </div>
        momo
        {{user.reviews[0].rating}}
       <star-rating></star-rating>
        <star-rating read-only  rating="user.reviews[0].rating" ></star-rating>
      
      <!-- <ul>
          <li v-for="review in user.reviews" :key="user.id">
            <review review:"review"></review>
          </li>
          </ul>  -->
       
         

           
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
    }
  },
  created(){
    // console.log ('fff',this.$store.getters.getSelectedUser);
    
    console.log ('user' , user)
  },
  computed :{
    review (){
      return user.reviews[0]
    }
  },
  components :{
    Review
  }
  
};
</script>


<style scoped>
p {
  font-size: 1.2rem;
  line-height: 1.3rem;
}
.public-profile {
  text-align: left;
}
.user-details {
  padding: 5px;
}
.user-img-line {
  width: 700px;
  padding: 50px;
  /* background-color:rgb(211, 195, 195);
    opacity:0.8; */
}

.user-details {
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB8A-9J8dL2Z9B5HsjeCmOKJOURIrkQ63S0LVN9OznkhPq79agIA');
  background-repeat: no-repeat;
   background-size: 100% 100%;
}

.user-email {
  color: rgb(160, 154, 219);
}

.user-title {
  font-family: 'Times New Roman', Times, serif;
}




.user-img {
  box-shadow: 0 2px 2px black;
  border-radius: 50%;
  margin-right: 50px;
  min-width: 200px;
  width: 200px;
  align-self: baseline;
}
</style>