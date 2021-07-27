<template>
  <div class="mx-2 w-full items-center ">
    <div class="flex justify-evenly items-center">
      <input
        v-model="orientation_data.name"
        id="name_field"
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
        v-model="orientation_data.year"
      />
      <label for="2do">1ero</label>
      <input
        type="radio"
        id="2do"
        name="year"
        value="2"
        v-model="orientation_data.year"
      />
      <label for="2do">2do</label>
      <input
        type="radio"
        id="3ero"
        name="year"
        value="3"
        v-model="orientation_data.year"
      />
      <label for="3ero">3ero</label>
      <div
        @click="
          orientation_data.name.trim() != ''
            ? addOrientation(orientation_data)
            : focusNameInput()
        "
        class="ml-4 pr-5 | bg-green-400 bg-opacity-30 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-40 shadow-2xl | rounded-2xl transition-transform transform hover:scale-105 select-none cursor-pointer"
      >
        <i
          class="fas fa-plus text-white text-md py-3 px-3 | filter drop-shadow-xl "
        ></i>
        Crear
      </div>
    </div>

    <input
      type="text"
      placeholder="Buscar materia"
      v-model="text_filter"
      v-on:keyup="searcher(text_filter)"
      class=" block my-3 mx-auto py-2 px-2 w-96 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl  outline-none placeholder-white"
    />
    <OrientationSubjectsContainer :edit_mode="false" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import OrientationSubjectsContainer from "@/components/OrientationSubjectsContainer";

export default {
  name: "CreateOrientationContainer",
  data: function() {
    return {
      orientation_data: {
        name: "",
        year: "1",
        subjects: this.orientations_subjects,
      },
      text_filter: "",
    };
  },
  created() {
    this.clearSubjectsSelected();
  },
  components: {
    OrientationSubjectsContainer,
  },
  computed: {
    ...mapState(["orientations_subjects", "subjects_selected"]),
  },
  methods: {
    ...mapMutations(["toogleCreateOrientationMode", "clearSubjectsSelected"]),
    ...mapActions(["searcher", "createOrientation"]),
    addOrientation(orientation_data) {
      console.log(this.subjects_selected);
      if(this.subjects_selected.length > 0){
        this.createOrientation(orientation_data);
      }else{
        alert('Debes seleccionar al menos una materia');
      }
    },
    focusNameInput() {
      document.getElementById("name_field").focus();
    },
  },
};
</script>

<style></style>
