<template>
    <section class="offer-preview">
      <div  class="flex  align-center">   
        <h4 class="title is-4">  {{offer.title}}</h4> 
        <img :src="offer.imgs">
     </div>
    
     
    </section>
</template>

<script>
export default {
    props: {
     offer: {
      type: Object,
      required: true
    }
  },
   data(){  
       return{
       
       }
   },
        
    created (){
        
    },
    methods : {
    },
    
    

};

</script>

<style scoped>
img  {
    min-width:100px;
    width:100px;
    height:100px;
}

</style>
