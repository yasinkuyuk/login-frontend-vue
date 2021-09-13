import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/components/Home.vue")
        },
        {
            path: "/login",
            name: "login",
            component: ()=>import("@/components/Login.vue"),
            meta:{
                requiresNotAuth: true
            }
        },
        {
            path: "/register",
            name: "register",
            component: ()=>import("@/components/Register.vue"),
            meta:{
                requiresNotAuth: true
            }
        },
        {
            path:"/profile/tasks",
            name:"task",
            component: ()=>import("@/components/ProfileTasks.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path:"/test",
            name:"test",
            component:()=>import("@/components/Test.vue"),
            // meta:{
            //     requiresNotAuth:true
            // }
        },
        // set another path before params path
        {
            path: "/profile/:public_id",
            name: "profile",
            component: ()=>import("@/components/Profile.vue"),
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