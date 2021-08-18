<template>
  <b-container>
    <div v-if="taskListSize === 0">There is no task!</div>
    <div v-else>
      <CompletedTasks :completedTasks="completedTasks"  />
      <UncompletedTasks :unCompletedTasks="unCompletedTasks"  />
      <AlertModal :modalContent="modalContent"/>
    </div>
  </b-container>
</template>
<script>
import CompletedTasks from "./CompletedTasks.vue";
import UncompletedTasks from "./UncompletedTasks.vue";
import AlertModal from "../AlertModal.vue"
import { mapGetters } from "vuex";

export default {
  name: "TaskList",
  components: {
    CompletedTasks,
    UncompletedTasks,
    AlertModal
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
  data() {
    return {
      modalContent:{
        functionality:"change",
        title: "Change Status",
        content: "Do you want to change 'done status' of the task?",
        okButton:"Change Status"
      }
    }
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