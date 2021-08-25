<template>
  <div>
    <p>
      If you have a account please
      <router-link to="/login">sign in</router-link>
    </p>
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" id="password"/>
    <input
      type="password"
      placeholder="confirm your password"
      v-model="confirmPassword"
      id="confirm"
    />
    <b-button variant="success" type="submit" :disabled="!buttonCheck" @click="register" size="sm" >
      Register
    </b-button>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    buttonCheck() {
      return (
        this.password === this.confirmPassword &&
        this.username != "" &&
        this.password != ""
      );
    },
  },
  methods: {
    makeJSON() {
      return {
        username: this.username,
        password: this.password,
        admin: false
      }
    },
    async register() {
        const response = await axios.post("/user", this.makeJSON());
        console.log(response.data);
        this.$router.push({name:"login"});
    },
  },
};
</script>
