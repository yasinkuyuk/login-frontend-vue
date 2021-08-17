<template>
  <b-container>
    <div>
      <div v-if="token">
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
    <TaskList />
    <AddTask />
    <DeleteModal />
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteModal from "./DeleteModal.vue";
import AddTask from "./tasks/AddTask.vue";
import TaskList from "./tasks/TaskList.vue"

export default {
  name: "Profile",
  components: {
    DeleteModal,
    AddTask,
    TaskList
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
  },
};
</script>
