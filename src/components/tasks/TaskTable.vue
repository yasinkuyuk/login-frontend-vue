<template>
  <b-container>
    <h3>{{ $t(`${tableTitle}`) }} {{ $t("tasks") }}</h3>
    <b-table
      class="table-hover"
      id="taskList"
      :items="taskList"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
      small
    >
      <template #cell(change)="row" class="changeStatus">
        <button default="unchecked" @click="showModal(row.item.id)">
          <b-icon icon="x-circle"></b-icon>
        </button>
      </template>
      <template #cell(dueDate)="row">
        {{ getStringFormatOfDate(row.item.dueDate) }}
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="tableRow"
      :per-page="perPage"
      aria-controls="taskList"
      align="right"
    ></b-pagination>
  </b-container>
</template>

<script>
import { eventBus } from "../../event";

export default {
  name: "TaskTable",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    tableRow() {
      return this.taskList.length;
    },
    fields() {
      if (this.$route.name === "index") {
        // return [
        //   {
        //     key: this.$t("title"),
        //   },
        //   {
        //     key: this.$t("description"),
        //   },
        //   {
        //     key: this.$t("dueDate"),
        //   },
        // ];
        return [
            {title : {label: this.$t("title") }},
            {description : {label: this.$t("description") }},
            {dueDate : {label: this.$t("dueDate") }}
        ];
      }
      return [
            this.$t("change"),
            {title : {label: this.$t("title") }},
            {description : {label: this.$t("description") }},
            {dueDate : {label: this.$t("dueDate") }}
        ];
    },
  },
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
    tableTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    showModal(id) {
      eventBus.$emit("sendEditedIdToModal", id);
      this.$bvModal.show("changeModal");
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
