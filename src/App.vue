<template>
  <div id="app">
    <NavigationBar />
    <router-view :key="$route.path"> </router-view>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import NavigationBar from "./components/NavigationBar.vue"
// import {eventBus} from "./event"

export default {
  name: 'App',
  components:{
    NavigationBar
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#router {
  color:inherit;
  text-decoration: none;
}
</style>
