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
        <div class="pt-5">
          <!-- <label class="block text-xs pl-12 mt-2 font-semibold select-none"
            >Nombre</label
          > -->
          <div class="bg-white bg-opacity-10 shadow-lg rounded-xl">
            <span id="year" class="hidden py-2 "></span>
            <input
              maxlength="2"
              type="text"
              placeholder="Nombre del grupo. Ej: BE"
              v-model="new_group.name"
              class=" transition text-sm placeholder-gray-400 py-2 px-2 | bg-white duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-lg rounded-xl outline-none"
            />
          </div>
        </div>
      </form>
      <label class="block text-lg text-center"
        >Seleccionar una orientación</label
      >
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-h-72 overflow-auto"
      >
        <div
          class="flex justify-between items-center cursor-pointer m-3 px-2 py-2
        bg-gray-700 bg-opacity-90 border-2 border-gray-600 rounded-xl transform transition-transform"
          :id="'orientation_' + orientation.id"
          v-for="orientation in orientations"
          :key="orientation.id"
          @click="toggleOrientation(orientation)"
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
            <p class="select-none">Año: {{ orientation.year }}</p>
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
      last_orientation_id: null,
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
    toggleOrientation(orientationSelected) {
      // Deseleccionando todas las orientaciones del DOM

      this.orientations.forEach((orientationToDeselect) => {
        let orientationDiv = document.getElementById(
          "orientation_" + orientationToDeselect.id
        );
        let orientationIcon = document.getElementById(
          "orientation_icon_" + orientationToDeselect.id
        );
        let orientationName = document.getElementById(
          "orientation_name_" + orientationToDeselect.id
        );

        orientationDiv.classList.remove("scale-95");
        orientationDiv.classList.replace("bg-gray-800", "bg-gray-700");
        orientationIcon.classList.replace("fa-check-square", "fa-square");
        orientationIcon.classList.remove("text-indigo-400");
        orientationName.classList.remove("text-indigo-400");
      });

      let orientationDiv = document.getElementById(
        "orientation_" + orientationSelected.id
      );
      let orientationIcon = document.getElementById(
        "orientation_icon_" + orientationSelected.id
      );
      let orientationName = document.getElementById(
        "orientation_name_" + orientationSelected.id
      );
      var yearSpan = document.getElementById("year");

      if (orientationSelected != this.new_group.orientation) {
        this.new_group.orientation = orientationSelected;
        yearSpan.innerHTML =
          orientationSelected.year +
          (orientationSelected.year == "1" || orientationSelected.year == "3"
            ? "ero"
            : "do");
        yearSpan.classList.add("px-2");
        yearSpan.classList.remove("hidden");
        // Añado las clases al div y al icono para que quede "seleccionada"
        orientationDiv.classList.add("scale-95");
        orientationDiv.classList.replace("bg-gray-700", "bg-gray-800");
        orientationIcon.classList.replace("fa-square", "fa-check-square");
        orientationIcon.classList.add("text-indigo-400");
        orientationIcon.classList.replace(
          "hover:text-indigo-400",
          "hover:text-indigo-300"
        );
        orientationName.classList.toggle("text-indigo-400");
      } else {
        yearSpan.innerHTML = "";
        yearSpan.classList.remove("px-2");
        yearSpan.classList.remove("hidden");
        this.new_group.orientation = null;
      }
    },
    validateData() {
      if (this.new_group.name.length == 0) {
        this.$swal({
          icon: "error",
          title: `Debes ingresar el nombre del grupo!`,
        });
        return false;
      } else if (this.new_group.orientation === null) {
        this.$swal({
          icon: "error",
          title: `Debes seleccionar una orientación!`,
        });
        return false;
      }else{
        return true;
      }
    },
    async createGroup() {
      if (this.validateData()) {
        let data = {
          orientacion: parseInt(this.new_group.orientation.id),
          name: this.new_group.name,
        };
        await axios({
          method: "post",
          url: this.API_URL + "/group",
          data: data,
          headers: this.headers,
        })
          .then((res) => {
            // Si no existe el objeto result en res.data entonces no hubieron errores
            console.log(res);
            if (!("result" in res.data)) {
              res.data.orientation_name = this.new_group.orientation.name;
              this.$emit("addGroup", res.data);
              this.changeModeToList();
              this.$swal({
                icon: "success",
                title: `El grupo "${this.new_group.name}" fue creado correctamente!`,
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
      }
    },
  },
};
</script>

<style></style>
