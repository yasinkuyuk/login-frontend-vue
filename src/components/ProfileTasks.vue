<template>
    <b-container>
        <AddTask />
        <TaskList />
    </b-container>
</template>

<script>
import TaskList from './tasks/TaskList.vue'
import AddTask from "./tasks/AddTask.vue"

export default {
    name:"ProfileTasks",
    components:{
        AddTask,
        TaskList,
    },
}
</script>
