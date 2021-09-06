<template>
    <b-container>
        <TaskCards :taskList="taskList"/>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskCards from "./tasks/TaskCards.vue"

export default {
    name: "Home",
    components:{
        TaskCards
    },
    computed:{
        ...mapGetters(["taskList"])
    },
    beforeCreate(){
        this.$store.dispatch("getAllTasks");
    }
}
</script>