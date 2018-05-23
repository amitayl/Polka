<template>
  <section v-if="transaction" class="transaction mt-3 ms-5">
    <h1 class="display-1 mb-2">
      Deal 
      <!-- <span class="tahoma"> -->
        #{{transaction._id.substr(0, 5)}}
      <!-- </span> -->
    </h1>

    <hr class="deal-underline mb-4"/>

    <h2 class="mb-3">
      <v-icon :size="30">watch_later</v-icon>
      {{transactionTime}}
    </h2>

    <div class="user-card-container">
      <transaction-user-card  
        :user="transaction.owner">
      </transaction-user-card>

      <transaction-user-card 
        :user="transaction.bidder">
      </transaction-user-card>
    </div>

    <div class="btn-container">
      <v-btn @click.native="showModal = true"> 
        leave a review 
      </v-btn>
    </div>

    <modal 
      v-show="showModal" 
      @hideModal="showModal = false">          
      
      <v-card>
        <div class="layout-card">
          <div class="title-star">
            Please choose a rating from 1-5 for you trade partner
          </div>

          <star-rating 
            :star-size="30"  
            @rating-selected = "setRating">
          </star-rating>

          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model = "review.details.txt"
                  label =
                    "Please tell us about your 
                     experience with your trade partner"
                  textarea
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-actions>
            <v-btn 
              flat
              color="teal darken-1"
              @click.native="showModal = false">Close</v-btn>
            <v-btn 
              flat
              color="teal darken-1"
              @click.native="showModal = false ,submitReview()">Save</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </modal>

  </section>
</template>

<script>
import moment from 'moment';
import UserService from '@/services/UserService';
import TransactionUserCard from '@/cmps/Transaction/TransactionUserCard';
import FillReview from '@/cmps/FillReview';
import TransactionService from '@/services/TransactionService.js';
import Modal from '@/cmps/general/Modal.vue';

export default {
  data() {
    return {
      showModal: false,
      transaction: null,
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
  created() {
    const transactionId = this.$route.params._id;
    TransactionService.getById(transactionId).then(transaction => {
      this.transaction = transaction;
      this.transaction._id = transactionId;

      const loggedInUserId = this.$store.getters.getLoggedInUser._id;

      if (loggedInUserId === transaction.owner_id) {
        this.review.getterId = transaction.bidder._id;
        this.review.details.senderId = transaction.owner._id;
      } else {
        this.review.getterId = transaction.owner._id;
        this.review.details.senderId = transaction.bidder._id;
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
    },
    transactionTime() {
      return moment(this.transaction.createdAt).calendar();
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
.transaction {
  text-align: left;
}
.deal-underline {
  border: 2px solid lightgray;
  width: 80%;
}
.user-card-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}
.btn-container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
}
.btn {
  margin: 0;
  width: 100%;
  background: white;
}
@media (min-width: 750px) {
  .user-card-container {
    grid-template-columns: 1fr 1fr;
  }
  .btn-container {
    width: initial;
    left: initial;
    right: 20px;
    bottom: 20px;
  }
}
</style>