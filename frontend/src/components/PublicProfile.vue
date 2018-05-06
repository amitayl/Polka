<template>
    <section class="public-profile">
        <!-- <router-link :to="'/product/'+product._id"> -->
            <div class= "user-img-line flex  align-center ">
             <div> <img class="user-img"  src="../imgs/selectedUser.jpg"></div>
             <div class="flex flex-column align-center">
               
                    <h2 class="user-title title is-2">{{user.name}} </h2>
                    <h4 class="user-desc title is-4">{{user.desc}} </h4>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log('user.name', this.user.name);
    console.log('user.img', this.user.img);
  }
};
</script>

<style scoped>
.user-img {
  width: 200px;
  border-radius: 50%;
}
</style>
