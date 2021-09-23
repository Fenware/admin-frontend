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
    changeUser(state, edited_user) {
      state.users.forEach((user) => {
        if (user.id == edited_user.id) {
          user.name = edited_user.name;
          user.middle_name = edited_user.middle_name;
          user.surname = edited_user.surname;
          user.email = edited_user.email;
          user.nickname = edited_user.nickname;
          user.avatar = edited_user.avatar;
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
            res.data.forEach((user) => {
              if (!user.middle_name) {
                user.middle_name = "";
              }
              if (!user.second_surname) {
                user.second_surname = "";
              }
            });
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
    async editUser({ rootState, commit }, payload) {
      /* let data = { user: parseInt(payload.id) }; */
      payload.id = parseInt(payload.id);
      await axios({
        method: "put",
        url: rootState.API_URL + "/user",
        data: { user: payload },
        headers: rootState.headers,
      })
        .then((res) => {
          console.log(res);

          if (res.data == 1) {
            commit("changeUser", payload);
            showAlert({
              type: "success",
              message: `El usuario ${payload.name} fue modificado correctamente!`,
            });
          } else {
            showAlert({
              type: "error",
              message: `Hubo un error, intente nuevamente`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
