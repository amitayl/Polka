<template>
  <section class="transaction-user-card">
    <v-card 
      color="white" 
      height="100%"
      class="elevation-4 pa-3">

      <div class="flex align-center mb-3">
        <div 
          class="user mr-3" 
          :style="{'backgroundImage': `url(${user.img})`}">
        </div>
        <div class="title">{{user.nickName}}</div>
      </div>

      <a :href="'https://mail.google.com/mail/?view=cm&fs=1&to='+user.email" class="title">{{user.email}}</a>

      <div class="flex mt-3">
        <div 
          class="product mr-3" 
          :style="{'backgroundImage': `url(${user.prodImg})`}">
        </div>

        <div class="flex flex-column">
          <div class="title mb-2">{{user.prodTitle}}</div>
          <div class="subheading">{{user.prodDesc}}</div>
        </div>
      </div>

    </v-card>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.user, .product {
  background-size: cover;
  background-position: center;
}
.user {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.product {
  height: 100px;
  min-width: 100px;
}
</style>
