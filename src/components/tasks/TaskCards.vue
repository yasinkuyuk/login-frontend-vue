<template>
  <div>
    <TaskCard v-for="task in taskList" :key="task.id" :task="task" />
  </div>
</template>

<script>
import TaskCard from "./TaskCard.vue"

export default {
  name: "TaskCards",
  components:{TaskCard},
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
