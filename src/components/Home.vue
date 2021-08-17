<template>
    <div>
        <TaskList />
    </div>
</template>

<script>
import TaskList from "./tasks/TaskList.vue"

export default {
    name: "Home",
    components:{
        TaskList
    }
}
</script>