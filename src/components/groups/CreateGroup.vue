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
          @click="createGroup()"
          class="px-3 m-1 py-1 text-xs font-semibold transition-colors rounded-md bg-green-200 hover:bg-green-300 text-green-900"
        >
          Crear grupo
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
        <div>
          <label class="block text-xs pl-1 mt-2 font-semibold select-none"
            >Nombre</label
          >
          <input
            type="text"
            placeholder="Ingrese nombre del grupo"
            v-model="new_group.name"
            class="w-60 transition sm:w-80 text-sm placeholder-gray-400 py-2 px-2 | bg-white duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-lg rounded-xl outline-none"
          />
        </div>
      </form>
      <label class="block text-lg text-center">Seleccionar orientación</label>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-h-72 overflow-auto"
      >
        <div
          class="flex justify-between items-center cursor-pointer items-center m-3 px-2 py-2
        bg-gray-700 bg-opacity-90 border-2 border-gray-600 rounded-xl transform transition-transform"
          :id="'orientation_' + orientation.id"
          v-for="orientation in orientations"
          :key="orientation.id"
          @click="selectOrientation(orientation.id)"
          style="height:fit-content"
        >
          <div class="">
            <p
              :id="'orientation_name_' + orientation.id"
              :class="
                (orientation.name.length > 20 && orientation.name.length < 35
                  ? 'text-sm'
                  : orientation.name.length >= 35
                  ? 'text-xs'
                  : ' ') + ' text-center font-bold select-none'
              "
              type="text"
            >
              {{ orientation.name }}
            </p>
            <p>Año: {{ orientation.year }}</p>
          </div>
          <i
            :id="'orientation_icon_' + orientation.id"
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
  name: "CreateGroup",
  data: function() {
    return {
      orientations: [],
      search_word: "",
      new_group: {
        name: "",
        orientation: {},
      },
    };
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  created() {
    this.getOrientations();
  },
  methods: {
    changeModeToList() {
      // Llamo a la funcion del padre para cambiar el modo
      this.$emit("changeMode", "list");
    },
    async getOrientations() {
      await axios({
        method: "get",
        url: this.API_URL + "/orientacion",
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            this.orientations = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectOrientation(id) {
      let orientationDiv = document.getElementById("orientation_" + id);
      /* let orientationName = document.getElementById('orientation_name_' + id); */
      let orientationIcon = document.getElementById("orientation_icon_" + id);

      if (!this.new_orientation.subjects.includes(parseInt(id))) {
        // Añado las clases al div y al icono para que quede "seleccionada"
        orientationDiv.classList.add("scale-95");
        orientationDiv.classList.replace("bg-gray-700", "bg-gray-800");
        orientationIcon.classList.replace("fa-square", "fa-check-square");
        orientationIcon.classList.add("text-indigo-400");
        orientationIcon.classList.replace(
          "hover:text-indigo-400",
          "hover:text-indigo-300"
        );

        // Añado el id de la materia al array de materias seleccionadas
        this.new_orientation.subjects.push(parseInt(id));
      } else {
        orientationDiv.classList.remove("scale-95");
        orientationDiv.classList.replace("bg-gray-800", "bg-gray-700");
        orientationIcon.classList.replace("fa-check-square", "fa-square");
        orientationIcon.classList.remove("text-indigo-400");

        this.new_orientation.subjects.forEach((subject_id, index) => {
          if (subject_id == parseInt(id)) {
            this.new_orientation.subjects.splice(index, 1);
          }
        });
      }
    },
    async createGroup() {
      let orientation = this.new_orientation;
      await axios({
        method: "post",
        url: this.API_URL + "/orientacion",
        data: orientation,
        headers: this.headers,
      })
        .then((res) => {
          // Si no existe el objeto result en res.data entonces no hubieron errores
          if (!("result" in res.data)) {
            this.$emit("addOrientation", res.data);
            this.changeModeToList();
            this.$swal({
              icon: "success",
              title: `La orientación ${orientation.name} fue creada correctamente!`,
            });
          } else {
            this.$swal({
              icon: "error",
              title: res.data.result.error_msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
