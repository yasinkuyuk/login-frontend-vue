<template>
  <div>
    <p>
      {{ $t("signInSentence") }}
      <router-link to="/register">{{ $t("signUp") }}</router-link>
    </p>
    <form @submit.prevent="login">
      <div class="username">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.username.$error }"
        >
          <label class="form__label">{{ $t("username") }}</label>
          <input class="form__input" v-model.trim="$v.username.$model" />
        </div>
        <div class="error" v-if="!$v.username.minLength">
          {{ $t("username_length") }} {{ $v.username.$params.minLength.min }} {{ $t("letters") }}.
        </div>
      </div>
      <div class="password">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <label class="form__label">{{ $t("password") }}</label>
          <input class="form__input" v-model.trim="$v.password.$model" />
        </div>
        <div class="error" v-if="!$v.password.minLength">
          {{ $t("password_length") }} {{ $v.password.$params.minLength.min }} {{ $t("letters") }}.
        </div>
      </div>
      <b-button
        @click.prevent="login"
        variant="success"
        size="sm"
        :disabled="submitStatus === 'PENDING'"
      >
        {{ $t("signIn") }}
      </b-button>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">
        {{ $t("sending") }}
      </p>
    </form>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      submitStatus: null,
      firstRequest: true,
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(2),
    },
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
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
          this.submitStatus = "PENDING";
          setTimeout(() => {
            this.submitStatus = "OK";
          }, 500);
        }
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
