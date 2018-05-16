<template>
  <div class="one-side">
        <div>{{user.nickName}} </div>
         <img class="user" :src="user.img" >
           <v-card color="white" class="grey--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    
                     <v-flex xs7>
                      <div>
                        <div>{{user.prodTitle}}</div>
                      </div>
                    </v-flex>
                       <img class="koko"  :src="user.prodImg">
                  </v-layout>
                </v-container>
              </v-card>
        </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,  
      required: true
    }
  },
};
</script>

<style scoped>

img {
  display: block;
}
.koko{
  height:100px;
}

 img.user {
  border-radius: 50%;
  margin: 0 auto;
  width:70px;
  margin-bottom:70px;
  
}
 img {
  margin: 20px 0px;
  width: 100px;
}
.margin{
  margin:0 30px;
}
 .title{

 margin:auto;
 text-align: center;

 }
 .title-star{
   margin-top:20px;
   color:rgb(48, 48, 92);
   text-align:left
 }



</style>
