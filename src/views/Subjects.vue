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
        v-on:keyup="setTextFilter(text_filter)"
        class="w-64 my-2 py-2 px-2 text-sm bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-xl  outline-none placeholder-gray-300"
      />
      <div
        class="my-2 max-w-max bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-lg | rounded-xl"
      >
        <input
          type="text"
          v-model="new_subject.name"
          placeholder="Agregar materia"
          v-on:keyup.enter="
            new_subject.name.trim() != '' ? addSubject() : false
          "
          class="w-64 py-2 px-2 min-h-full text-sm bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-2xl | rounded-xl  outline-none placeholder-gray-300"
        />
        <button @click="new_subject.name.trim() != '' ? addSubject() : false">
          <i
            class="fas fa-plus text-white text-md py-3 px-3 | filter drop-shadow-xl hover:text-green-300 transition-colors"
          ></i>
        </button>
      </div>
    </div>

    <div
      v-show="subjectsFiltered.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-5 mt-10 max-h-80 overflow-auto bg-gray-600 backdrop-filter backdrop-blur-xl bg-opacity-10 border-2 border-gray-700 shadow-2xl rounded-2xl"
    >
      <div
        class="flex flex-col justify-between m-3 px-3 pt-2 pb-0.5 bg-gray-700 bg-opacity-90 border-2 border-gray-600 rounded-xl"
        v-for="subject in subjectsFiltered"
        :key="subject.id"
        style="height:fit-content"
      >
        <p
          :id="'subject_name_' + subject.id"
          :class="
            subject.name.length > 20 && subject.name.length < 35
              ? 'text-sm'
              : subject.name.length >= 35
              ? 'text-xs'
              : ' '
          "
          class="text-center font-semibold"
          type="text"
        >
          {{ subject.name }}
        </p>

        <div
          :id="'subject_header_' + subject.id"
          class="hidden flex justify-between items-center mb-1 "
        >
          <p class="text-xs pl-2 select-none">Cambiar nombre</p>
          <button
            @click="toggleSubjectCard(subject.id)"
            class="text-sm px-2 py-0.5 mb-1 text-red-900  transition-colors font-semibold rounded-md bg-red-200 hover:bg-red-300 shadow-lg"
          >
            <i class="fas fa-times text-sm drop-shadow-lg "></i>
          </button>
        </div>
        <input
          type="text"
          :id="'subject_name_input_' + subject.id"
          v-on:keyup.enter="
            new_subject_name.trim() != ''
              ? modifySubject({
                  id: parseInt(subject.id),
                  name: new_subject_name,
                })
              : false
          "
          v-model="new_subject_name"
          class="hidden text-center py-1 px-2 bg-gray-500 rounded-xl outline-none"
        />

        <div
          :id="'buttons_no_edit_mode_' + subject.id"
          class="flex gap-2 justify-between items-center mt-2"
        >
          <button
            @click="toggleEditMode(subject.id, subject.name)"
            class="px-2 mb-1 text-xs font-semibold py-1 transition-colors rounded-md border-b-2 hover:border-indigo-500 border-indigo-400 bg-indigo-200 hover:bg-indigo-300 text-blue-900"
          >
            Cambiar nombre
          </button>

          <i
            @click="confirmDeletion(subject.id, subject.name)"
            class="fas fa-trash-alt px-2 cursor-pointer text-red-400 hover:text-red-500 transition-colors mx-1 text-md drop-shadow-lg  font-semibold py-1 rounded-md border-b-2 hover:border-red-500 border-red-400 bg-red-200 hover:bg-red-300"
          ></i>
        </div>

        <div
          :id="'buttons_edit_mode_' + subject.id"
          class="hidden flex gap-2 justify-center mt-2"
        >
          <button
            @click="
              new_subject_name.trim() != ''
                ? modifySubject({
                    id: parseInt(subject.id),
                    name: new_subject_name,
                  })
                : false
            "
            class="text-sm px-8 mb-1 cursor-pointer text-green-900  transition-colors mx-1 text-md drop-shadow-lg  font-semibold py-1 rounded-md border-b-2 hover:border-green-500 border-green-400 bg-green-200 hover:bg-green-300"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div
      class="py-5 mx-5 mt-10 bg-gray-700 bg-opacity-90 border-2 border-gray-600 rounded-xl"
      v-show="subjectsFiltered.length == 0"
    >
      <p class="text-center">No hay coincidencias</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Subjects",
  data: function() {
    return {
      new_subject: {
        name: "",
        state: 1,
      },
      new_subject_name: "",
      previous_subject_edited_id: null,
      text_filter: "",
    };
  },
  created() {
    this.getSubjects();
  },
  computed: {
    ...mapGetters(["subjectsFiltered"]),
  },
  methods: {
    ...mapMutations(["setTextFilter"]),
    ...mapActions([
      "getSubjects",
      "createSubject",
      "removeSubject",
      "editSubject",
    ]),
    addSubject() {
      // Creando nuevo objeto con el nombre de la materia
      let newSubject = {
        name: this.new_subject.name,
      };
      this.createSubject(newSubject);
      this.new_subject.name = "";
    },
    toggleEditMode(id, name) {
      // Obtengo el input
      let subjectInput = document.getElementById("subject_name_input_" + id);

      // Si una materia due editada previamente y no
      if (
        this.previous_subject_edited_id != null &&
        this.previous_subject_edited_id != id
      ) {
        this.toggleSubjectCard(this.previous_subject_edited_id);
      }

      this.toggleSubjectCard(id);

      // Al input le asigno el nombre de la materia (lo hago aca para no interferir con la materia original)
      subjectInput.value = name;
      // Le hago focus al input para que no tenga que hacerle click
      subjectInput.focus();
      // Asigno el id para que quede como editada previamente
      this.previous_subject_edited_id = id;
    },
    toggleSubjectCard(id) {
      // Obtengo el input, el p y el header por el id
      let subjectInput = document.getElementById("subject_name_input_" + id);
      let subjectP = document.getElementById("subject_name_" + id);
      let subjectHeader = document.getElementById("subject_header_" + id);

      // Obtengo los div de los botones
      let buttonsEditMode = document.getElementById("buttons_edit_mode_" + id);
      let buttonsNoEditMode = document.getElementById(
        "buttons_no_edit_mode_" + id
      );

      // Muestro u oculto segun sea su estado actual
      subjectHeader.classList.toggle("hidden");
      subjectInput.classList.toggle("hidden");
      subjectP.classList.toggle("hidden");
      buttonsEditMode.classList.toggle("hidden");
      buttonsNoEditMode.classList.toggle("hidden");

      if (id == this.previous_subject_edited_id) {
        this.previous_subject_edited_id = null;
      }
    },
    modifySubject(subject) {
      this.editSubject(subject).then(() => this.toggleSubjectCard(subject.id));
    },
    confirmDeletion(subject_id, subject_name) {
      let alert = this.$swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true,
        showDenyButton: true,
        timer: 60000,
        timerProgressBar: true,
        iconColor: "white",
        heightAuto: true,
        customClass: {
          popup: "colored-toast",
        },
      });
      alert
        .fire({
          html: `<span class="text-white">¿Estas seguro de borrar la materia <b>${subject_name}</b>?</span>`,
          showCancelButton: false,
          confirmButtonText: `Borrar`,
          denyButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.removeSubject({id: parseInt( subject_id), name: subject_name});
          }
        });
    },
  },
};
</script>

<style></style>
