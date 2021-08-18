<template>
  <b-container>
    <div>
      <div>
        <h3>Change Password</h3>
        <input
          type="password"
          v-model="newPassword"
          placeholder="New Password"
        />
        <input
          type="password"
          v-model="confirmedPassword"
          placeholder="Confirm Password"
        />
        <input
          type="password"
          v-model="oldPassword"
          placeholder="Type Your Old Password"
        />
        <b-button
          variant="success"
          type="submit"
          :disabled="!canUpdate"
          @click="updatePassword"
          size="sm"
        >
          Update Password
        </b-button>
        <b-button variant="danger" size="sm" v-b-modal.modal-scoped>
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete User
        </b-button>
      </div>
    </div>
    <AlertModal :modalContent="modalContent" />
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { eventBus } from "../event";
import AlertModal from "./AlertModal.vue";

export default {
  name: "Profile",
  components: {
    AlertModal,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmedPassword: "",
      modalContent: {
        functionality: "delete",
        title: "Be careful !!!",
        content: "Dou you want to delete the user?",
        okButton: "Delete User",
      },
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
    async deleteUser(functionality) {
      if (functionality === "delete") {
        await this.$store.dispatch("deleteUser");
        this.$router.push({ name: "index" });
      }
    },
  },
  mounted() {
    eventBus.$on("sendSignal", this.deleteUser);
  },
  beforeDestroy() {
    eventBus.$off("sendSignal", this.deleteUser);
  },
};
</script>
