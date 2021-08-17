<template>
  <b-container>
    <input type="text" placeholder="Title" v-model="tempTitle" />
    <input type="text" placeholder="description" v-model="tempDescription" />
    <!-- <input type="datetime-local" placeholder="Due Date" v-model="date" /> -->
    <b-button
      type="submit"
      @click="addtask"
      :disabled="!canAddTask"
      variant="success"
      >Add task
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: "AddTask",
  computed: {
    canAddTask() {
      return this.tempTitle != "" && this.tempDescription != "";
    }
  },
  data(){
    return{
      tempTitle:"",
      tempDescription:"",
    //   date:""
    }
  },
  methods: {
    // getDate() {
    //   var date = new Date();
    //   var day = String(date.getDate()).padStart(2, "0");
    //   var month = String(date.getMonth() + 1).padStart(2, "0");
    //   var year = date.getFullYear();
    //   var hour = date.getHours();
    //   var minute = date.getMinutes();
    //   var second = date.getSeconds();
    //   var today =
    //     day +
    //     "/" +
    //     month +
    //     "/" +
    //     year +
    //     " " +
    //     hour +
    //     ":" +
    //     minute +
    //     ":" +
    //     second;
    //   return today;
    // },
    makeTaskItem() {
      const task = {
        // completedTime: "",
        title: this.tempTitle,
        description: this.tempDescription,
        // dateCreated: this.getDate(),
        status: true,
        // dueDate: this.date,
      };
      return task;
    },
    addtask() {
      this.$store.dispatch("createTask",this.makeTaskItem());
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#completed {
  text-decoration: line-through;
  color: gray;
}
caption {
  font-weight: bold;
}
thead {
  font-weight: bold;
}
</style>