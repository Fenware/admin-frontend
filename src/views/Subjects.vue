<template>
  <div class="text-white w-full h-full">
    <h2 class="font-semibold text-center text-3xl pt-1">Materias</h2>

    <div
      class="flex justify-center gap-1 md:justify-between flex-wrap mt-10 mx-10"
    >
      <input
        type="text"
        placeholder="Buscar materia"
        v-model="text_filter"
        v-on:keyup="searcher(text_filter)"
        class="my-2 py-2 px-2 text-sm bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-xl  outline-none placeholder-gray-300"
      />
      <div
        class="my-2 max-w-max bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-lg | rounded-xl"
      >
        <input
          type="text"
          v-model="subject_data.name"
          placeholder="Agregar materia"
          v-on:keyup.enter="
            subject_data.name.trim() != '' ? addSubject() : false
          "
          class="w-48 py-2 px-2 min-h-full text-sm bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-2xl | rounded-xl  outline-none placeholder-gray-300"
        />
        <button @click="subject_data.name.trim() != '' ? addSubject() : false">
          <i
            class="fas fa-plus text-white text-md py-3 px-3 | filter drop-shadow-xl hover:text-green-300 transition-colors"
          ></i>
        </button>
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-5 mt-10 bg-white bg-opacity-10  shadow-2xl rounded-2xl"
    >
      <div
        :id="subject.id + 'no_edit_mode'"
        class=" block m-3 px-3 py-2 bg-gray-700 bg-opacity-90 border-2 border-gray-600 rounded-xl"
        v-for="subject in subjectsFiltered"
        :key="subject.id"
      >
        <p class=" text-center bg-transparent outline-none" type="text">
          {{ subject.name }}
        </p>

        <div
          class="flex gap-2 justify-center mt-2"
        >
          <button
            @click="acceptUserPending(user)"
            class="cursor-pointer text-yellow-200 hover:text-yellow-100  font-medium w-32  pr-2 py-0.5 my-1 bg-gray-700 border-2 border-yellow-400 hover:bg-yellow-300 hover:bg-opacity-60 rounded-xl duration-200 transition-colors ease-in-out"
          >
            <i
              class="fas fa-pencil-alt text-yellow-300 mr-1 text-md drop-shadow-lg"
            ></i>
            Editar
          </button>
          <button
            @click="declineUserPending(user)"
            class="cursor-pointer font-medium w-32 pl-1 pr-2 py-0.5 my-1 bg-gray-700 border-2 border-red-400 hover:border-red-300 hover:bg-red-500 hover:bg-opacity-70 rounded-xl duration-300 transition"
          >
            <i
              class="fas fa-trash-alt text-red-300 mx-1 text-md drop-shadow-lg "
            ></i>
            Borrar
          </button>
        </div>
        <!-- <i
            :id="subject.id + 'btn_edit'"
            @click="editSubjectInput(subject.id)"
            class="
        fas fa-pencil-alt text-yellow-300 hover:text-yellow-500 mx-1 text-md drop-shadow-lg "
          ></i>
          <i
            :id="subject.id + 'btn_delete'"
            @click="removeSubject(subject.id)"
            class="fas fa-trash-alt text-red-400 hover:text-red-500 mx-1 text-md drop-shadow-lg "
          ></i> -->
      </div>

      <!-- <div
          :id="subject.id + 'edit_mode'"
          class="hidden m-3 px-3 py-1 bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
          v-if="subject.state == 1"
        >
          <input
            :id="subject.id"
            v-model="subject.name"
            v-on:keyup.enter="
              subject.name.trim() != '' ? saveNewSubjectName(subject.id) : false
            "
            class="text-center bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-300 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg outline-none"
            type="text"
          />
          <div class="text-center pt-1 pb-0.5">
            <span
              @click="
                subject.name.trim() != ''
                  ? saveNewSubjectName(subject.id)
                  : false
              "
              class="cursor-pointer mr-1 text-sm pl-1 pr-2 py-0.5 bg-green-700 rounded-full duration-300 transition hover:bg-green-600 "
            >
              <i
                :id="subject.id + 'btn_edit'"
                class="fas fa-save text-green-300 mx-1 text-md drop-shadow-lg"
              ></i>
              Guardar
            </span>
            <span
              @click="cancelEdit(subject.id)"
              class="cursor-pointer text-sm pl-1 pr-2 py-0.5 bg-red-700 rounded-full duration-300 transition hover:bg-red-600  "
            >
              <i
                :id="subject.id + 'btn_delete'"
                class="fas fa-times text-red-400 mx-1 text-md drop-shadow-lg "
              ></i>
              Cancelar
            </span>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Subjects",
  data: function() {
    return {
      subject_data: {
        id: null,
        name: "",
        state: 1,
      },
      text_filter: "",
    };
  },
  computed: {
    ...mapState(["subjects"]),
    ...mapGetters(["subjectsFiltered"]),
  },
  methods: {
    ...mapActions([
      "syncSubjects",
      "createSubject",
      "searcher",
      "removeSubject",
      "editSubject",
    ]),
    addSubject() {
      let newSubject = {
        name: this.subject_data.name,
        state: 1,
      };
      this.createSubject(newSubject);
      this.subject_data.id = null;
      this.subject_data.name = "";
    },
    saveNewSubjectName(id) {
      let subjectInput = document.getElementById(id);
      let boxEditMode = document.getElementById(id + "edit_mode");
      let boxNoEditMode = document.getElementById(id + "no_edit_mode");

      let subject = {
        id: parseInt(id),
        name: subjectInput.value,
      };

      this.editSubject(subject);

      boxEditMode.classList.add("hidden");
      boxNoEditMode.classList.remove("hidden");
    },
    editSubjectInput(id) {
      let boxEditMode = document.getElementById(id + "edit_mode");
      let boxNoEditMode = document.getElementById(id + "no_edit_mode");

      boxEditMode.classList.remove("hidden");
      boxNoEditMode.classList.add("hidden");
    },
    cancelEdit(id) {
      let boxEditMode = document.getElementById(id + "edit_mode");
      let boxNoEditMode = document.getElementById(id + "no_edit_mode");
      boxEditMode.classList.add("hidden");
      boxNoEditMode.classList.remove("hidden");
    },
  },
  created() {
    this.syncSubjects();
  },
};
</script>

<style></style>
