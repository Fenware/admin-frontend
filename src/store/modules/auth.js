import axios from "axios";
import router from "@/router/index";

// Modulo donde manejo las alertas
import showAlert from "@/utils/alerts";

export default {
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    token: null,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setHeaderToken(state, payload) {
      state.headers.Authorization = payload;
    },
  },
  actions: {
    syncToken({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setToken", localStorage.getItem("token"));
        commit("setHeaderToken", "Bearer " + localStorage.getItem("token"));
      } else {
        console.log("");
      }
    },
    logout({ commit }) {
      commit("setToken", null);
      commit("setHeaderToken", "");
      localStorage.removeItem("token");
      router.push("login");
    },
    async checkSession({ state, dispatch }) {
      await axios({
        method: "post",
        url: state.API_URL + "/token",
        data: {},
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          if (res.data != "OK") {
            dispatch("logout");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async login({ state, commit, dispatch }, user) {
      await axios({
        method: "post",
        url: state.API_URL + "/auth",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (typeof res.data.result.token == "string") {
            let token = res.data.result.token;
            commit("setToken", token);
            localStorage.setItem("token", token);
            dispatch("syncToken");
            router.push("/inicio");
          } else {
            console.log("Error: login");
            showAlert({type: "error", message: res.data.result.error_msg});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
