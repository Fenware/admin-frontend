import { createStore } from "vuex";
import router from "@/router/index";
import axios from "axios";

export default createStore({
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    subjects: [],
    orientations: [],
    orientations_subjects: [],
    users_pending: [],
    token: null,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    text_filter: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setHeaderToken(state, payload) {
      state.headers.Authorization = payload;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    addSubject(state, subject) {
      state.subjects.push(subject);
    },
    changeSubjectName(state, subject) {
      state.subjects.forEach((item) => {
        if (item.id == subject.id) {
          item.name = subject.name;
        }
      });
    },
    deleteSubject(state, subjectId) {
      state.subjects.forEach((item) => {
        if (item.id == subjectId) {
          item.state = 0;
        }
      });
    },
    setText(state, payload) {
      state.text_filter = payload;
    },
    setOrientations(state, payload) {
      state.orientations = payload;
    },
    addOrientation(state, orientation) {
      state.orientations.push(orientation);
    },
    setUsersPending(state, payload) {
      state.users_pending = payload;
    },
    removeUserPending(state, id) {
      state.users_pending.forEach((user, index) => {
        if (user.id == id) {
          state.users_pending.splice(index, 1);
        }
      });
    },
  },
  actions: {
    searcher({ commit }, payload) {
      commit("setText", payload.toLowerCase());
    },
    syncToken({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setToken", localStorage.getItem("token"));
        commit("setHeaderToken", "Bearer " + localStorage.getItem("token"));
      } else {
        commit("setToken", null);
        router.push("login");
      }
    },
    async login({ commit, state }, payload) {
      await axios({
        method: "post",
        url: state.API_URL + "/auth",
        data: payload,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          let token = res.data.result.token;
          commit("setToken", token);
          localStorage.setItem("token", token);
          router.push("/inicio");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async syncSubjects({ commit, state }) {
      await axios({
        method: "get",
        url: state.API_URL + "/materia",
        headers: state.headers,
      })
        .then((res) => {
          commit("setSubjects", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createSubject({ commit, state }, subject) {
      await axios({
        method: "post",
        url: state.API_URL + "/materia",
        data: subject,
        headers: state.headers,
      })
        .then((res) => {
          if (res.status === 200) {
            subject.id = parseInt(res.data);
            commit("addSubject", subject);
          }else{
            console.log("Error: createSubject");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSubject({ commit, state }, subjectId) {
      let data = {
        id: parseInt(subjectId),
      };
      await axios({
        method: "delete",
        url: state.API_URL + "/materia",
        data: data,
        headers: state.headers,
      }) // eslint-disable-next-line
        .then((res) => {
          if (res.data == 1) {
            console.log(res);
            commit("deleteSubject", subjectId);
          } else {
            console.log("Error: removeSubject");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editSubject({ commit, state }, subject) {
      await axios({
        method: "put",
        url: state.API_URL + "/materia",
        data: subject,
        headers: state.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            commit("changeSubjectName", subject);
          } else {
            console.log("Error: editSubject");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token");
      router.push("login");
    },
    async checkSession({ state }) {
      await axios({
        method: "post",
        url: state.API_URL + "/token",
        data: {},
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          if (res.data != "OK") {
            router.push("login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async syncOrientations({ commit, state }) {
      await axios({
        method: "get",
        url: state.API_URL + "/orientacion",
        headers: state.headers,
      })
        .then((res) => {
          commit("setOrientations", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line
    async getOrientationSubjects({ state }, id) {
      var data_orientation = { id: 1 };
      /* await axios
        .get(state.API_URL + "/orientacion-materia", {
          params: data_orientation,
        },state.headers)
        .then((res) => {
          console.log(res);
        }); */

      await axios({
        method: "get",
        url: state.API_URL + "/orientacion-materia",
        params: data_orientation,
        data: data_orientation,
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createOrientation({ state }) {
      var prueba = {
        name: "Desarrollo y Soporte",
        year: 1,
        subjects: [1, 2, 3],
      };
      await axios({
        method: "post",
        url: state.API_URL + "/orientacion",
        data: prueba,
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          /* commit("setSubjects", res.data); */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line
    async syncUsersPending({ commit, state }) {
      await axios({
        method: "get",
        url: state.API_URL + "/user-pendiente",
        headers: state.headers,
      })
        .then((res) => {
          commit("setUsersPending", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async acceptUserPending({ commit, state }, id) {
      await axios({
        method: "post",
        url: state.API_URL + "/user-pendiente",
        data: { id: id },
        headers: state.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            commit("removeUserPending", id);
          } else {
            console.log("Error: acceptUserPending");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async declineUserPending({ commit, state }, id) {
      await axios({
        method: "delete",
        url: state.API_URL + "/user-pendiente",
        data: { id: id },
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          if (res.data == 1) {
            commit("removeUserPending", id);
          } else {
            console.log("Error: declineUserPending");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    subjectsFiltered(state) {
      let subjectsFiltered = [];
      state.subjects.forEach((subject) => {
        let name = subject.name.toLowerCase();
        if (name.indexOf(state.text_filter) >= 0) {
          subjectsFiltered.push(subject);
        }
      });
      return subjectsFiltered;
    },
  },
});
