/* eslint-disable no-unused-vars */
import axios from "axios";
import { showAlert } from "@/utils/alerts.js";

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
    clearGroups(state) {
      state.groups = [];
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
    removeGroup(state, id) {
      state.groups.forEach((group, index, array) => {
        if (parseInt(group.id) == id) {
          array.splice(index, 1);
        }
      });
    },
  },
  actions: {
    async getOrientations({ rootState, commit }) {
      await axios({
        method: "post",
        url: rootState.API_URL + "/orientation/getOrientations",
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
      // Limpio el array de grupos
      commit("clearGroups");

      await axios({
        method: "post",
        url: rootState.API_URL + "/group/getGroups",
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
    async deleteGroup({ rootState, commit }, data) {
      data.id = parseInt(data.id);
      await axios({
        method: "post",
        url: rootState.API_URL + "/group/delete",
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          // Si la consulta salio bien
          if (res.data == 1) {
            // Elimino el objeto del array
            commit("removeGroup", data.id);

            // Lanzando alerta
            showAlert({
              type: "info",
              message: `El grupo ${data.year}${data.name} fue eliminado correctamente`,
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
    async createGroup({ rootState, commit }, new_group) {
      let data_ok = false;

      if (new_group.name.length == 0) {
        showAlert({
          type: "error",
          message: `Debes ingresar el nombre del grupo`,
        });
        data_ok = false;
      } else if (new_group.orientation === null) {
        showAlert({
          type: "error",
          message: `Debes seleccionar una orientación`,
        });
        data_ok = false;
      } else {
        data_ok = true;
      }

      if (data_ok) {
        let data = {
          orientation: parseInt(new_group.orientation.id),
          name: new_group.name.toUpperCase(),
        };
        console.log(data);
        await axios({
          method: "post",
          url: rootState.API_URL + "/group/create",
          data,
          headers: rootState.headers,
        })
          .then((res) => {
            // Si no existe el objeto result en res.data entonces no hubieron errores
            if (!("result" in res.data)) {
              res.data.orientation_name = new_group.orientation.name;
              res.data.year = new_group.orientation.year;
              res.data.full_name =
                (res.data.year == "1" || res.data.year == "3"
                  ? res.data.year + "ero"
                  : res.data.year + "do") + ` ${res.data.name}`;

              commit("pushGroup", res.data);
              commit("changeMode", { mode: "list" });

              showAlert({
                type: "success",
                message: `El grupo ${res.data.full_name} fue creado correctamente`,
              });
            } else {
              showAlert({
                type: "error",
                message: res.data.result.error_msg,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async editGroup({ rootState, commit }, edited_group) {
      let data_ok = false;

      if (edited_group.name.length == 0) {
        showAlert({
          type: "error",
          message: `Debes ingresar el nombre del grupo`,
        });
        data_ok = false;
      } else if (edited_group.orientation === null) {
        showAlert({
          type: "error",
          message: `Debes seleccionar una orientación`,
        });
        data_ok = false;
      } else {
        data_ok = true;
      }

      if (data_ok) {
        let data = {
          id: parseInt(edited_group.id),
          orientation: parseInt(edited_group.orientation.id),
          name: edited_group.name.toUpperCase(),
        };
        await axios({
          method: "post",
          url: rootState.API_URL + "/group/modify",
          data,
          headers: rootState.headers,
        })
          .then((res) => {
            if (res.data == 1) {
              edited_group.full_name =
                (edited_group.orientation.year == "1" ||
                edited_group.orientation.year == "3"
                  ? edited_group.orientation.year + "ero"
                  : edited_group.orientation.year + "do") +
                ` ${edited_group.name}`;
              commit("modifyGroup", edited_group);
              commit("changeMode", { mode: "list" });

              showAlert({
                type: "success",
                message: `El grupo ${edited_group.full_name} fue modificado correctamente`,
              });
            } else if (res.data == 0) {
              showAlert({
                type: "info",
                message: "No has modificado ningún dato!",
              });
            } else {
              showAlert({
                type: "error",
                message: res.data.result.error_msg,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
