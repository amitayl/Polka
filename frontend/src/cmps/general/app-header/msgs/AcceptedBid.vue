<template>
  <section class="accepted-bid">
      congradulations, yosi accepted your trade
      {{data}}
  </section>
</template>

<script>

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    created() {
        // get your product by productid 
        // the bidder product img by productid
        // the bidder picture by _id
        // link to transaction
    }
}
</script>

<style>

</style>
