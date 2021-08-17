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
              @click="changeStatus(taskItem.id)"
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
export default {
  name: "CompletedTasks",
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
    changeStatus(id) {
      this.$store.dispatch("changeStatus", id);
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
};
</script>

<style scoped>
#completed {
  text-decoration: line-through;
  color: gray;
}
</style>