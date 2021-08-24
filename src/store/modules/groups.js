/* eslint-disable no-unused-vars */
import axios from "axios";
import showAlert from "@/utils/alerts.js";

export default {
  state: {
    mode: "list",
    groups: [],
    group: {},
    orientations: [],
  },
  mutations: {
    changeMode(state, data) {
      state.mode = data.mode;
      if (data.group) {
        state.group = data.group;
      }
    },
    pushGroup(state, group) {
      state.groups.push(group);
    },
    setOrientations(state, orientations) {
      state.orientations = orientations;
    },
    modifyGroup(state, modified_group) {
      state.groups.forEach((group) => {
        if (group.id == modified_group.id) {
          group.id = modified_group.id;
          group.name = modified_group.name;
          group.year = modified_group.orientation.year;
          group.full_name = modified_group.full_name;
          group.id_orientation = modified_group.orientation.id;
          group.orientation_name = modified_group.orientation.name;
        }
      });
    },
    removeGroup(state, id){
      state.groups.forEach((group, index, array) => {
        if (parseInt(group.id) == id) {
          array.splice(index, 1);
        }
      });
    }
  },
  actions: {
    async getOrientations({ rootState, commit }) {
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
    async getGroups({ rootState, commit }) {
      await axios({
        method: "get",
        url: rootState.API_URL + "/group",
        headers: rootState.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            res.data.forEach((group) => {
              group.full_name =
                (group.year == "1" || group.year == "3"
                  ? group.year + "ero"
                  : group.year + "do") + ` ${group.name}`;
              commit("pushGroup", group);
            });
          } else {
            console.log("Error: getGroups -> " + res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteGroup({ rootState, commit }, data /* id, group_name, group_year */) {
      data.id = parseInt(data.id);
      await axios({
        method: "delete",
        url: rootState.API_URL + "/group",
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          // Si la consulta salio bien
          if (res.data == 1) {
            // Elimino el objeto del array
            commit("removeGroup", data.id)

            // Lanzando alerta
            showAlert({
              type: "info",
              message: `El grupo ${data.year}${data.name} fue eliminado correctamente!`,
            });
          } else {
            showAlert({
              type: "error",
              message: `El grupo ${data.year}${data.name} no pudo ser eliminado, actualice la página e intente nuevamente`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
