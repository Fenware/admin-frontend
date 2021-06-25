import { createStore } from "vuex";
import router from '@/router/index';
import axios from "axios";

export default createStore({
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        await axios
          .post(this.state.API_URL + "/auth", payload, {
            headers: { "Content-Type": "application/json" },
          })
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
    },
  },
});
