import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "./components/Login.vue"
import Profile from "./components/Profile.vue"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes:[
        {
            path:"/",
            name:"index",
            component:Login
        },
        {
            path:"/:username",
            name:"profile",
            component:Profile
        }
    ],
    mode:"history"
})