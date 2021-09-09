<template>
  <div>
    <p>
      {{ $t("signUpSentence") }}
      <router-link to="/login">{{ $t("signIn") }}</router-link>
    </p>
    <form @submit.prevent="register">
      <div class="username">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.username.$error }"
        >
          <label class="form__label">{{ $t("username") }}</label>
          <input type="text" v-model.trim="$v.username.$model" />
        </div>
        <div class="error" v-if="!$v.username.minLength">
          {{ $t("username_length") }}: {{ $v.username.$params.minLength.min }}
          {{ $t("letters") }}
        </div>
      </div>
      <div class="password">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <label class="form__label">{{ $t("password") }}</label>
          <input type="password" v-model.trim="$v.password.$model" />
        </div>
        <div class="error" v-if="!$v.password.minLength">
          {{ $t("password_length") }} {{ $v.password.$params.minLength.min }}
          {{ $t("letters") }}
        </div>
      </div>
      <div class="confirmed">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.confirmed.$error }"
        >
          <label class="form__label">{{ $t("password") }}</label>
          <input type="password" v-model.trim="$v.confirmed.$model" />
        </div>
        <div class="error" v-if="!$v.confirmed.sameAsPassword">
          {{ $t("password_match") }}
        </div>
      </div>
      <b-button
        @click.prevent="register"
        variant="success"
        size="sm"
        :disabled="submitStatus === 'PENDING'"
      >
        {{ $t("signUp") }}
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
import axios from "axios";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmed: "",
      submitStatus: null,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmed: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    makeJSON() {
      return {
        username: this.username,
        password: this.password,
        admin: false,
      };
    },
    async register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const response = await axios.post("/user", this.makeJSON());
        console.log(response.data);
        this.$router.push({ name: "login" });
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
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