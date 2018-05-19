<template>    
    <section class="transaction-list elevation-4">
        <transaction-preview v-if="transactions" v-for="transaction in transactions" 
                             :transaction="transaction"></transaction-preview>
    </section>
</template>

<script>
import TransactionService from '@/services/TransactionService.js';
import TransactionPreview from './TransactionPreview.vue';

export default {
  created() {
    const userId = this.$route.params._id;
    
    TransactionService.getDealsByUserId(userId).then(transactions => {
        this.transactions = transactions;
    });
  },
  data() {
    return {
        transactions: null
    }
  },
  components: {
      TransactionPreview
  }
};
</script>

<style scoped>
</style>