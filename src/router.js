import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "./components/Login.vue"
import Profile from "./components/Profile.vue"
import Register from "./components/Register.vue"
import Home from "./components/Home.vue"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "index",
            component: Home
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        // set another path before params path
        {
            path: "/profile/:public_id",
            name: "profile",
            component: Profile
        }
    ],
    mode: "history"
})