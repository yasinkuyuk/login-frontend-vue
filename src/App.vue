<template>
  <div id="app">
    <NavigationBar />
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view :key="$route.path"> </router-view>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue"

export default {
  name: 'App',
  components:{
    NavigationBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#router {
  color:inherit;
  text-decoration: none;
}
</style>
