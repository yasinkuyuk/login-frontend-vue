<template>
  <div>
    <input type="text" title="username" v-model="username" />
    <input type="password" title="password" v-model="password" />
    <button @click="login" :disabled="!canLogin">Sign In</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed:{
    ...mapGetters(["token"]),
    canLogin(){
      return this.username  && this.password;
    }
  },
  methods: {
    login(){
      this.$store.dispatch("setToken",this.makeJSON());
      this.$router.push({
        name: "profile",
        params:{
          username: this.username
        }
      });
    },
    makeJSON(){
      const user = {
        "username" : this.username,
        "password" : this.password
      }
      return user;
    }
  },
};
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
