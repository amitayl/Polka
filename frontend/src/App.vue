<template>
  <div id="app">
    <header>
      <app-header></app-header>
    </header>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
console.log(document.cookie);

export default {
  created() {
    console.log('ehy', document.cookie);
  },
  components: {
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
@import './css/main.css'