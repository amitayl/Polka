

<template>    
    <section class="public-profile">
        <div class= "user-img-line flex user-details   ">
                 <img class="user-img"  src="../imgs/selectedUser.jpg">

             <div  class="flex details flex-column">
                <h2 class="user-title title is-1">{{user.nickName}} </h2>
                <Rating v-model="yourLocalVariable">ss</Rating>
                
                <br>
                <br>    
                <h4 class="user-desc title is-4">{{user.desc}} bla bla la bla bla </h4>
                <h4 class="user-desc title is-4">{{user.email}} </h4>
                <h4 class="user-desc title is-4">Haifa, Sderot Moshe</h4>
                   
            </div>
            
        </div> 
        
           
        <router-link :to="'/transaction/'+_id"><button>See transactions</button></router-link>
    </section>
</template>

<script>
import Rating from 'v-rating';
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            _id:555,
            yourLocalVariable: 3,
        }

    },
  
  
  created() {
    console.log('user.nickname', this.user.nickName);
    console.log('user.img', this.user.img);
  }
};
</script>

<style scoped>
.public-profile{
    text-align:left;
}
.user-details{
    padding:5px;
}

.user-title{
    font-family: "Times New Roman", Times, serif;
}
      
.user-img{
    box-shadow: 0 2px 2px black;
    border-radius: 50%;
     margin-right:50px;
     min-width:200px;
    width:200px;
    align-self:baseline;
}
</style>
