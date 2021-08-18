<template>
  <b-container>
    <h3>Completed Tasks</h3>
    <table class="table table-hover completed-tasks">
      <thead>
        <tr>
          <td></td>
          <td>Title</td>
          <td>Description</td>
          <td>Due Date</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="taskItem in completedTasks" :key="taskItem.id">
          <td>
            <b-dropdown-item-button
              v-if="editFlag"
              default="unchecked"
              @click="showModal(taskItem.id)"
              ><b-icon icon="x-circle"></b-icon
            ></b-dropdown-item-button>
          </td>
          <td id="completed">{{ taskItem.title }}</td>
          <td id="completed">{{ taskItem.description }}</td>
          <td id="completed">{{ getStringFormatOfDate(taskItem.dueDate) }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import { eventBus } from '../../event';
export default {
  name: "CompletedTasks",
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
    completedTasks: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showModal(id) {
      this.$bvModal.show("modal-scoped");
      this.$set(this, "editedID", id);
    },
    async changeStatus(functionality) {
      console.log(functionality)
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
  },
  mounted(){
    eventBus.$on("sendSignal",this.changeStatus);
  },
  beforeDestroy(){
    eventBus.$off("sendSignal",this.changeStatus);
  }
};
</script>

<style scoped>
#completed {
  text-decoration: line-through;
  color: gray;
}
</style>