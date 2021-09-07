<template>
  <b-container>
      <b-row>
        <b-col v-for="task in taskList" :key="task.id" cols="3">
            <TaskCard :task="task" :lazy="true" class="mt-3"/>
        </b-col>
      </b-row>
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
};
</script>
