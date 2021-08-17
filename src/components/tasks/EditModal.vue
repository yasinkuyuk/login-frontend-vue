<template>
  <div>
    <b-modal id="modal-scoped" :title="modalTitle">
      <input type="text" placeholder="Title" v-model="taskTitle" />
      <input type="text" placeholder="Description" v-model="taskDescription" />
      <input type="datetime-local" v-model="taskDueDate" />
      <template #modal-footer="{ ok }">
        <b-button
          :disabled="!canEditTask"
          size="sm"
          variant="success"
          @click="editTask(taskID, ok)"
        >
          <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>Update
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { eventBus } from "../event";
export default {
  name: "EditModal",
  computed: {
    canEditTask() {
      return this.taskTitle != "" && this.taskDescription != "";
    },
  },
  data() {
    return {
      modalTitle: "",
      taskID: -1,
      taskTitle: "",
      taskDescription: "",
      taskDueDate: "",
      message: "",
    };
  },
  methods: {
    setModal(task) {
      this.modalTitle = task.title;
      this.taskID = task.id;
    },
    editTask(editedID, ok) {
      this.message = this.taskTitle + " task has been edited!";
      eventBus.$emit(
        "editTask",
        editedID,
        this.taskTitle,
        this.taskDescription,
        this.taskDueDate
      );
      eventBus.$emit("toastMessage", this.message, "warning");
      this.taskTitle = "";
      this.taskDescription = "";
      this.taskDueDate = "";
      this.message = "";
      ok();
    },
  },
  mounted() {
    eventBus.$on("setModalProperties", this.setModal);
  },
  beforeDestroy() {
    eventBus.$$off("setModalProperties", this.setModal);
  },
};
</script>