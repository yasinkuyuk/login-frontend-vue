<template>
  <b-container>
    <div>
      <div>
        <form @submit.prevent="updatePassword">
          <div class="newPassword">
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.newPassword.$error }"
            >
              <label class="form__label">{{ $t("newPassword") }}</label>

              <input type="password" v-model.trim="$v.newPassword.$model" />
            </div>
            <div class="error" v-if="!$v.newPassword.minLength">
              {{ $t("password_length") }}
              {{ $v.newPassword.$params.minLength.min }}
              {{ $t("letters") }}
            </div>
          </div>
          <div class="confirmNewPassword">
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.confirmNewPassword.$error }"
            >
              <label class="form__label">{{ $t("confirm") }}</label>

              <input
                type="password"
                v-model.trim="$v.confirmNewPassword.$model"
              />
            </div>
            <div class="error" v-if="!$v.confirmNewPassword.sameAsPassword">
              {{ $t("password_match") }}
            </div>
          </div>
          <div class="old">
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.oldPassword.$error }"
            >
              <label class="form__label">{{ $t("oldPassword") }}</label>

              <input type="password" v-model.trim="$v.oldPassword.$model" />
            </div>
            <div class="error" v-if="!$v.oldPassword.minLength">
              {{ $t("password_length") }}:
              {{ $v.oldPassword.$params.minLength.min }}
              {{ $t("letters") }}
            </div>
          </div>
          <b-button
            @click.prevent="updatePassword"
            variant="success"
            size="sm"
            :disabled="submitStatus === 'PENDING'"
          >
            {{ $t("addTask") }}
          </b-button>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">
            Please fill the form correctly.
          </p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">
            Sending..
          </p>
        </form>
      </div>
      <b-button variant="danger" size="sm" v-b-modal.deleteModal>
        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        {{ $t("deleteUser") }}
      </b-button>
    </div>
    <DeleteModal />
  </b-container>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import DeleteModal from "./DeleteModal.vue";

export default {
  name: "Profile",
  components: {
    DeleteModal,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      submitStatus: null,
    };
  },
  validations: {
    oldPassword: {
      required,
      minLength: minLength(6),
    },
    newPassword: {
      required,
      minLength: minLength(6),
    },
    confirmNewPassword: {
      required,
      sameAsPassword: sameAs("newPassword"),
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    makeJSON() {
      return {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
    },
    async updatePassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        await this.$store.dispatch("updatePassword", this.makeJSON());
        this.$router.push({
          name: "index",
        });
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
  },
};
</script>
