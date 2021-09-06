<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item id="home"
          ><router-link to="/" id="router">{{
            $t("home")
          }}</router-link></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
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
            <router-link :to="{ name: 'task' }" id="router">{{
              $t("myTasks")
            }}</router-link>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="danger"
              size="sm"
              @click="signOut"
              id="signout"
              >{{ $t("signOut") }}</b-button
            ></b-nav-item
          >
        </template>
        <template v-else>
          <b-nav-item right id="login" class="ml-auto">
            <router-link to="/login" id="router">{{
              $t("signIn")
            }}</router-link>
          </b-nav-item>
          <b-nav-item right class="ml-auto">
            <router-link to="/register" id="router">{{
              $t("signUp")
            }}</router-link>
          </b-nav-item>
        </template>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown :text="$t('lang')" right>
          <b-dropdown-item @click="switchLanguage('en')" id="en"
            ><CountryFlag country="gb" />EN</b-dropdown-item
          >
          <b-dropdown-item @click="switchLanguage('tr')" id="tr"
            ><CountryFlag country="tr" />TR</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountryFlag from "vue-country-flag";

export default {
  name: "NavigationBar",
  components: {
    CountryFlag,
  },
  computed: {
    ...mapGetters(["username", "public_id", "token"]),
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.push({
        name: "login",
      });
    },
    switchLanguage(lang) {
      this.$set(this.$i18n, "locale", lang);
      localStorage.setItem("lang", lang);
    },
  },
  beforeCreate() {
    this.$store.commit("SET_TOKEN", localStorage.getItem("token"));
    this.$store.commit("SET_USERNAME", localStorage.getItem("username"));
    this.$store.commit("SET_PUBLIC_ID", localStorage.getItem("public_id"));
  },
};
</script>
