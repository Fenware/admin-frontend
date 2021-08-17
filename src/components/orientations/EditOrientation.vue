<template>
  <div
    class="max-w-screen-sm mx-auto my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between pl-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-folder-plus pb-1"></i>
        <h2 class="px-2 font-extrabold select-none">Editar orientación</h2>
      </div>
      <div class="flex items-center">
        <button
          @click="saveChanges()"
          class="px-3 m-1 py-1 text-xs font-semibold transition-colors rounded-md bg-blue-200 hover:bg-blue-300 text-blue-900"
        >
          Guardar cambios
        </button>

        <button
          @click="changeModeToList()"
          class="px-2 m-1 py-1 text-xs font-semibold rounded-tr-xl transition-colors rounded-md bg-red-200 hover:bg-red-300 text-red-900"
        >
          Cancelar
        </button>
      </div>
    </div>
    <div
      class="p-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <form
        @submit.prevent=""
        class="flex flex-wrap items-center justify-start sm:justify-around mb-8"
      >
        <div class="">
          <label class="block text-xs pl-1 mt-2 font-semibold select-none"
            >Nombre</label
          >
          <input
            type="text"
            placeholder="Ingrese nombre de la orientación"
            v-model="modified_orientation.name"
            class="w-60 transition sm:w-80 text-sm placeholder-gray-400 py-2 px-2 | bg-white duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-lg rounded-xl outline-none"
          />
        </div>
        <div class="flex sm:justify-center justify-start mt-2 mx-1">
          <div>
            <label
              class="block text-xs text-center pb-0.5 font-semibold select-none"
              >Bachillerato</label
            >
            <button
              @click="this.modified_orientation.year = 1"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (modified_orientation.year == 1
                    ? '  bg-white bg-opacity-20 '
                    : '')
              "
            >
              1ero
            </button>

            <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
            <button
              @click="this.modified_orientation.year = 2"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (modified_orientation.year == 2
                    ? ' bg-white bg-opacity-20 '
                    : '')
              "
            >
              2do
            </button>

            <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
            <button
              @click="this.modified_orientation.year = 3"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (modified_orientation.year == 3
                    ? ' bg-white bg-opacity-20 '
                    : '')
              "
            >
              3ero
            </button>
          </div>
        </div>
      </form>
      <label class="block text-lg text-center">Seleccionar materias</label>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-h-72 overflow-auto"
      >
        <div
          class="flex cursor-pointer items-center justify-between m-3 px-2 py-2
        bg-gray-700 bg-opacity-90 border-2 border-gray-600 rounded-xl transform transition-transform"
          :id="'subject_' + subject.id"
          v-for="subject in subjects"
          :key="subject.id"
          @click="toggleSubject(subject.id)"
          style="height:fit-content"
        >
          <p
            :id="'subject_name_' + subject.id"
            :class="
              (subject.name.length > 20 && subject.name.length < 35
                ? 'text-sm'
                : subject.name.length >= 35
                ? 'text-xs'
                : ' ') + ' text-center bg-transparent select-none'
            "
            type="text"
          >
            {{ subject.name }}
          </p>
          <i
            :id="'subject_icon_' + subject.id"
            class="far fa-square cursor-pointer text-white hover:text-indigo-400 transition-colors mx-1 text-md drop-shadow-lg "
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "EditOrientation",
  data: function() {
    return {
      subjects: [],
      modified_orientation: {},
      // Materias que ya estan seleccionadas al obtenerla
      preselected_subjects: [],
      added_subjects: [],
      removed_subjects: [],
      search_word: "",
      filter_by: "all",
    };
  },
  props: {
    orientation: Object,
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  created() {
    this.getSubjects();

    let orientation = {
      id: this.orientation.id,
      name: this.orientation.name,
      year: this.orientation.year,
    };
    this.modified_orientation = orientation;
  },
  methods: {
    changeModeToList() {
      // Llamo a la funcion del padre para cambiar el modo
      this.$emit("changeMode", "list");
    },
    async getSubjects() {
      await axios({
        method: "get",
        url: this.API_URL + "/materia",
        headers: this.headers,
      })
        .then((res) => {
          // Verifico que la data recibida sea un array
          if (Array.isArray(res.data)) {
            this.subjects = res.data;
            this.getOrientationSubjects();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getOrientationSubjects() {
      let data = `id=${this.orientation.id}`;
      await axios({
        method: "get",
        url: this.API_URL + `/orientacion-materia?${data}`,
        headers: this.headers,
      })
        .then((res) => {
          // Verifico que la data recibida sea un array
          if (Array.isArray(res.data)) {
            this.preselected_subjects = res.data;
            this.selectOrientationSubjects();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectOrientationSubjects() {
      // Obtengo la informacion de las materias preseleccionadas
      let subjectsToSelect = this.subjects.filter((subject) => {
        let subjects = this.preselected_subjects.filter(
          (orientation_subject) => orientation_subject.id == subject.id
        );
        return subjects.length > 0;
      });

      // Selecciono los div de las materias preseleccionadas
      subjectsToSelect.forEach((subject) => {
        this.selectSubjectDiv(subject.id);
      });
    },
    toggleSubject(id) {
      // Busco coincidencias en el array de materias ya seleccionadas
      let coincidencesInOrientationSubjects = this.preselected_subjects.filter(
        (orientation_subject) => orientation_subject.id == id
      );

      // Si hay coincidencias y ya no fue removida
      if (
        coincidencesInOrientationSubjects.length > 0 &&
        !this.removed_subjects.includes(parseInt(id))
      ) {
        this.deselectSubjectDiv(id);

        // Añado el id al array de materias eliminadas
        this.removed_subjects.push(parseInt(id));

        // Si esta en el array de materias añadidas
      } else if (this.added_subjects.includes(parseInt(id))) {
        this.deselectSubjectDiv(id);

        // Busco el id en el array y lo quito
        this.added_subjects.forEach((subject_id, index) => {
          if (subject_id == parseInt(id)) {
            this.added_subjects.splice(index, 1);
          }
        });

        // Si no esta seleccionada, o esta seleccionada (está en el array de preseleccionadas) pero fue removida
      } else {
        // Si la materia fue removida
        if (this.removed_subjects.includes(parseInt(id))) {
          // Busco el id de la materia en el array de eliminadas y lo quito
          this.removed_subjects.forEach((subject_id, index) => {
            if (subject_id == parseInt(id)) {
              this.removed_subjects.splice(index, 1);
            }
          });
        }

        // Si no esta preseleccionada la añado al array de seleccionadas
        if (coincidencesInOrientationSubjects.length == 0) {
          this.added_subjects.push(parseInt(id));
        }
        this.selectSubjectDiv(id);
      }
    },
    saveChanges() {
      if (this.added_subjects.length > 0) {
        this.addSubjectsOrientation();
      }
      if (this.removed_subjects.length > 0) {
        this.removeSubjectsOrientation();
      }
      if (
        this.orientation.name != this.modified_orientation.name ||
        this.orientation.year != this.modified_orientation.year
      ) {
        this.editOrientation();
      }
      this.changeModeToList();
    },
    async editOrientation() {
      let data = this.modified_orientation;
      data.id = parseInt(this.modified_orientation.id);
      await axios({
        method: "put",
        url: this.API_URL + "/orientacion",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          if (res.data == 11) {
            this.$emit("changeOrientation", this.modified_orientation);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSubjectsOrientation() {
      let data = {
        id: parseInt(this.orientation.id),
        subjects: this.removed_subjects,
      };
      console.log(data);
      await axios({
        method: "delete",
        url: this.API_URL + "/orientacion-materia",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            this.$emit("changeOrientation", this.modified_orientation);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addSubjectsOrientation() {
      let data = {
        id: parseInt(this.orientation.id),
        subjects: this.added_subjects,
      };
      await axios({
        method: "post",
        url: this.API_URL + "/orientacion-materia",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data == 1) {
            this.$emit("changeOrientation", this.modified_orientation);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deselectSubjectDiv(id) {
      let subjectDiv = document.getElementById("subject_" + id);
      let subjectIcon = document.getElementById("subject_icon_" + id);

      subjectDiv.classList.remove("scale-95");
      subjectDiv.classList.replace("bg-gray-800", "bg-gray-700");
      subjectIcon.classList.replace("fa-check-square", "fa-square");
      subjectIcon.classList.remove("text-indigo-400");
    },
    selectSubjectDiv(id) {
      let subjectDiv = document.getElementById("subject_" + id);
      let subjectIcon = document.getElementById("subject_icon_" + id);
      subjectDiv.classList.add("scale-95");
      subjectDiv.classList.replace("bg-gray-700", "bg-gray-800");
      subjectIcon.classList.replace("fa-square", "fa-check-square");
      subjectIcon.classList.add("text-indigo-400");
      subjectIcon.classList.replace(
        "hover:text-indigo-400",
        "hover:text-indigo-300"
      );
    },
  },
};
</script>

<style></style>
