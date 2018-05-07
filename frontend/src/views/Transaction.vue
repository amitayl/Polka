<template>
  <div class="transaction">
    <h1 >Transaction</h1>
    <!-- <button @click="upload">yosi</button> -->
    <h1 title is-1>{{transaction.id}}</h1> 
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
    
      <div class="user bidder"></div>
    </div>
  </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      transaction: {
        id: 1
      }
    };
  }
};
</script>

<style scoped>
.user {
  width:45%;
}
</style>