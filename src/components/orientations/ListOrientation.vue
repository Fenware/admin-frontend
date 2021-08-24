<template>
  <div
    class="my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between pl-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-plane"></i>
        <h2 class="p-1 font-extrabold">Lista de orientaciones</h2>
      </div>
      <div class="flex items-center">
        <div class="mr-3">
          <i class="fas fa-sort-alpha-down mr-2"></i>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'all'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'all' ? '  bg-white bg-opacity-20 ' : '')
            "
          >
            Todos
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 1"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 1 ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            1ero
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 2"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 2 ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            2do
          </button>

          <button
            @click="filter_by = 3"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 3 ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            3ero
          </button>
        </div>
        <button
          @click="changeMode('create')"
          class="px-2 m-1 py-1 text-xs font-semibold rounded-tr-xl transition-colors rounded-md bg-green-200 hover:bg-green-300 text-green-900"
        >
          Agregar
        </button>
      </div>
    </div>
    <div
      class="flex justify-center px-5 border-l-2 border-r-2 pt-5 border-gray-700"
    >
      <!-- Mostrando el input solo si hay usuarios pendientes para buscar -->
      <input
        type="text"
        placeholder="Buscar orientación por nombre"
        v-model="text_filter"
        class="w-1/3 focus:w-2/5 placeholder-gray-300 text-center py-2 px-2 | bg-white transition-all transform duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-xl | rounded-xl  outline-none"
      />
    </div>
    <div
      class="py-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-h-96 overflow-auto "
      >
        <!-- Haciendo un for de los usuarios filtrados (por defecto se muestran todos) -->
        <div
          v-for="orientation in orientationsFiltered()"
          :key="orientation.id"
          class="sm:flex sm:justify-between items-center mt-4 mb-2 mx-5 py-2 px-3 bg-gray-700 border-2 border-gray-600 shadow-md rounded-2xl"
        >
          <div class="w-8/12">
            <p>
              <span class="font-bold">{{ orientation.name }}</span>
            </p>
            <p><span class="font-bold">Año:</span> {{ orientation.year }}</p>
          </div>

          <div
            class="flex md:flex-col flex-wrap gap-2 justify-center md:justify-end"
          >
            <button
              @click="changeMode('edit', orientation)"
              class=" pl-2 text-xs font-semibold py-1 transition-colors rounded-md border-b-2 hover:border-indigo-500 border-indigo-400 bg-indigo-200 hover:bg-indigo-300 text-blue-900"
            >
              Ver más
              <i
                class="fas fa-caret-down text-blue-600 mx-1 text-md drop-shadow-lg"
              ></i>
            </button>
            <button
              @click="confirmDeletion(orientation.id, orientation.name)"
              class=" px-5 py-1 text-xs font-semibold transition-colors duration-200 rounded-md border-b-2 hover:border-red-400 border-red-300    bg-red-200 hover:bg-red-300 text-red-900"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="
          orientationsFiltered().length == 0 &&
            filter_by == 'all' &&
            text_filter.trim() == ''
        "
      >
        <span class="py-4 text-xl text-white">
          No hay orientaciones creadas
        </span>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="orientationsFiltered().length == 0 && text_filter.trim() != ''"
      >
        <span class="py-4 text-xl text-white">
          No hay coincidencias
        </span>
      </div>
      <!-- <div
        class="flex justify-center items-center"
        v-show="
          orientations.length == 0 &&
            (filter_by == 'student' || filter_by == 'teacher') &&
            search_word.trim() == ''
        "
      >
        <span class="py-4 text-xl text-white">
          No hay
          {{ filter_by == "student" ? "estudiantes" : "docentes" }} pendientes
          <i class="fas fa-check-circle"></i>
        </span>
      </div> -->

      <!-- Modal decente -->
      <!-- https://tailwindcomponents.com/component/modal -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "ListOrientations",
  data: function() {
    return {
      text_filter: "",
      filter_by: "all",
    };
  },
  computed: {
    ...mapState({ orientations: (state) => state.orientations.orientations }),
  },
  methods: {
    ...mapMutations(["changeMode"]),
    ...mapActions(["deleteOrientation"]),
    orientationsFiltered() {
      // Filtro las orientaciones por coincidencias de nombre
      let orientations_filtered = this.orientations.filter(
        (orientation) =>
          orientation.name
            .toLowerCase()
            .indexOf(this.text_filter.toLowerCase()) >= 0
      );

      if (this.filter_by == 1) {
        orientations_filtered = orientations_filtered.filter(
          (orientation) => parseInt(orientation.year) == 1
        );
      } else if (this.filter_by == 2) {
        orientations_filtered = orientations_filtered.filter(
          (orientation) => parseInt(orientation.year) == 2
        );
      } else if (this.filter_by == 3) {
        orientations_filtered = orientations_filtered.filter(
          (orientation) => parseInt(orientation.year) == 3
        );
      }
      return orientations_filtered;
    },
    confirmDeletion(orientation_id, orientation_name) {
      // Modal para confirmar si quiere eliminar la orientacion
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
          html: `<span class="text-white">¿Eliminar la orientación <b>${orientation_name}</b>?</span>`,
          showCancelButton: false,
          confirmButtonText: `Eliminar`,
          denyButtonText: `Cancelar`,
        })
        .then((result) => {
          // Si le da al boton de eliminar llamo a la funcion
          if (result.isConfirmed) {
            this.deleteOrientation({
              id: orientation_id,
              name: orientation_name,
            });
          }
        });
    },
  },
};
</script>

<style></style>
