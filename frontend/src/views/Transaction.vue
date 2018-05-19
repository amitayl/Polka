<template>
  <section class="container">
    <div class="trans">
      <div class="scroll">
        <img class="scroll" 
        src="http://clipartix.com/wp-content/uploads/2016/04/Blank-scroll-clipart-top-hd-images-for-free-image-0-2.png" >

        <div class="date">
          <p>Deal :#1</p> 
          <p>{{time}}</p>
        </div>

        <div class="center">
          <div class="headline1">Trade summery</div>
          <div class="trade-details flex space-between">
            <transaction-user-card  v-if="transactionObj" 
              :user="transactionObj.owner"></transaction-user-card>
            <transaction-user-card v-if="transactionObj" 
              :user="transactionObj.bidder"></transaction-user-card>
          </div>
        </div>

        <p class="thanks"><strong>Thank you for trading with Polka! </strong></p>
        <a href="#" @click="showModal = true" data-toggle="modal" data-target="#myModal"
           class="thanks"> &nbsp; &nbsp; Please leave a review </a>
      </div>

      <modal v-show="showModal" @hideModal="showModal = false">          
        <v-card>
          <div class="layout-card">
            <div class="title-star">Please choose a rating from 1-5 for you trade partner</div>
            <star-rating v-bind:star-size="30"  @rating-selected ="setRating" ></star-rating>

            <v-container fluid>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model = "review.details.txt"
                    label="Please tell us about your experience with your trade partner"
                    textarea
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

            <v-card-actions>
              <v-btn color="green darken-1" flat 
                @click.native="showModal=false">Close</v-btn>
              <v-btn color="green darken-1" flat data-dismiss="modal" 
                @click.native="showModal=false ,submitReview()">Save</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </modal>

    </div>
  </section>
</template>

<script>
import UserService from '@/services/UserService';
import StarRating from 'vue-star-rating';
import TransactionUserCard from '@/cmps/Transaction/TransactionUserCard';
import FillReview from '@/cmps/FillReview';
import moment from 'moment';
import TransactionService from '@/services/TransactionService.js';
import Modal from '@/cmps/general/Modal.vue';

export default {
  data() {
    return {
      time: '',
      transaction: {},
      showModal: false,
      bidder: {},
      owner: {},
      isShowReview: true,
      transactionObj: null,
      review: {
        getterId: '',
        details: {
          senderId: '',
          rating: 0,
          txt: ''
        }
      }
    };
  },
  mounted() {
    const transactionId = this.$route.params._id;
    this.time = moment().format('MMM Do YY');
    TransactionService.getById(transactionId).then(transObj => {
      this.transactionObj = transObj;

      const loggedInUserId = this.$store.getters.getLoggedInUser._id;

      if (loggedInUserId === transObj.owner_id) {
        this.review.getterId = transObj.bidder._id;
        this.review.details.senderId = transObj.owner._id;
      } else {
        this.review.getterId = transObj.owner._id;
        this.review.details.senderId = transObj.bidder._id;
      }
    });
  },
  methods: {
    submitReview() {
      UserService.addReview(this.review).then(_ => {
        this.$router.push('/browseProducts');
      });
    },

    setRating(rating) {
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
    TransactionUserCard,
    Modal
  }
};
</script>
<style scoped>
.trans {
  font-family: Georgia, 'Times New Roman', Times, serif;
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
  font-family: Georgia, 'Times New Roman', Times, serif;
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
.layout-card {
  margin: 30px;
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
