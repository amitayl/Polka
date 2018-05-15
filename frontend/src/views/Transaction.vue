<template>
  <div class="container">
    <div class="trans">
      <div class="scroll" ><img class="scroll" src="http://clipartix.com/wp-content/uploads/2016/04/Blank-scroll-clipart-top-hd-images-for-free-image-0-2.png" >
          <div class="date">
            <p>Deal :#1</p> 
            <p>{{time}}</p>
        <!-- <h1 class="display-1">Between</h1> -->
      </div>
      <div class="center">
        <div class="headline1">Trade summery</div>
        <div class="trade-details flex space-between">
        <div class="one-side">
        <div class="owner">
         <img class="user"  src="http://img.timeinc.net/time/daily/2012/1211/poy_benbernanke.jpg" >
           <v-card color="white" class="grey--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    
                     <v-flex xs7>
                      <div>
                        <div class="headline">Halycon Days</div>
                        <div>Ellie Goulding</div>
                      </div>
                    </v-flex>
                       <img class="koko"  src="https://vuetifyjs.com/static/doc-images/cards/halcyon.png">
                  </v-layout>
                </v-container>
              </v-card>
        </div>
        </div>
         <div class="bidder">
          <img class="user"  src="http://img.timeinc.net/time/daily/2012/1211/poy_benbernanke.jpg" >
           <v-card color="white" class="grey--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    
                     <v-flex xs7>
                      <div>
                        <div class="headline">Halycon Days</div>
                        <div>Ellie Goulding</div>
                      </div>
                    </v-flex>
                       <img class="koko"  src="https://vuetifyjs.com/static/doc-images/cards/halcyon.png">
    
                  </v-layout>
                </v-container>
              </v-card>
        
        </div>
        </div>
    </div>
      <!-- <h1 >Transaction</h1> -->
  <!-- <button @click="upload">yosi</button> -->

    </div>
    </div>

    <p @click.native="showReview(true)"  class="thanks"><strong>Thank you for trading with Polka! </strong></p>
    <a href="#"  @click.native="showReview(true)"  class="thanks"> &nbsp &nbsp Please leave a review </a>
    <!-- <v-btn @click.native="showReview(true)"> -->
    <fill-review v-if="isShowReview"></fill-review>

    


    
  </div>

  
</template>

<script>
import FillReview from '@/cmps/FillReview'
import moment from "moment";
import TransactionService from "@/services/TransactionService.js";
export default {
  data() {
    return {
      time: "",
      transaction: {},

      bidder: {},
      owner: {},
      isShowReview: false,

    };
  },
  mounted() {
    const transactionId = this.$route.params._id;
    this.time = moment().format("MMM Do YY");
    TransactionService.getById(transactionId);
  },
  methods:{
    showReview(isShowReview){
      console.log ('moshe');
      if (isShowReview) this.isShowReview=true;
    }

  },
  computed: {
    getCurrTransaction() {
      return this.$store.getters.getCurrTransaction;
    }
  },
  components:{
    FillReview
  }
};
</script>
<style scoped>
.trans {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin: 0 auto;
  width: 900px;
}
div.scroll {
  position: relative;
}
img.scroll {
  height: 500px;
  width: 1050px;
}
.center{
position: absolute;
  top: 50px;
   right: 100px;
}
.headline1 {
  font-size: 3rem;
  
  text-decoration: underline;
  margin:0 auto;
 
}
.yoyo {
  width: 500px;
}

.user img {
 margin:auto;
 text-align: center;
}
.thanks {
  display: inline-block;
  font-family: Georgia, "Times New Roman", Times, serif;
}
p {
  margin:auto  0px;
}
.trade-details {
  width: 700px;
  margin:auto;
}
img {
  display: block;
}
.koko{
  height:100px;
}

.trade-details img.user {
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom:100px;
  
}
.trade-details img {
  margin: 20px 0px;
  width: 100px;
}

.date {
  text-align: left;
  position: absolute;
  top: 50px;
  right: 50px;
}

.hidden{
  visibility: hidden;
}
</style>
