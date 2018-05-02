<template>
  <div id="app">
    <div id="nav">
    <!-- <div class="nav">
        <md-nav>
        <md-nav-logo href="#!/navbar">Logo</md-nav-logo>
        <md-nav-links>
            <a href="#!/navbar">About</a>
            <a href="https://github.com/ElvisKang/vue-material">Github</a>
        </md-nav-links>
      </md-nav>

      <md-nav>
          <md-nav-logo href="#!/navbar" pos="center">Logo</md-nav-logo>
          <md-nav-links>
              <a href="#!/navbar">About</a>
              <a href="https://github.com/ElvisKang/vue-material">Github</a>
          </md-nav-links>
      </md-nav>

      <md-nav>
          <md-nav-logo href="#!/navbar" pos="right">Logo</md-nav-logo>
          <md-nav-links pos="left">
              <a href="#!/navbar">About</a>
              <a href="https://github.com/ElvisKang/vue-material">Github</a>
          </md-nav-links>
      </md-nav>      -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
