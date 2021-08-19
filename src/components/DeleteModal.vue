<template>
  <b-container>
    <b-modal id="deleteModal" title="Delete User">
        <p>Do you want to delete user "{{username}}"?</p>
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

import { mapGetters } from 'vuex';

export default {
  name: "DeleteModal",
  computed:{
      ...mapGetters(["username"])
  },
  methods: {
    async deleteUser(ok) {
      await this.$store.dispatch("deleteUser");
      this.$router.push({name:"index"});
      ok();
    },
    cancel(ok) {
      ok();
    },
  },
};
</script>
