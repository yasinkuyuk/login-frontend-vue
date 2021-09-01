<template>
  <div>
    <p>
      {{$t("signUpSentence")}}
      <router-link to="/login">{{$t("signIn")}}</router-link>
    </p>
    <input type="text" :placeholder="$t('username')" v-model="username" />
    <input type="password" :placeholder="$t('password')" v-model="password" id="password"/>
    <input
      type="password"
      :placeholder="$t('confirm')"
      v-model="confirmPassword"
      id="confirm"
    />
    <b-button variant="success" type="submit" :disabled="!buttonCheck" @click="register" size="sm" >
      {{$t("signUp")}}
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
