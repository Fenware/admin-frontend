import { createStore } from "vuex";
import router from "@/router/index";
import axios from "axios";

export default createStore({
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    token: null,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    group: {},
    groups: [],
    subjects: [],
    orientation: {},
    orientations: [],
    orientations_subjects: [],
    text_filter: "",
    original_subjects_selected: [],
    subjects_selected: [],
    create_orientation_mode: false,
    modify_orientation_mode: false,
    create_group_mode: false,
    modify_group_mode: false,
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
    clearSubjectsSelected(state) {
      state.subjects_selected = [];
    },
    toogleCreateOrientationMode(state) {
      state.create_orientation_mode = !state.create_orientation_mode;
    },
    toogleModifyOrientationMode(state) {
      state.modify_orientation_mode = !state.modify_orientation_mode;
    },
    toogleCreateGroupMode(state) {
      state.create_group_mode = !state.create_group_mode;
    },
    toogleModifyGroupMode(state) {
      state.modify_group_mode = !state.modify_group_mode;
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
    setOrientationSubject(state, subject) {
      state.orientations_subjects.push(subject);
    },
    removeOrientationSubject(state, id) {
      state.orientations_subjects.forEach((subject, index) => {
        if (subject.id_subject == parseInt(id)) {
          state.orientations_subjects.splice(index, 1);
        }
      });
    },
    clearOrientationSubjects(state) {
      state.orientations_subjects = [];
    },
    setGroups(state, groups) {
      state.groups = groups;
    },
    setGroup(state, group) {
      state.group = group;
    },
    addGroup(state, group) {
      state.groups.push(group);
    },
    editGroup(state, modified_group) {
      /* state.groups.find(
        (group) => parseInt(group.id) == parseInt(modified_group.id)
      ).name = modified_group.name; */
      state.groups.forEach((group) => {
        if (group.id == modified_group.id) {
          group.name = modified_group.name;
          group.id_orientation = modified_group.orientacion;

          let orientation_data = state.orientations.find(
            (orientation) =>
              parseInt(orientation.id) == parseInt(modified_group.orientacion)
          );
          group.orientation_name = orientation_data.name;
        }
      });
    },
    removeGroup(state, group_data) {
      state.groups.forEach((group, index) => {
        if (group.id == group_data.id) {
          state.groups.splice(index, 1);
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
        /* router.push("login"); */
        console.log();
      }
    },
    async login({ commit, state, dispatch }, payload) {
      await axios({
        method: "post",
        url: state.API_URL + "/auth",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (typeof res.data.result.token == "string") {
            let token = res.data.result.token;
            commit("setToken", token);
            localStorage.setItem("token", token);
            dispatch('syncToken');
            router.push("/inicio");
          } else {
            console.log("Error: login");
            alert(res.data.result.error_msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout({ commit }) {
      commit("setToken", null);
      commit("setHeaderToken", "");
      localStorage.removeItem("token");
      router.push("login");
    },
    async checkSession({ state,  dispatch }) {
      await axios({
        method: "post",
        url: state.API_URL + "/token",
        data: {},
        headers: state.headers,
      })
        .then((res) => {
          console.log(res);
          if (res.data != "OK") {
            dispatch('logout');
          }
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

    async syncOrientations({ commit, dispatch, state }) {
      await axios({
        method: "get",
        url: state.API_URL + "/orientacion",
        headers: state.headers,
      })
        .then((res) => {
          console.log(res.data);
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
          data.id = res.data;
          commit("addOrientation", data);
          dispatch("syncOrientationSubjects");
          commit("toogleCreateOrientationMode");
          commit("clearSubjectsSelected");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editOrientationSubjects({ state }, orientation_data) {
      let data_subjects_added = {
        id: parseInt(orientation_data.id),
        subjects: orientation_data.subjectsAdded,
      };
      let data_subjects_removed = {
        id: parseInt(orientation_data.id),
        subjects: orientation_data.subjectsRemoved,
      };
      if (orientation_data.subjectsAdded.length > 0) {
        await axios({
          method: "post",
          url: state.API_URL + "/orientacion-materia",
          data: data_subjects_added,
          headers: state.headers,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (orientation_data.subjectsRemoved.length > 0) {
        await axios({
          method: "delete",
          url: state.API_URL + "/orientacion-materia",
          data: data_subjects_removed,
          headers: state.headers,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
