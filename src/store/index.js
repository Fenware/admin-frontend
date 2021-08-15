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
    text_filter: "",
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
    setText(state, payload) {
      state.text_filter = payload;
    },
    toogleCreateGroupMode(state) {
      state.create_group_mode = !state.create_group_mode;
    },
    toogleModifyGroupMode(state) {
      state.modify_group_mode = !state.modify_group_mode;
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
    }
  }
});
