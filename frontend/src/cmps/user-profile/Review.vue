<template>
<div class="review">
     <img src="http://lorempixum.com/100/100/nature/4" >
  <star-rating read-only  :rating="review.rating" ></star-rating>
   <p>{{review.txt}}</p>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating';
export default {
    props: {
    review: {
      type: Object,
      required: true
    }
  },

}
</script>


<style scoped>

 img {
  float: left;
  margin: 0 15px 0 0;
}

 p {
  font: 200 12px/1.5 Georgia, Times New Roman, serif;
}

li {
  padding: 10px;
  overflow: auto;
}

li:hover {
  background: #eee;
  cursor: pointer;
}




</style>
