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
              @click="changeStatus(taskItem.id)"
              v-if="editFlag"
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
export default {
  name: "UncompletedTasks",
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
    async changeStatus(id) {
      await this.$store.dispatch("changeStatus", id);
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