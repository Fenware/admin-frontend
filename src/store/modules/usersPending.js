import axios from "axios";
import { showAlert } from "@/utils/alerts.js";

export default {
  state: () => ({
    users_pending: [],
    // "all" para que no me filtre los usuarios por defect
    filter_by: "all",
    // Variable para buscar usuario
    text_filter: "",
  }),
  mutations: {
    setUsersPending(state, users) {
      state.users_pending = users;
    },
    removeUserPending(state, id) {
      // Busco al usuario por su id y lo elimino del array
      state.users_pending.forEach((user, index) => {
        if (user.id == id) {
          state.users_pending.splice(index, 1);
        }
      });
    },
    setTextFilter(state, text) {
      state.text_filter = text;
    },
    setFilter(state, filter) {
      state.filter_by = filter;
    },
  },
  getters: {
    usersFiltered(state) {
      // Filtrando siempre por tipo de usuario
      let users_filtered =
        state.filter_by == "all"
          ? state.users_pending
          : state.users_pending.filter((user) => user.type == state.filter_by);

      // Si el filtro es un numero ( osea una cedula )
      if (!isNaN(parseInt(state.text_filter))) {
        // Filtra los usuarios por coincidencias de cedula
        users_filtered = users_filtered.filter(
          (user) => user.ci.indexOf(state.text_filter.toString()) >= 0
        );

        // Si no es un numero y lo ingresado no son espacios
      } else if (
        isNaN(parseInt(state.text_filter)) &&
        state.text_filter.trim() != ""
      ) {
        users_filtered = users_filtered.filter((user) => {
          // Concateno nombres y apellidos
          let nombre =
            user.name +
            " " +
            user.middle_name +
            " " +
            user.surname +
            " " +
            user.second_surname;

          // Filtro usuario si hay coincidencias de lo ingresado con el nombre
          return nombre.indexOf(state.text_filter.toString()) >= 0;
        });
      }
      return users_filtered;
    },
  },
  actions: {
    async getUsersPending({ rootState, commit }) {
      await axios({
        method: "post",
        url: rootState.API_URL + "/user/getPendantUsers",
        headers: rootState.headers,
      })
        .then((res) => {
          commit("setUsersPending", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async declineUserPending({ rootState, commit }, user) {
      await axios({
        method: "post",
        url: rootState.API_URL + "/user/rejectUser",
        data: {
          // Id del usuario a rechazar
          id: parseInt(user.id),
        },
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            // Quito al usuario de la lista
            commit("removeUserPending", parseInt(user.id));
            // Lanzo una alerta
            showAlert({
              type: "info",
              message: `Has rechazado al ${
                user.type == "student" ? "estudiante" : "docente"
              } ${user.name} ${user.surname} correctamente`,
            });
          } else {
            console.log("Error: declineUserPending");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async acceptUserPending({ rootState, commit }, user) {
      await axios({
        method: "post",
        url: rootState.API_URL + "/user/acceptUser",
        data: {
          // Id del usuario a aceptar
          id: parseInt(user.id),
        },
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            // Quito al usuario de la lista
            commit("removeUserPending", parseInt(user.id));
            // Lanzo una alerta
            showAlert({
              type: "info",
              message: `Has aceptado al ${
                user.type == "student" ? "estudiante" : "docente"
              } ${user.name} ${user.surname}`,
            });
          } else {
            console.log("Error: acceptUserPending");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
