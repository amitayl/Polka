<template>
  <div class="transaction">
    <h1 >Transaction</h1>
    <!-- <button @click="upload">yosi</button> -->
    <h1 title is-1>id</h1> 
    <h1 title is-1>Time</h1>
      <h1 title is-1>location</h1>
      <div class="flex space-between">
        <div class="user bidder"> 
          Name:
          Email:
          <div class="item" >
            Item traded:
            item title:
            item desc:
          </div>
          </div>
      
       <div class="user bidder">
         </div>
         </div>
  </div>

  
</template>

<script>
 import TransactionService from '../services/TransactionService.js'
export default {
  data() {
    return {
      transaction: {
      },
      bidder :{
      },
      owner:{
      }
    }
  },
    created (){
      console.log ('$route.transaction' , this.$route.transaction );
    const transactionId = this.$route.transaction._id;
    TransactionService.getById(transactionId)
      .then(transaction => {
        console.log ('get to transaction server')
         (this.transaction = transaction)
      });
  
  }
};
</script>
<style scoped>
.user {
  width: 45%;
}
