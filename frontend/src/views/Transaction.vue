<template>
  <div class="container">
    <div class="trans"> 
      <!-- <h1 >Transaction</h1> -->
  <!-- <button @click="upload">yosi</button> -->
  
      <h1 class="display-2">Deal :#1</h1> 
      <br>
      <h1 class="display-1">Date : {{time}}</h1>
      <br>
        <!-- <h1 class="display-1">Between</h1> -->
      <div class="owner">
          <!-- <h1 class="display-3">{{loggedInUser.nickName}}</h1>  -->
      </div>
        <div class="bidder">
          </div> 
    </div>
  </div>

  
</template>

<script>
import moment from 'moment'
 import TransactionService from '@/services/TransactionService.js'
export default {
  data() {
    return {
      time:'',
      transaction: {
        
        
      },
      // selectedProduct :'',
      // currProduct: '',
      // loggedInUser: '' ,

      bidder :{
      },
      owner:{
      }
    }
  },
    created (){
      this.time = moment().format('MMM Do YY')
      // this.selectedProduct = this.$store.getters.getSelectedProduct;
      //   console.log ('selectedProduct' , selectedProduct);
      //   this.currProduct =  this.$store.getters.getCurrProduct;
      //   console.log ('currProduct' , currProduct);

      //   this.loggedInUser =  this.$store.getters.getLoggedInUser;

      
    //   TransactionService.createTransaction();
    //   console.log ('$route.transaction' , this.$route.transaction );
    // const transactionId = this.$route.transaction._id;
    // TransactionService.getById(transactionId)
    //   .then(transaction => {
    //     console.log ('get to transaction server')
    //      (this.transaction = transaction)
    //   });
  
  },
  computed : {
    getCurrTransaction (){
      return this.$store.getters.getCurrTransaction;

    }

  }
};
</script>
<style scoped>
.trans{
  margin:0 auto;
  width:600px;
  border:1px solid grey
}
.user {
  width: 45%;
}
</style>
