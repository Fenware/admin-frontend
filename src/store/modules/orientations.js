/* eslint-disable no-unused-vars */
import axios from "axios";
import showAlert from "@/utils/alerts.js";
export default {
  state: {
    orientations: [],
    orientation: {},
  },
  getters: {},
  mutations: {
    setOrientations(state, orientations){
      state.orientations = orientations;
    }
  },
  actions: {
    async getOrientations({rootState, commit}) {
      await axios({
        method: "get",
        url: rootState.API_URL + "/orientacion",
        headers: rootState.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            commit("setOrientations", res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
