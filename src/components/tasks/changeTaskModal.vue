<template>
  <b-container>
    <b-modal id="changeModal" :title="String(editedID)" >
      <p>Do you want to change 'done status' of the task?</p>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="warning" @click="cancel(ok)">
          Cancel
        </b-button>
        <b-button size="sm" variant="danger" @click="changeStatus(ok)"
          >Change Status</b-button
        >
      </template>
    </b-modal>
  </b-container>
</template>
<script>
import { eventBus } from "../../event";

export default {
  name: "ChangeTaskModal",
  data() {
    return {
      editedID: 0,
    };
  },
  methods: {
    async changeStatus(ok) {
      await this.$store.dispatch("changeStatus", this.editedID);
      ok();
    },
    cancel(ok) {
      ok();
    },
    setID(id) {
      this.$set(this, "editedID", id);
    },
  },
  mounted() {
    eventBus.$on("sendEditedIdToModal", this.setID);
  },
  beforeDestroy() {
    eventBus.$off("sendEditedIdToModal", this.setID);
  },
};
</script>
