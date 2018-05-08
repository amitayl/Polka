<template>
  <section class="accepted-bid">
    we are sorry, yosi refused your offer :(
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
        // a little x to close img
    }
}
</script>

<style>

</style>
