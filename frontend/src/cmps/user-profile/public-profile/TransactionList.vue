<template>    
    <section class="transaction-list elevation-4">
        <transaction-preview v-if="transactions" v-for="(transaction, idx) in transactions" 
                             :transaction="transaction" :key="idx"></transaction-preview>
        <p 
            v-if="!transactions || transactions.length === 0"
            class="flex flex-center title pa-4"
            >
            no deals yet
        </p>
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