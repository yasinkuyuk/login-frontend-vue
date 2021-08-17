<template>
  <b-container>
      <h3>Completed Tasks</h3>
    <table class="table table-hover completed-tasks">
      <thead>
        <tr>
          <td>Title</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="taskItem in completedTasks" :key="taskItem.id">
          <td >
            <b-dropdown-item-button
              default="unchecked"
              @click="changeStatus(taskItem.id)"
              v-if="editFlag"
              ><b-icon icon="x-circle"></b-icon
            ></b-dropdown-item-button>
          </td>
          <td id="completed">{{ taskItem.title }}</td>
          <td id="completed">{{ taskItem.description }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default{
    name: "CompletedTasks",
    computed:{
        editFlag(){
            if(this.$route.name === "index"){
                return false;
            }
            return true;
        }
    },
    props:{
        completedTasks:{
            type:Array,
            default:() => []
        }
    },
    methods:{
        changeStatus(id){
            this.$store.dispatch("changeStatus",id);
        }
    }
}
</script>

<style scoped>
#completed {
  text-decoration: line-through;
  color: gray;
}
</style>