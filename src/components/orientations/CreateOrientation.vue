<template>
  <div
    class="max-w-screen-sm mx-auto my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between pl-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-folder-plus pb-1"></i>
        <h2 class="px-2 font-extrabold select-none">Crear orientación</h2>
      </div>
      <div class="flex items-center">
        <button
          @click="createOrientation(new_orientation)"
          class="px-3 m-1 py-1 text-xs font-semibold transition-colors rounded-md bg-green-200 hover:bg-green-300 text-green-900"
        >
          Crear orientación
        </button>

        <button
          @click="changeMode({mode: 'list'})"
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
            v-model="new_orientation.name"
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
              @click="new_orientation.year = 1"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (new_orientation.year == 1 ? '  bg-white bg-opacity-20 ' : '')
              "
            >
              1ero
            </button>

            <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
            <button
              @click="new_orientation.year = 2"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (new_orientation.year == 2 ? ' bg-white bg-opacity-20 ' : '')
              "
            >
              2do
            </button>

            <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
            <button
              @click="new_orientation.year = 3"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (new_orientation.year == 3 ? ' bg-white bg-opacity-20 ' : '')
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
          @click="selectSubject(subject.id)"
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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "CreateOrientation",
  data: function() {
    return {
      filter_by: "all",
      new_orientation: {
        name: "",
        year: 1,
        subjects: [],
      },
    };
  },
  computed:{
    ...mapState({subjects: state => state.orientations.subjects}),
  },
  methods: {
    ...mapMutations(['changeMode']),
    ...mapActions(['createOrientation']),
    selectSubject(id) {
      let subjectDiv = document.getElementById("subject_" + id);
      let subjectName = document.getElementById("subject_name_" + id);
      let subjectIcon = document.getElementById("subject_icon_" + id);

      if (!this.new_orientation.subjects.includes(parseInt(id))) {
        // Añado las clases al div y al icono para que quede "seleccionada"
        subjectDiv.classList.add("scale-95");
        subjectDiv.classList.replace("bg-gray-700", "bg-gray-800");
        subjectIcon.classList.replace("fa-square", "fa-check-square");
        subjectIcon.classList.add("text-indigo-400");
        subjectIcon.classList.replace(
          "hover:text-indigo-400",
          "hover:text-indigo-300"
        );
        subjectName.classList.toggle("text-indigo-300");

        // Añado el id de la materia al array de materias seleccionadas
        this.new_orientation.subjects.push(parseInt(id));
      } else {
        subjectDiv.classList.remove("scale-95");
        subjectDiv.classList.replace("bg-gray-800", "bg-gray-700");
        subjectIcon.classList.replace("fa-check-square", "fa-square");
        subjectIcon.classList.remove("text-indigo-400");
        subjectName.classList.toggle("text-indigo-300");

        this.new_orientation.subjects.forEach((subject_id, index) => {
          if (subject_id == parseInt(id)) {
            this.new_orientation.subjects.splice(index, 1);
          }
        });
      }
    },
    
  },
};
</script>

<style></style>
