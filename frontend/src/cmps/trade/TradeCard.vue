<template>
  <div class="card">
   <v-layout>
            <!-- <v-flex xs12 sm6 offset-sm3> -->
                <v-card>
                <v-card-media :src="user.productImg"  height="200px"> </v-card-media>
                <v-card-title primary-title>
                    <div>
                     <img class="owner-img" :src="user.userImg" height="200px">
                    </div>
                </v-card-title>
                </v-card>
            <!-- </v-flex> -->
    </v-layout>
  </div>
</template>

<script>
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
.card {
    min-width:300px;
    width:300px;
    text-align: center;
   
}
.owner-img{
    border-radius:80%;
    height:200px;
    margin:auto;
}


</style>
