<template>
  <div
    class="max-w-screen-sm mx-auto my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between pl-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-folder-plus pb-1"></i>
        <h2 class="px-2 font-extrabold select-none">{{getWord({file:'orientation',word:'edit_orientation',lang})}}</h2>
      </div>
      <div class="flex items-center">
        <button
          @click="saveChanges()"
          class="px-3 m-1 py-1 text-xs font-semibold transition-colors rounded-md bg-blue-200 hover:bg-blue-300 text-blue-900"
        >
          {{getWord({file:'lang',word:'save',lang})}}
        </button>

        <button
          @click="changeMode({ mode: 'list' })"
          class="px-2 m-1 py-1 text-xs font-semibold rounded-tr-xl transition-colors rounded-md bg-red-200 hover:bg-red-300 text-red-900"
        >
          {{getWord({file:'lang',word:'cancel',lang})}}
        </button>
      </div>
    </div>
    <div
      class="p-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <div
        class="flex flex-wrap items-center justify-start sm:justify-around mb-8"
      >
        <div class="">
          <label class="block text-xs pl-1 mt-2 font-semibold select-none"
            >{{getWord({file:'orientation',word:'name',lang})}}</label
          >
          <input
            type="text"
            :placeholder="getWord({file:'orientation',word:'choose_a_name',lang})"
            v-model="modified_orientation.name"
            class="w-60 transition sm:w-80 text-sm placeholder-gray-400 py-2 px-2 | bg-white duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-lg rounded-xl outline-none"
          />
        </div>
        <div class="flex sm:justify-center justify-start mt-2 mx-1">
          <div>
            <label
              class="block text-xs text-center pb-0.5 font-semibold select-none"
              >{{getWord({file:'orientation',word:'year',lang})}}</label
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
              {{getWord({file:'orientation',word:'first',lang})}}
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
              {{getWord({file:'orientation',word:'second',lang})}}
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
              {{getWord({file:'orientation',word:'third',lang})}}
            </button>
          </div>
        </div>
      </div>
      <label class="block text-lg text-center">{{getWord({file:'orientation',word:'select_subjects',lang})}}</label>
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
import { mapState, mapMutations, mapActions } from "vuex";
import { showAlert } from "@/utils/alerts.js";
import { getWord } from "@/utils/lang";

export default {
  name: "EditOrientation",
  data: function() {
    return {
      modified_orientation: {},
      added_subjects: [],
      removed_subjects: [],
      search_word: "",
      filter_by: "all",
    };
  },
  computed: {
    ...mapState({
      orientation: (state) => state.orientations.orientation,
      subjects: (state) => state.orientations.subjects,
      preselected_subjects: (state) => state.orientations.preselected_subjects,
      lang: (state) => state.lang,
    }),
  },
  created() {
    let orientation = {
      id: this.orientation.id,
      name: this.orientation.name,
      year: this.orientation.year,
    };
    this.modified_orientation = orientation;

    this.getOrientationSubjects().then(() => {
      this.selectOrientationSubjects();
    });
  },
  methods: {
    ...mapMutations(["changeMode"]),
    ...mapActions([
      "getOrientationSubjects",
      "editOrientation",
      "removeSubjectsOrientation",
      "addSubjectsOrientation",
    ]),
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
      if (this.modified_orientation.name.length > 0) {
        if (this.added_subjects.length > 0) {
          this.addSubjectsOrientation(this.added_subjects);
        }
        if (this.removed_subjects.length > 0) {
          this.removeSubjectsOrientation(this.removed_subjects);
        }
        if (
          this.orientation.name != this.modified_orientation.name ||
          this.orientation.year != this.modified_orientation.year
        ) {
          this.editOrientation(this.modified_orientation);
        }
        this.changeMode({ mode: "list" });
        showAlert({
          type: "success",
          message: `La orientación ${this.modified_orientation.name} fue modificada correctamente!`,
        });
      } else {
        this.$swal({
          icon: "error",
          title: "Debes completar todos los campos!",
        });
      }
    },
    deselectSubjectDiv(id) {
      let subjectDiv = document.getElementById("subject_" + id);
      let subjectIcon = document.getElementById("subject_icon_" + id);
      let subjectName = document.getElementById("subject_name_" + id);

      subjectDiv.classList.remove("scale-95");
      subjectDiv.classList.replace("bg-gray-800", "bg-gray-700");
      subjectIcon.classList.replace("fa-check-square", "fa-square");
      subjectIcon.classList.remove("text-indigo-400");
      subjectName.classList.toggle("text-indigo-300");
    },
    selectSubjectDiv(id) {
      let subjectDiv = document.getElementById("subject_" + id);
      let subjectIcon = document.getElementById("subject_icon_" + id);
      let subjectName = document.getElementById("subject_name_" + id);

      subjectDiv.classList.add("scale-95");
      subjectDiv.classList.replace("bg-gray-700", "bg-gray-800");
      subjectIcon.classList.replace("fa-square", "fa-check-square");
      subjectIcon.classList.add("text-indigo-300");
      subjectIcon.classList.replace(
        "hover:text-indigo-400",
        "hover:text-indigo-300"
      );
      subjectName.classList.toggle("text-indigo-400");
    },
    getWord
  },
};
</script>

<style></style>
