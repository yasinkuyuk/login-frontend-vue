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
            component: Login,
            meta:{
                requiresNotAuth: true
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta:{
                requiresNotAuth: true
            }
        },
        // set another path before params path
        {
            path: "/profile/:public_id",
            name: "profile",
            component: Profile,
            meta: {
                requiresAuth:true
            }
        }
    ],
    mode: "history"
})
/*eslint-disable*/
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.requiresNotAuth) {
        if(localStorage.getItem("token")){
            next({name:"index"})
        }
        else{
            next();
        }
    }
    else{
        next();
    }
});

router.beforeEach((to,from,next) => {
    if(to.meta && to.meta.requiresAuth) {
        if(localStorage.getItem("token")){
            next();
        }
        else{
            next({name:"login"});
        }
    }
    else{
        next();
    }
});
/*eslint-enable*/