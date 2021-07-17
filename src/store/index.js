import { createStore } from "vuex";
import router from "@/router/index";
import axios from "axios";

export default createStore({
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    subjects: [],
    orientation: {},
    orientations: [],
    orientations_subjects: [],
    users_pending: [],
    token: null,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    text_filter: "",
    original_subjects_selected: [],
    subjects_selected: [],
    create_orientation_mode: false,
    modify_orientation_mode: false,
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
    addOriginalOrientationSubjects(state, payload) {
      state.original_subjects_selected.push(payload);
    },
    setModifyOrientationSubjects(state, payload) {
      state.subjects_selected = payload;
    },
    onlySelectOrientationSubject(state, id) {
      state.subjects_selected.push(id);
    },
    onlyDeleteOrientationSubject(state, id) {
      state.subjects_selected.forEach((subject_id, index) => {
        if (subject_id == id) {
          state.subjects_selected.splice(index, 1);
        }
      });
    },
    toogleCreateOrientationMode(state) {
      state.create_orientation_mode = !state.create_orientation_mode;
    },
    toogleModifyOrientationMode(state) {
      state.modify_orientation_mode = !state.modify_orientation_mode;
    },
    setOrientation(state, orientation) {
      state.orientation = orientation;
    },
    removeOrientation(state, id) {
      state.orientations.forEach((orientation, index) => {
        if (parseInt(orientation.id) == id) {
          state.orientations.splice(index, 1);
        }
      });
    },
    setOrientationSubject(state, payload) {
      state.orientations_subjects.push(payload);
    },
    clearOrientationSubjects(state) {
      state.orientations_subjects = [];
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
          let id = parseInt(res.data);
          if (res.data != "error") {
            subject.id = id;
            commit("addSubject", subject);
          } else {
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
          if (res.data != 0) {
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
    async syncOrientations({ commit, dispatch, state }) {
      await axios({
        method: "get",
        url: state.API_URL + "/orientacion",
        headers: state.headers,
      })
        .then((res) => {
          commit("setOrientations", res.data);
          dispatch("syncOrientationSubjects");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createOrientation({ commit, dispatch, state }, orientation) {
      var subjects = state.subjects_selected;

      var data = {
        name: orientation.name,
        year: parseInt(orientation.year),
        subjects: subjects,
      };
      console.log(data);
      await axios({
        method: "post",
        url: state.API_URL + "/orientacion",
        data: data,
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          commit("addOrientation", data);
          dispatch("syncOrientationSubjects");
          commit("toogleCreateOrientationMode");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editOrientationSubjects({ state }, orientation_data) {
      var data = {
        id: parseInt(orientation_data.id),
        subjects: orientation_data.subjects,
      };
      await axios({
        method: "post",
        url: state.API_URL + "/orientacion-materia",
        data: data,
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async modifyOrientation({ commit, state }, orientation_data) {
      var data = {
        id: parseInt(orientation_data.id),
        name: orientation_data.name,
        year: parseInt(orientation_data.year),
      };
      console.log(data);
      await axios({
        method: "put",
        url: state.API_URL + "/orientacion",
        data: data,
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          commit("toogleModifyOrientationMode");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteOrientation({ commit, state }, id) {
      var data = {
        id: parseInt(id),
      };
      console.log(data);
      await axios({
        method: "delete",
        url: state.API_URL + "/orientacion",
        data: data,
        headers: state.headers,
      })
        .then(() => {
          commit("removeOrientation", id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in error",
      });
    },
    async getOrientationSubjects({ state, commit }, id) {
      let data = `id=${id}`;
      await axios({
        method: "get",
        url: state.API_URL + `/orientacion-materia?${data}`,
        headers: state.headers,
      })
        .then((res) => {
          let orientation_subjects_res = [];

          res.data.forEach((subject_data) => {
            orientation_subjects_res.push(subject_data);
          });

          orientation_subjects_res.forEach((orientation_subject) => {
            state.subjects.forEach((subject_data) => {
              if (orientation_subject.id_subject == parseInt(subject_data.id)) {
                let subject = {
                  id_orientation: parseInt(orientation_subject.id_orientation),
                  id_subject: parseInt(orientation_subject.id_subject),
                  name: subject_data.name,
                };
                commit("setOrientationSubject", subject);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    syncOrientationSubjects({ dispatch, commit, state }) {
      commit("clearOrientationSubjects");
      state.orientations.forEach((orientation) => {
        dispatch("getOrientationSubjects", orientation.id);
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
    orientationsFiltered(state) {
      let subjectsFiltered = [];
      state.subjects.forEach((subject) => {
        let name = subject.name.toLowerCase();
        if (name.indexOf(state.text_filter) >= 0) {
          subjectsFiltered.push(subject);
        }
      });
      return subjectsFiltered;
    },
    orientationSubjctsFiltered(state) {
      return state.orientations_subjects;
    },
  },
});
