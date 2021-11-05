import axios from "axios";

// Modulo donde manejo las alertas
/* import { showAlert } from "@/utils/alerts"; */

export default {
  state: {
    user_consultations: [],
    consultation: {},
  },
  mutations: {
    setUserConsultations(state, consultations) {
      state.user_consultations = consultations;
    },
    setConsultation(state, consultation) {
      state.consultation = consultation;
    },
    clearConsultation(state){
      state.consultation = {};
    },
    setConsultationBody(state, body) {
      state.consultation.body = body;
    },
    setConsultationMessages(state, messages) {
      state.consultation.messages = messages;
    },
  },
  actions: {
    async getUserConsultations({ commit, rootState }) {
      let data = {
        user: parseInt(rootState.users.user.id)
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
    async getConsultation({ rootState, commit, dispatch }, id) {
      let data = { consulta: parseInt(id) };
      console.log(data);
      await axios({
        method: "post",
        url: rootState.API_URL + `/consultation/getConsultationById`,
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          if (!("result" in res.data)) {
            res.data.messages = [];
            res.data.state = parseInt(res.data.state);
            res.data.active = true;
            commit("setConsultation", res.data);
            dispatch("getConsultationMessages", id);
          } else {
            console.log("Error: getConsultation ->" + res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getConsultationMessages({ rootState, commit }, id) {
      let data = { consulta: parseInt(id) };
      await axios({
        method: "post",
        url: rootState.API_URL + `/consultation/getMessages`,
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            console.log(res.data);
            let body = res.data[0].content;
            commit("setConsultationBody", body);
            res.data.splice(0, 1);
            commit("setConsultationMessages", res.data);
          } else {
            console.log("Error: getConsultationMessages ->" + res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
