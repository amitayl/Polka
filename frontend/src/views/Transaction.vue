<template>
  <div class="container" >
    <div class="trans">
      <div class="scroll" ><img class="scroll" src="http://clipartix.com/wp-content/uploads/2016/04/Blank-scroll-clipart-top-hd-images-for-free-image-0-2.png" >
          <div class="date">
            <p>Deal :#1</p> 
            <p>{{time}}</p>
       
         </div>
      <div class="center">
        <div class="headline1">Trade summery</div>
        <div class="trade-details flex space-between">
          <transaction-user-card  v-if="transactionObj" :user="transactionObj.owner"></transaction-user-card>
          <transaction-user-card v-if="transactionObj" :user="transactionObj.bidder"></transaction-user-card>
        </div>
        
      <!-- <h1 >Transaction</h1> -->
  <!-- <button @click="upload">yosi</button> -->

    </div>
    </div>

     <p  class="thanks"><strong>Thank you for trading with Polka! </strong></p>
      <a href="#"     @click.stop="dialog=true"  class="thanks"> &nbsp &nbsp Please leave a review </a>

    <v-app id="inspire">
    <!-- <v-layout row justify-center>  -->
    <v-dialog class="inline" v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title class="title">Reviews</v-toolbar-title>
          </v-toolbar>
          <div class="form">
            
          <div class="title-star">Please choose a rating from 1-5 for you trade partne</div>
          <star-rating v-bind:star-size="30"  @rating-selected ="setRating" ></star-rating>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
               v-model = "review.details.txt"
                  label="Please tell us about your experience with nick"
                  textarea
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn color="green darken-1" flat @click.native="dialog=false">Close</v-btn>
            <v-btn color="green darken-1" flat  @click.native="dialog=false , submitReview()">Save</v-btn>
          </v-card-actions>
          
        </div>
      </v-card>
    </v-dialog>
   </v-app> 
    <!-- <fill-review v-if="isShowReview"></fill-review> -->
    
    <!-- </v-app>   -->
  </div>
</div>
  
</template>

<script>
import UserService from "@/services/UserService";
import StarRating from "vue-star-rating";
import TransactionUserCard from "@/cmps/Transaction/TransactionUserCard";
import FillReview from "@/cmps/FillReview";
import moment from "moment";
import TransactionService from "@/services/TransactionService.js";
export default {
  data() {
    return {
      time: "",
      transaction: {},

      bidder: {},
      owner: {},
      isShowReview: true,
      transactionObj: null,
      dialog: false,
      review: {
        getterId: "",
        details: {
          senderId: "",
          rating: 0,
          txt: ""
        }
      }
    };
  },
  mounted() {
    const transactionId = this.$route.params._id;
    this.time = moment().format("MMM Do YY");
    TransactionService.getById(transactionId).then(transObj => {
      this.transactionObj = transObj;

      const loggedInUserId = this.$store.getters.getLoggedInUser._id;
      console.log("loggedInUserId", loggedInUserId);

      if (loggedInUserId === transObj.owner_id) {
        this.review.getterId = transObj.owner._id;
        this.review.details.senderId = transObj.bidder._id;
      } else {
        this.review.getterId = transObj.bidder._id;
        this.review.details.senderId = transObj.owner._id;
      }
    });
  },
  methods: {
    submitReview() {
      console.log("submit", this.review);
      UserService.addReview(this.review);
    },
   
    setRating(rating) {
      console.log("ev", rating);
      this.review.details.rating = rating;
    }
  },
  computed: {
    getCurrTransaction() {
      return this.$store.getters.getCurrTransaction;
    }
  },
  components: {
    FillReview,
    TransactionUserCard
  }
};
</script>
<style scoped>
.trans {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin: 0 auto;
  width: 900px;
  /* opacity: 0.5; */
}
div.scroll {
  position: relative;
}
img.scroll {
  height: 500px;
  width: 1050px;
}
.center {
  position: absolute;
  top: 50px;
  right: 100px;
}
.headline1 {
  font-size: 3rem;

  text-decoration: underline;
  margin: 0 auto;
}
.yoyo {
  width: 500px;
}

.user img {
  margin: auto;
  text-align: center;
}
.thanks {
  display: inline-block;
  font-family: Georgia, "Times New Roman", Times, serif;
}
p {
  margin: auto 0px;
}
.trade-details {
  width: 700px;
  margin: auto;
}

.inline {
  display: none;
}
.date {
  text-align: left;
  position: absolute;
  top: 50px;
  right: 50px;
}

.hidden {
  visibility: hidden;
}
.form {
  margin: 0 30px;
}
.title {
  margin: auto;
  text-align: center;
}
.title-star {
  margin-top: 20px;
  color: rgb(48, 48, 92);
  text-align: left;
}
</style>
