<template>
  <b-container>
      <b-row>
        <b-col v-for="task in paginatedTasks" :key="task.id" cols="3">
            <TaskCard :task="task"  class="mt-3"/>
        </b-col>
      </b-row>
      <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="taskList.length"
          align="right"
          size="sm"
        ></b-pagination>
  </b-container>
</template>

<script>
import TaskCard from "./TaskCard.vue";

export default {
  name: "TaskCards",
  components: { TaskCard },
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    paginatedTasks() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.taskList.slice(start, end);
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 8
    };
  }
};
</script>
