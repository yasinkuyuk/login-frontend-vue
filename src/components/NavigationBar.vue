<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item id="home"
          ><router-link to="/" id="router">{{ $t("home")}}</router-link></b-nav-item
        >

        <template v-if="token">
          <b-nav-item right id="username">
            <router-link
              v-if="public_id"
              :to="{ name: 'profile', params: { public_id: public_id } }"
              id="router"
              >{{ username }}</router-link
            >
          </b-nav-item>
           <b-nav-item right id="addTask">
            <router-link
              :to="{ name: 'task'}"
              id="router"
              >{{ $t("myTasks")}}</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <b-button variant="danger" size="sm" @click="signout" id="signout"
              >{{ $t("signOut")}}</b-button
            ></b-nav-item
          >
        </template>
        <template v-else>
          <b-nav-item right id="login">
            <router-link to="/login" id="router">{{ $t("signIn")}}</router-link>
          </b-nav-item>
          <b-nav-item right>
            <router-link to="/register" id="router">{{ $t("signUp")}}</router-link>
          </b-nav-item>
        </template>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavigationBar",
  computed: {
    ...mapGetters(["username", "public_id", "token"]),
  },
  methods: {
    signout() {
      this.$store.dispatch("signOut");
      this.$router.push({
        name: "login",
      });
    },
  },
  beforeCreate() {
    this.$store.commit("SET_TOKEN", localStorage.getItem("token"));
    this.$store.commit("SET_USERNAME", localStorage.getItem("username"));
    this.$store.commit("SET_PUBLIC_ID", localStorage.getItem("public_id"));
  },
};
</script>
