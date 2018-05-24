<template>
  <section class="login-required flex flex-center display-3">
    You must <router-link to="/login" class="ml-3 mr-3"> login</router-link> to enter this section
  </section>
</template>

<style scoped>
  section {
    color: darkslategray;
    letter-spacing: 10px;
  }
</style>