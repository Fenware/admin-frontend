import { createStore } from "vuex";
import axios from 'axios';

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
      console.log(payload);
      try {
        await axios
          .post(this.state.API_URL + "/auth", payload, {headers: {"Content-Type": "application/json"} })
          .then((res) => {
            var token = res.data.result.token;
            commit("setToken", token);
            localStorage.setItem('token', token);
          })
          .catch((error) => {
            console.log(error);
          });

          window.location.href = "http://localhost:8081/home";

      }catch (error) {
        console.log("error: ", error);
      }
    },
    syncToken({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setToken", localStorage.getItem("token"));
      } else {
        commit("setToken", null);
      }
    },
  },
});
