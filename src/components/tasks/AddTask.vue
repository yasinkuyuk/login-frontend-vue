<template>
  <b-container>
    <input type="text" :placeholder="$t('title')" v-model="title" id="title"/>
    <input type="text" :placeholder="$t('description')" v-model="description" id="description"/>
    <input type="date" placeholder="Due Date" v-model="date" id="date"/>
    <input type="time" placeholder="Time" v-model="time" id="time"/>
    <b-button
      type="submit"
      @click="addtask"
      :disabled="!canAddTask"
      variant="success"
      >{{$t('addTask')}}
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: "AddTask",
  computed: {
    canAddTask() {
      return this.title != "" && this.description != "";
    },
    dueDate(){
      return this.date + "T" + this.time;
    }
  },
  data(){
    return{
      title:"",
      description:"",
      date:"",
      time:""
    }
  },
  methods: {
    getDate() {
      var tzoffset = new Date().getTimezoneOffset() * 60000;
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -1);
      const today = localISOTime.substring(0,16);
      return today;
    },
    makeTaskItem() {
      const task = {
        title: this.title,
        description: this.description,
        dateCreated: this.getDate(),
        status: false,
        dueDate: this.dueDate,
      };
      return task;
    },
    resetComponentData(){
      this.title="";
      this.description="";
      this.date="";
      this.time="";
    },
    addtask() {
      this.$store.dispatch("createTask",this.makeTaskItem());
      this.resetComponentData();
    }
  },
  mounted(){

  }
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