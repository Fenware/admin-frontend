import axios from "axios";

// Modulo donde manejo las alertas
/* import { showAlert } from "@/utils/alerts"; */

export default {
  state: {
    user_consultations: [],
    consultations: {},
  },
  mutations: {
    setUserConsultations(state, consultations) {
      state.user_consultations = consultations;
    },
    setConsultation(state, consultation) {
      state.consultation = consultation;
    },
  },
  actions: {
    async getUserConsultations({ commit, rootState }, user_id) {
      let data = {
        user: parseInt(user_id)
      }
      await axios({
        method: "post",
        url: rootState.API_URL + "/consultation/getAllConsultations",
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          console.log(res);
          if (Array.isArray(res.data)) {
            commit("setUserConsultations", res.data);
          } else {
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
