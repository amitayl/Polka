<template>
 
      <div>
        <v-app id="inspire">
    <!-- <v-layout row justify-center>  -->
    <v-dialog class="inline" v-model="dialog" persistent max-width="500px">
      <a href="#"  slot="activator" @click="showReview(true)"  class="thanks"> &nbsp &nbsp Please leave a review </a>
        
        <v-card>
           <v-toolbar color="indigo" dark>
              <v-toolbar-title class="title">Reviews</v-toolbar-title>
            </v-toolbar>
          <div class="margin">
          <div class="title-star">Please choose a start from 1-5 to your partner</div>
          <star-rating v-bind:star-size="30"  @rating-selected ="setRating" ></star-rating>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="input-1"
                  label="Please tell us about your experience with nick"
                  textarea
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn color="green darken-1" flat @click.native="dialog=false">Close</v-btn>
            <v-btn color="green darken-1" flat @click.native="dialog=false">Save</v-btn>
          </v-card-actions>
          </div>
        </v-card>
         </v-dialog>
         </v-app>
      
</div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  data (){
    return {
      dialog: false
    }
  },
  methods:{
    setRating(rating){
      console.log ('ev' , ev);
    }
  },
  components:{
    StarRating
  }

}
</script>

<style>
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
.fillReview{
    /* display: none; */
    /* position: fixed; /* Stay in place */
    /* z-index: 5; 
    top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    overflow: auto;  */
}

</style>
