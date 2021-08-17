<template>
  <b-container>
    <h3>Uncompleted Tasks</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Title</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="taskItem in unCompletedTasks" :key="taskItem.id">
            <td v-if="editFlag">
            <b-dropdown-item-button
              default="unchecked"
              @click="changeStatus(taskItem.id)"
              v-if="editFlag"
              ><b-icon icon="x-circle"></b-icon
            ></b-dropdown-item-button>
          </td>
            <b-td>{{taskItem.id}}</b-td>
          <b-td>{{ taskItem.title }}</b-td>
          <b-td>{{ taskItem.description }}</b-td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default {
  name: "UncompletedTasks",
  computed:{
        editFlag(){
            if(this.$route.name === "index"){
                return false;
            }
            return true;
        }
    },
  props:{
      unCompletedTasks:{
          type: Array,
          default: ()=> []
      }
  },
  methods:{
      async changeStatus(id){
          await this.$store.dispatch("changeStatus",id);
      }
  }
};
</script>