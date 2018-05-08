

<template>    
    <section class="public-profile">
        <div class= "user-img-line flex user-details   ">
                 <img class="user-img"  :src="user.img">

             <div  class="flex details flex-column">
                <h2 class="user-title title is-1">{{user.nickName}} </h2>
                <!-- <Rating v-model="yourLocalVariable"></Rating> -->
                
                <br>
                <br>    
                <p class=" title user-desc">{{user.desc}} bla bla la bla bla </p>
                <p class=" title user-email" >{{user.email}}</p>
                <p class="title user-desc">Haifa, Sderot Moshe</p>
            </div>
        </div> 
           
        <router-link :to="'/transaction/'"><button>See transactions</button></router-link>
    </section>
</template>

<script>
// import Rating from 'v-rating';
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
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