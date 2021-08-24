import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        header: {
            "Content-Type": "application/json",
            "x-access-token": "",
        },
        username: "",
        public_id: "",
        taskList : [],
    },
    getters: {
        token(state) {
            return state.token;
        },
        header(state) {
            return state.header;
        },
        username(state) {
            return state.username;
        },
        public_id(state) {
            return state.public_id;
        },
        taskList(state){
            return state.taskList;
        },
        taskListSize(state){
            return state.taskList.length;
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            state.header["x-access-token"] = token;
        },
        SET_USERNAME(state, username) {
            state.username = username;
        },
        SET_PUBLIC_ID(state, id) {
            state.public_id = id;
        },
        SET_TASK_LIST(state,tasklist){
            state.taskList = tasklist;
        }
    },
    actions: {
        async setToken({ commit,getters }, user) {
            try {
                const response = await axios.post("/login", { "username": user.username, "password": user.password });
                if (response.data.token) {
                    commit("SET_TOKEN", response.data.token);
                    localStorage.setItem('token', response.data.token);
                    commit("SET_USERNAME", user.username);
                    localStorage.setItem('username', user.username);
                    const idResponse = await axios.get(`/user/${user.username}`, { headers: getters.header });
                    commit("SET_PUBLIC_ID", idResponse.data.public_id);
                    localStorage.setItem('public_id', idResponse.data.public_id);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updatePassword({ getters }, passwords) {
            try {
                const data = { "oldPassword": passwords.oldPassword, "newPassword": passwords.newPassword }
                const response = await axios.put("/user", data, { headers: getters.header });
                console.log(response.data);
            }
            catch (error) {
                console.error(error);
            }
        },
        signOut({ commit }) {
            commit("SET_TOKEN", "");
            commit("SET_USERNAME", "");
            commit("SET_PUBLIC_ID", "");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("public_id");
        },
        async deleteUser({ dispatch, getters, }) {
            try {
                const response = await axios.delete("/user", { headers: getters.header });
                alert(response.data);
                dispatch("signOut");
            } catch (error) {
                console.log(error);
            }
        },
        async createTask({getters},task){
            try {
                const response = await axios.post("/todo",task,{headers: getters.header});
                this.dispatch("getUserTasks");
                console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        },
        async getAllTasks({commit,getters}){
            try {
                const response = await axios.get("/todo",{headers: getters.header});
                commit("SET_TASK_LIST",response.data);
                localStorage.setItem("taskList",response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getUserTasks({commit,getters}){
            try {
                const response = await axios.get("/todo/getUserTodos",{headers: getters.header});
                commit("SET_TASK_LIST",response.data);
                localStorage.setItem("taskList",response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async changeStatus({dispatch,getters},id){
            try {
                await axios.put(`/todo/changeStatus`,{id},{ headers: getters.header });
                dispatch("getUserTasks");
            } catch (error) {
                console.log(error);
            }
        }
    }
});