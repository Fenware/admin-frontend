import { createStore } from "vuex";
import router from '@/router/index';
import axios from "axios";

export default createStore({
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    token: null,
    subjects: [
      { id: 1, name: "Matematica", state: 1 },
      { id: 2, name: "Programacion", state: 1 },
      { id: 3, name: "Base de datos", state: 1 },
      { id: 4, name: "Diseño web", state: 1 },
      { id: 5, name: "Analisis y Diseño de aplicaciones", state: 1 },
      { id: 6, name: "Gestion de Proyecto", state: 1 },
    ],
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    changeSubjectName(state, subject){
      console.log(subject.name);
      state.subjects.forEach((item, index) => {
        if(item.id == subject.id){
          item.name = subject.name;
        }
      });
    }
  },
  actions: {
    async login({ commit }, payload) {
      console.log(payload);
      try {
        await axios
          .post(this.state.API_URL + "/auth", payload)
          .then((res) => {
            var token = res.data.result.token;
            commit("setToken", token);
            localStorage.setItem("token", token);
          })
          .catch((error) => {
            console.log(error);
          });
          router.push('home');

      } catch (error) {
        console.log("error: ", error);
      }
    },
    syncToken({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setToken", localStorage.getItem("token"));
      } else {
        commit("setToken", null);
        router.push('login');
      }
    },
    logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token");
      router.push('login');
    }
  },
});
