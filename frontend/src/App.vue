<template>
  <div id="app">
    <user-msg></user-msg>

    <header>
      <app-header></app-header>
    </header>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import UserMsg from './cmps/general/UserMsg.vue';
import AppHeader from './cmps/general/AppHeader.vue';

export default {
  components: {
    UserMsg,
    AppHeader
  }
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style>
@import './css/main.css';
