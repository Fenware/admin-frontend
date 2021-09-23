import axios from "axios";
// Modulo donde manejo las alertas
// eslint-disable-next-line no-unused-vars
import { showAlert } from "@/utils/alerts";
export default {
  state: {
    users: [],
    user: {},
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      console.log(user);
      state.user = user;
    },
    removeUser(state, user_id) {
      state.users.forEach((user, index, array) => {
        if (parseInt(user.id) == user_id) {
          array.splice(index, 1);
        }
      });
    },
  },
  actions: {
    async getUsers({ rootState, commit }) {
      await axios({
        method: "get",
        url: rootState.API_URL + "/user",
        headers: rootState.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            commit("setUsers", res.data);
          } else {
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    async deleteUser({ rootState, commit }, payload) {
      let data = { user: payload.user_id };
      await axios({
        method: "delete",
        url: rootState.API_URL + "/user",
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            commit("removeUser", payload.user_id);
            showAlert({
              type: "info",
              message: `Usuario <b>${payload.username}</b> dado de baja correctamente`,
            });
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
