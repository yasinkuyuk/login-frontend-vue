<template>
  <b-container>
    <h3>Uncompleted Tasks</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <td></td>
          <td>Title</td>
          <td>Description</td>
          <td>Due Date</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="taskItem in unCompletedTasks" :key="taskItem.id">
          <td>
            <b-dropdown-item-button
              default="unchecked"
              v-if="editFlag"
              @click="showModal(taskItem.id)"
              ><b-icon icon="x-circle"></b-icon
            ></b-dropdown-item-button>
          </td>
          <b-td>{{ taskItem.title }}</b-td>
          <b-td>{{ taskItem.description }}</b-td>
          <b-td>{{ getStringFormatOfDate(taskItem.dueDate) }}</b-td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import { eventBus } from "../../event";
export default {
  name: "UncompletedTasks",
  data() {
    return {
      editedID: null,
    };
  },
  computed: {
    editFlag() {
      if (this.$route.name === "index") {
        return false;
      }
      return true;
    },
  },
  props: {
    unCompletedTasks: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async changeStatus(functionality) {
      if (functionality === "change") {
        await this.$store.dispatch("changeStatus", this.editedID);
        this.editedID = null;
      }
    },
    getStringFormatOfDate(date) {
      var day = date.substring(8, 10);
      var month = date.substring(5, 7);
      var year = date.substring(0, 4);
      var hour = date.substring(11, 13);
      var minute = date.substring(14, 16);
      var arrangedDate =
        day + "/" + month + "/" + year + " " + hour + ":" + minute;
      return arrangedDate;
    },
    showModal(id) {
      this.$bvModal.show("modal-scoped");
      this.$set(this, "editedID", id);
    },
  },
  mounted() {
    eventBus.$on("sendSignal", this.changeStatus);
  },
  beforeDestroy() {
    eventBus.$off("sendSignal", this.changeStatus);
  },
};
</script>