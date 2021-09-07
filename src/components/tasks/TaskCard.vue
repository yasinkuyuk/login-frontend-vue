<template>
  <div>
    <template v-if="task.status">
      <b-card
        :title="task.title"
        :img-src="require('../../assets/done-task.jpeg')"
        img-alt="Image"
        img-top
      >
        <b-card-text id="completed">
          {{ task.description }}
        </b-card-text>
        <template #footer>
          <div><b-img-lazy :src="require('../../assets/user.png')" width="20" height="20"/> {{username}}</div>
          <small class="text-muted">{{
            getStringFormatOfDate(task.dueDate)
          }}</small>
        </template>
      </b-card>
    </template>
    <template v-else>
      <b-card
        :title="task.title"
        :img-src="require('../../assets/in-progress_test.jpeg')"
        img-alt="Image"
        img-top
      >
        <b-card-text> {{ task.description }}</b-card-text>
        <template #footer>
          <div><b-img-lazy :src="require('../../assets/user.png')" width="20" height="20"/> {{username}}</div>
          <small class="text-muted">{{ task.dueDate }}</small>
        </template>
      </b-card>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TaskCard",
  data() {
    return {
      username: "",
    };
  },
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
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
  async mounted() {
    try {
      const response = await axios.get(
        `/user/getUsernameById/${this.task.user_id}`
      );
      this.$set(this,"username",response.data);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
#completed {
  text-decoration: line-through;
  color: gray;
}
</style>
