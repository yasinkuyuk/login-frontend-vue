<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item
          ><router-link to="/" id="router">Home</router-link></b-nav-item
        >

        <template v-if="token">
          <b-nav-item right>
            <router-link
              :to="{ name: 'profile', params: { public_id: public_id } }"
              id="router"
              >{{ username }}</router-link
            >
          </b-nav-item>
                  <b-button variant="danger" size="sm" @click="signout">Sign Out</b-button>

        </template>
        <template v-else>
          <b-nav-item right>
            <router-link to="/login" id="router">Login</router-link>
          </b-nav-item>
          <b-nav-item right>
            <router-link to="/register" id="router">Register</router-link>
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
    ...mapGetters(["token", "username", "public_id"])
  },
  methods: {
      signout(){
          this.$store.dispatch("signOut");
          this.$router.push({
              name:"index"
          });
      }
  }
};
</script>
