<template>
  <div class="mx-2 w-full items-center ">
    <div class="flex justify-evenly items-center">
      <input
        v-model="orientation.name"
        class=" w-72 my-2 p-2 | text-white rounded-lg shadow-lg transition-all ease-in-out hover:shadow-xl bg-gray-50 bg-opacity-25 hover:bg-opacity-40 focus:bg-opacity-40 outline-none placeholder-white focus:placeholder-transparent focus:ring-4 ring-white ring-opacity-20"
        type="text"
        placeholder="Nombre de la orientacion"
        required
      />
      <input
        type="radio"
        id="1ero"
        name="year"
        value="1"
        v-model="orientation.year"
      />
      <label for="2do">1ero</label>
      <input
        type="radio"
        id="2do"
        name="year"
        value="2"
        v-model="orientation.year"
      />
      <label for="2do">2do</label>
      <input
        type="radio"
        id="3ero"
        name="year"
        value="3"
        v-model="orientation.year"
      />
      <label for="3ero">3ero</label>
      <div
        @click="editOrientation(orientation)"
        class="ml-4 pr-5 | bg-green-400 bg-opacity-30 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-40 shadow-2xl | rounded-2xl transition-transform transform hover:scale-105 select-none cursor-pointer"
      >
        <i
          class="fas fa-check text-white text-md py-3 px-3 | filter drop-shadow-xl "
        ></i>
        Modificar
      </div>
    </div>

    <input
      type="text"
      placeholder="Buscar materia"
      v-model="text_filter"
      v-on:keyup="searcher(text_filter)"
      class=" block my-3 mx-auto py-2 px-2 w-96 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl  outline-none placeholder-white"
    />
    <OrientationSubjectsContainer
      :edit_mode="true"
      :orientation="orientation"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import OrientationSubjectsContainer from "@/components/OrientationSubjectsContainer";

export default {
  name: "ModifyOrientationContainer",
  data: function() {
    return {
      orientation_data: {
        id: null,
        name: "",
        year: "",
        subjects: [],
      },
      text_filter: "",
    };
  },
  components: {
    OrientationSubjectsContainer,
  },
  computed: {
    ...mapState([
      "orientation",
      "original_subjects_selected",
      "subjects_selected",
      "subjects",
    ]),
  },
  methods: {
    ...mapMutations([
      "toogleModifyOrientationMode",
      "setOrientationSubject",
      "removeOrientationSubject",
    ]),
    ...mapActions([
      "searcher",
      "modifyOrientation",
      "editOrientationSubjects",
      "getOrientationSubjects",
    ]),
    editOrientation() {
      var subjectsAdded = [];
      var subjectsRemoved = [];

      // Comparo materias, si hay materias demás en el array de materias seleccionadas
      // entonces la añado a la orientacion
      this.subjects_selected.forEach((subject) => {
        if (!this.original_subjects_selected.includes(subject)) {
          subjectsAdded.push(subject);

          // Busco la materia por id para obtener todos los datos
          let subject_searched = this.subjects.find(
            (sub) => parseInt(sub.id) == subject
          );
          // Inserto nombre e id de la materia en el objeto
          let subject_data = {
            id_subject: parseInt(subject_searched.id),
            id_orientation: this.orientation.id,
            name: subject_searched.name,
          };

          // Ingreso la materia con todos los datos al array de orientation_subjects
          this.setOrientationSubject(subject_data);
        }
      });

      this.original_subjects_selected.forEach((subject) => {
        if (!this.subjects_selected.includes(subject)) {
          subjectsRemoved.push(subject);
          this.removeOrientationSubject(subject);
        }
      });

      this.orientation_data.subjectsAdded = subjectsAdded;
      this.orientation_data.subjectsRemoved = subjectsRemoved;
      this.orientation_data.id = this.orientation.id;
      this.orientation_data.name = this.orientation.name;
      this.orientation_data.year = this.orientation.year;

      // Admin añadió o quitó materias, envio la peticion
      this.editOrientationSubjects(this.orientation_data);
      // Admin modfico el nombre, tambien envio peticion
      this.modifyOrientation(this.orientation_data);
    },
  },
};
</script>

<style></style>
