<template>
  <b-container>
    <div>
      <div>
        <h3>{{$t("updatePassword")}}</h3>
        <input
          type="password"
          v-model="newPassword"
          :placeholder="$t('newPassword')"
        />
        <input
          type="password"
          v-model="confirmedPassword"
          :placeholder="$t('confirm')"
        />
        <input
          type="password"
          v-model="oldPassword"
          :placeholder="$t('oldPassword')"
        />
        <b-button
          variant="success"
          type="submit"
          :disabled="!canUpdate"
          @click="updatePassword"
          size="sm"
        >
          {{$t("updatePassword")}}
        </b-button>
        <b-button variant="danger" size="sm" v-b-modal.deleteModal>
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon> {{$t("deleteUser")}}
        </b-button>
      </div>
    </div>
    <DeleteModal />
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteModal from "./DeleteModal.vue"

export default {
  name: "Profile",
  components: {
    DeleteModal,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmedPassword: "",
    };
  },
  computed: {
    ...mapGetters(["token"]),
    canUpdate() {
      return (
        this.newPassword === this.confirmedPassword &&
        this.oldPassword &&
        this.newPassword
      );
    },
  },
  methods: {
    makeJSON() {
      return {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
    },
    async updatePassword() {
      await this.$store.dispatch("updatePassword", this.makeJSON());
      this.$router.push({
        name: "index",
      });
    },
  }
};
</script>
