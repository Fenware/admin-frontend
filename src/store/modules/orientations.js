/* eslint-disable no-unused-vars */
import axios from "axios";
import showAlert from "@/utils/alerts.js";
export default {
  state: {
    mode: "list",
    orientation: {},
    orientations: [],
    subjects: [],
    // Materias que ya estan seleccionadas al obtener la orientacion
    preselected_subjects: [],
  },
  getters: {},
  mutations: {
    setOrientations(state, orientations) {
      state.orientations = orientations;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    setOrientationSubjects(state, subjects) {
      state.preselected_subjects = subjects;
    },
    changeMode(state, data) {
      state.mode = data.mode;
      if (data.orientation) {
        state.orientation = data.orientation;
      }
    },
    removeOrientation(state, orientation_id) {
      state.orientations.forEach((orientation, index) => {
        if (parseInt(orientation.id) == parseInt(orientation_id)) {
          state.orientations.splice(index, 1);
        }
      });
    },
    addOrientation(state, orientation) {
      state.orientations.push(orientation);
    },
    modifyOrientation(state, modified_orientation) {
      state.orientations.forEach((orientation) => {
        if (orientation.id == modified_orientation.id) {
          orientation.name = modified_orientation.name;
          orientation.year = modified_orientation.year;
        }
      });
      showAlert({
        type: "success",
        message: `La orientación ${modified_orientation.name} fue modificada correctamente!`,
      });
    },
  },
  actions: {
    async getSubjects({ rootState, commit }) {
      await axios({
        method: "get",
        url: rootState.API_URL + "/materia",
        headers: rootState.headers,
      })
        .then((res) => {
          // Verifico que la data recibida sea un array
          if (Array.isArray(res.data)) {
            commit("setSubjects", res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    async createOrientation({ rootState, commit }, orientation) {
      await axios({
        method: "post",
        url: rootState.API_URL + "/orientacion",
        data: orientation,
        headers: rootState.headers,
      })
        .then((res) => {
          // Si no existe el objeto result en res.data entonces no hubieron errores
          if (!("result" in res.data)) {
            commit("addOrientation", res.data);
            commit("changeMode", "list");
            showAlert({
              type: "success",
              message:  `La orientación ${orientation.name} fue creada correctamente!`,
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
    },
    async deleteOrientation({ rootState, commit }, orientation) {
      var data = {
        id: parseInt(orientation.id),
      };
      console.log(data);
      await axios({
        method: "delete",
        url: rootState.API_URL + "/orientacion",
        data,
        headers: rootState.headers,
      })
        .then((res) => {
          // Si la consulta salio bien
          if (res.data == 1) {
            // Elimino el objeto del array
            commit("removeOrientation", orientation.id);

            // Lanzando alerta
            showAlert({
              type: "info",
              message: `La orientación ${orientation.name} fue eliminada correctamente!`,
            });
          } else {
            showAlert({
              type: "error",
              message: `La orientación ${orientation.name} no pudo ser eliminada, actualice la pagina e intente nuevamente`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getOrientationSubjects({ rootState, state, commit }) {
      let data = `id=${state.orientation.id}`;
      await axios({
        method: "get",
        url: rootState.API_URL + `/orientacion-materia?${data}`,
        headers: rootState.headers,
      })
        .then((res) => {
          // Verifico que la data recibida sea un array
          if (Array.isArray(res.data)) {
            commit("setOrientationSubjects", res.data);
          }else{
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editOrientation({ rootState, commit }, modified_orientation) {
      let data = modified_orientation;
      data.id = parseInt(data.id);
      await axios({
        method: "put",
        url: rootState.API_URL + "/orientacion",
        data: data,
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            commit("modifyOrientation", modified_orientation);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSubjectsOrientation({ rootState, state, commit }, removed_subjects) {
      let data = {
        id: parseInt(state.orientation.id),
        subjects: removed_subjects,
      };
      console.log(data);
      await axios({
        method: "delete",
        url: rootState.API_URL + "/orientacion-materia",
        data: data,
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            console.log("Midificadi corritaminti");
            /* commit("modifyOrientation", this.modified_orientation); */
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addSubjectsOrientation({ rootState, state, commit }, added_subjects) {
      let data = {
        id: parseInt(state.orientation.id),
        subjects: added_subjects,
      };
      await axios({
        method: "post",
        url: rootState.API_URL + "/orientacion-materia",
        data: data,
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            /* this.$emit("changeOrientation", this.modified_orientation); */
            console.log("Midificadi corritaminti");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
