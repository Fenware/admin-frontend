import axios from "axios";
import showAlert from "@/utils/alerts.js";

export default {
  state: {
    subjects: [],
    text_filter: "",
  },
  getters: {
    subjectsFiltered(state) {
      // Devuelvo las materias filtradas por coincidencias de nombre
      return state.subjects.filter(
        (subject) =>
          subject.name.toLowerCase().indexOf(state.text_filter.toLowerCase()) >=
          0
      );
    },
  },
  mutations: {
    setTextFilter(state, text) {
      state.text_filter = text;
    },
    setFilter(state, filter) {
      state.filter_by = filter;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    addSubject(state, subject) {
      state.subjects.push(subject);
    },
    deleteSubject(state, subject_id) {
      state.subjects.forEach((subject, index) => {
        if (parseInt(subject_id) == parseInt(subject.id)) {
          state.subjects.splice(index, 1);
        }
      });
    },
    renameSubject(state, subject_edited) {
      state.subjects.forEach((subject) => {
        if (subject_edited.id == parseInt(subject.id)) {
          subject.name = subject_edited.name;
        }
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
    async createSubject({ rootState, commit }, subject) {
      await axios({
        method: "post",
        url: rootState.API_URL + "/materia",
        data: subject,
        headers: rootState.headers,
      })
        .then((res) => {
          console.log(res.data);
          if (!("result" in res.data)) {
            // Ejecuto la mutacion para añadir la materia al array
            commit("addSubject", res.data);
            // Lanzo la alerta
            showAlert({type: "success", message: `La materia ${subject.name} fue creada correctamente!`});
          }else{
            showAlert({type: "error", message: res.data.result.error_msg});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSubject({ rootState, commit }, subject) {
      await axios({
        method: "delete",
        url: rootState.API_URL + "/materia",
        data: subject,
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            commit("deleteSubject", subject.id);
            showAlert({type: "warning", message: `La materia ${subject.name} fue borrada!`});
          } else {
            console.log("Error: removeSubject");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editSubject({ rootState, commit }, subject) {
      await axios({
        method: "put",
        url: rootState.API_URL + "/materia",
        data: subject,
        headers: rootState.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            commit("renameSubject", subject);
            showAlert({type: "success", message: 'Materia renombrada correctamente!'});
            /* this.toggleSubjectCard(subject_id); */
            return true;
          } else {
            console.log(res.data);
            return false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
