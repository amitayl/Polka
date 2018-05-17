<template>
<div class="review">
    {{review.rating}};
    {{review.txt}}
    </div>
</template>

<script>
export default {
    props: {
    review: {
      type: Object,
      required: true
    }
  },

}
</script>


<style>
.review{
    border:1px solid grey
}

</style>
