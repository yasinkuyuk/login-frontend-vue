<template>
  <b-container>
    <b-modal id="modal-scoped" title="Be careful!!!">
        <p>Do you want to delete user??????</p>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="warning" @click="cancel(ok)">
          Cancel
        </b-button>
        <b-button size="sm" variant="danger" @click="deleteUser(ok)"
          >Delete User</b-button
        >
      </template>
    </b-modal>
  </b-container>
</template>
<script>
export default {
  name: "DeleteModal",
  methods: {
    async deleteUser(ok) {
      await this.$store.dispatch("deleteUser");
      this.$router.push({ name: "index" });
      ok();
    },
    cancel(ok) {
      ok();
    },
  },
};
</script>
