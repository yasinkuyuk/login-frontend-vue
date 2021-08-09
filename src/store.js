import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: "",
        username:""
    },
    getters: {
        token(state) {
            return state.token;
        },
        username(state){
            return state.username;
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USERNAME(state,username){
            state.username = username;
        }
    },
    actions: {
        async setToken({ commit }, user) {
            try {
                const response = await axios.post("/login", { "username": user.username, "password": user.password });
                commit("SET_TOKEN", response.data.token);
                commit("SET_USERNAME",user.username);
            } catch (error) {
                console.error(error);
            }
        }
    }
});