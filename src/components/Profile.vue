<template>
    <div>
        <h3> JWT Token Of The {{username}}</h3>
        {{token}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Profile",
    computed:{
        ...mapGetters(["token","username"])
    }
}
</script>
