<template>
  <b-container>
    <div v-if="taskListSize === 0">There is no task!</div>
    <div v-else>
      <CompletedTasks :completedTasks="completedTasks"  />
      <UncompletedTasks :unCompletedTasks="unCompletedTasks"  />
    </div>
  </b-container>
</template>
<script>
import CompletedTasks from "./CompletedTasks.vue";
import UncompletedTasks from "./UncompletedTasks.vue";
import { mapGetters } from "vuex";

export default {
  name: "TaskList",
  components: {
    CompletedTasks,
    UncompletedTasks,
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