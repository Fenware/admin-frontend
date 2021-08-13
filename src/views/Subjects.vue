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
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-5 mt-10 bg-white bg-opacity-10  shadow-2xl rounded-2xl"
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
            (subject.name.length > 20 && subject.name.length < 35
              ? 'text-sm'
              : subject.name.length >= 35
              ? 'text-xs'
              : ' ') + ' text-center bg-transparent'
          "
          type="text"
        >
          {{ subject.name }}
        </p>

        <div
          :id="'subject_header_' + subject.id"
          class="hidden flex justify-between items-center mb-1 "
        >
          <p class="text-xs pl-2">Cambiar nombre</p>
          <button
            @click="toggleSubjectCard(subject.id)"
            class="cursor-pointer text-xs px-0.1 px-1 bg-gray-700 border-2 border-red-400 hover:border-red-300 hover:bg-red-500 hover:bg-opacity-70 rounded-xl duration-300 transition"
          >
            <i
              class="fas fa-times text-red-300 mx-1 text-md drop-shadow-lg "
            ></i>
          </button>
        </div>
        <input
          type="text"
          :id="'subject_name_input_' + subject.id"
          v-on:keyup.enter="
            subject_data.name.trim() != '' ? editSubject(subject.id) : false
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
            class="cursor-pointer text-xs text-yellow-200 hover:text-yellow-100  font-medium px-1 py-0.5 my-1 bg-gray-700 border-2 border-yellow-400 hover:bg-yellow-300 hover:bg-opacity-60 rounded-lg duration-200 transition-colors ease-in-out"
          >
            Cambiar nombre
          </button>

          <i
            @click="confirmDeletion(subject.id, subject.name)"
            class="fas fa-trash-alt cursor-pointer text-red-400 hover:text-red-500 transition-colors mx-1 text-md drop-shadow-lg "
          ></i>
        </div>

        <div
          :id="'buttons_edit_mode_' + subject.id"
          class="hidden flex gap-2 justify-center mt-2"
        >
          <button
            @click="
              new_subject_name.trim() != '' ? editSubject(subject.id) : false
            "
            class="text-sm cursor-pointer text-green-300 hover:text-white font-medium w-32   pl-2 pr-3 py-0.5 my-1 bg-gray-700 border-2 border-green-400 hover:bg-green-500 hover:bg-opacity-60 rounded-xl duration-200 transition-colors ease-in-out"
          >
            <i
              class="fas fa-save text-green-300 mr-1 text-md drop-shadow-lg"
            ></i>
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Subjects",
  data: function() {
    return {
      subjects: [],
      new_subject: {
        id: null,
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
    ...mapState(["API_URL", "headers"]),
    subjectsFiltered() {
      // Devuelvo las materias filtradas por coincidencias de nombre
      return this.subjects.filter(
        (subject) =>
          subject.name.toLowerCase().indexOf(this.text_filter.toLowerCase()) >=
          0
      );
    },
  },
  methods: {
    addSubject() {
      // Creando nuevo objeto con el nombre de la materia
      let newSubject = {
        name: this.new_subject.name,
      };
      this.createSubject(newSubject);
      this.new_subject.id = null;
      this.new_subject.name = "";
    },
    toggleEditMode(id, name) {
      /* this.sweetAlertConfirm(); */

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

      //
      if (id == this.previous_subject_edited_id) {
        this.previous_subject_edited_id = null;
      }
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createSubject(subject) {
      await axios({
        method: "post",
        url: this.API_URL + "/materia",
        data: subject,
        headers: this.headers,
      })
        .then((res) => {
          console.log(res.data);
          if (!("result" in res.data)) {
            this.subjects.push(res.data);
            this.$swal({
              icon: "success",
              title: `La materia ${subject.name} fue creada correctamente!`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSubject(subject_id, subject_name) {
      let data = {
        id: parseInt(subject_id),
      };
      await axios({
        method: "delete",
        url: this.API_URL + "/materia",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            this.subjects.forEach((subject, index, subjects_array) => {
              if (parseInt(subject_id) == parseInt(subject.id)) {
                subjects_array.splice(index, 1);
              }
            });
            this.$swal({
              icon: "warning",
              title: `La materia ${subject_name} fue borrada!`,
            });
          } else {
            console.log("Error: removeSubject");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editSubject(subject_id) {
      let data = {
        id: parseInt(subject_id),
        name: this.new_subject_name,
      };
      await axios({
        method: "put",
        url: this.API_URL + "/materia",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            this.subjects.forEach((subject) => {
              if (parseInt(subject_id) == parseInt(subject.id)) {
                subject.name = this.new_subject_name;
              }
            });
            this.$swal({
              icon: "success",
              title: `Materia renombrada correctamente!`,
            });
            this.toggleSubjectCard(subject_id);
          } else {
            console.log("Error: editSubject");
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmDeletion(subject_id, subject_name) {
      let alert = this.$swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true,
        showDenyButton: true,
        timer: 50000,
        timerProgressBar: true,
        iconColor: "white",
        heightAuto: true,
        customClass: {
          popup: "colored-toast",
        },
      });
      alert
        .fire({
          html: `<span class="text-white">Estas seguro de borrar la materia <b>${subject_name}</b> ?</span>`,
          showCancelButton: false,
          confirmButtonText: `Borrar`,
          denyButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.removeSubject(subject_id, subject_name);
          }
        });
    },
  },
};
</script>

<style></style>
