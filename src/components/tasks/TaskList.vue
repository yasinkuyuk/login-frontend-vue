<template>
  <b-container>
    <div v-if="taskListSize === 0">There is no task!</div>
    <div v-else>
      <TaskTable :taskList="completedTasks" tableTitle="Completed" />
      <TaskTable :taskList="unCompletedTasks" tableTitle="Uncompleted" />
      <ChangeTaskModal />
    </div>
  </b-container>
</template>
<script>
import TaskTable from "./TaskTable.vue"
import { mapGetters } from "vuex";
import ChangeTaskModal from './changeTaskModal.vue';

export default {
  name: "TaskList",
  components: {
    TaskTable,
    ChangeTaskModal
  },
  computed: {
    ...mapGetters(["taskList", "taskListSize"]),
    completedTasks() {
      return this.taskList.filter((element) => element.status === true);
    },
    unCompletedTasks() {
      return this.taskList.filter((element) => element.status === false);
    },
  },
  beforeCreate() {
    if (this.$route.name === "index") {
      this.$store.dispatch("getAllTasks");
      console.log("x")
    } else {
      this.$store.dispatch("getUserTasks");
    }
  },
};
</script>