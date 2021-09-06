<template>
  <div>
    <template v-if="task.status">
      <b-card
        :title="task.title"
        img-src="../../../public/green.png"
        img-alt="Image"
        img-top
      >
        <b-card-text>
          {{ task.description }}
        </b-card-text>
        <template #footer>
          <small class="text-muted">{{ task.dueDate }}</small>
        </template>
      </b-card>
    </template>
    <template v-else>
      <b-card
        :title="task.title"
        img-src="../../../public/red.png"
        img-alt="Image"
        img-top
      >
        <b-card-text>
          {{ task.description }}
        </b-card-text>
        <template #footer>
          <small class="text-muted">{{ task.dueDate }}</small>
        </template>
      </b-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
