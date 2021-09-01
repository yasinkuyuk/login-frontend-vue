<template>
  <div>
    <p>
      {{$t("signInSentence")}}
      <router-link to="/register">{{$t("signUp")}}</router-link>
    </p>
    <input type="text" :placeholder="$t('username')" v-model="username" id="x"/>
    <input type="password" :placeholder="$t('password')" v-model="password" />
    <b-button
      @click.prevent="login"
      :disabled="!canLogin"
      variant="success"
      size="sm"
      >{{$t("signIn")}}</b-button
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      firstRequest: true,
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["token", "public_id"]),
    canLogin() {
      return this.username && this.password;
    },
  },
  methods: {
    async login() {
      if (this.firstRequest) {
        this.$set(this, "firstRequest", false);
        await this.$store.dispatch("setToken", this.makeJSON());
        if (this.token) {
          this.$router.push({
            name: "index",
          });
        } else {
          this.username = "";
          this.password = "";
          alert("Wrong username or password. Try again later.");
        }
        this.$set(this, "firstRequest", true);
      }
    },
    makeJSON() {
      const user = {
        username: this.username,
        password: this.password,
      };
      return user;
    },
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
