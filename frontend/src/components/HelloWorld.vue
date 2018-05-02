<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org/en" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <div class="elevation-demo">
    <md-content class="md-elevation-1">1</md-content>
    <md-content class="md-elevation-2">2</md-content>
    <md-content class="md-elevation-3">3</md-content>
    <md-content class="md-elevation-4">4</md-content>
    <md-content class="md-elevation-5">5</md-content>
    <md-content class="md-elevation-6">6</md-content>
    <md-content class="md-elevation-7">7</md-content>
    <md-content class="md-elevation-8">8</md-content>
    <md-content class="md-elevation-9">9</md-content>
    <md-content class="md-elevation-10">10</md-content>
    <md-content class="md-elevation-11">11</md-content>
    <md-content class="md-elevation-12">12</md-content>
    <md-content class="md-elevation-13">13</md-content>
    <md-content class="md-elevation-14">14</md-content>
    <md-content class="md-elevation-15">15</md-content>
    <md-content class="md-elevation-16">16</md-content>
    <md-content class="md-elevation-17">17</md-content>
    <md-content class="md-elevation-18">18</md-content>
    <md-content class="md-elevation-19">19</md-content>
    <md-content class="md-elevation-20">20</md-content>
    <md-content class="md-elevation-21">21</md-content>
    <md-content class="md-elevation-22">22</md-content>
    <md-content class="md-elevation-23">23</md-content>
    <md-content class="md-elevation-24">24</md-content>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
