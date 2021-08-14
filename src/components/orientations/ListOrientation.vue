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
            @click="filter_by = 'teacher'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'teacher' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            1ero
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'student'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'student' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            2do
          </button>

          <button
            @click="filter_by = 'student'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'student' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            3ero
          </button>
        </div>
        <button
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
        v-model="search_word"
        class="w-9/12 placeholder-gray-300 text-center py-2 px-2 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-xl | rounded-xl  outline-none"
      />
    </div>
    <div
      class="py-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-h-96 overflow-auto "
      >
        <!-- Haciendo un for de los usuarios filtrados (por defecto se muestran todos) -->
        <div
          v-for="orientation in orientations"
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
            <!-- <button
                class="cursor-pointer font-medium w-32   pl-1  py-1 my-1 bg-gray-700 border-2 border-green-400 hover:bg-green-500 hover:bg-opacity-60 rounded-xl duration-200 transition-colors ease-in-out"
              >
                Ver más
                <i
                  class="fas fa-caret-down text-green-300 mx-1 text-md drop-shadow-lg"
                ></i>
              </button> -->
            <button
              class=" pl-2 text-xs font-semibold py-1 transition-colors rounded-md border-b-2 hover:border-green-500 border-green-400 bg-green-200 hover:bg-green-300 text-green-900"
            >
              Ver más
              <i
                class="fas fa-caret-down text-green-600 mx-1 text-md drop-shadow-lg"
              ></i>
            </button>
            <button
              class=" px-5 py-1 text-xs font-semibold transition-colors duration-200 rounded-md border-b-2 hover:border-red-400 border-red-300    bg-red-200 hover:bg-red-300 text-red-900"
            >
              Eliminar
            </button>
            <!-- <button
                class="cursor-pointer font-medium px-1 py-1 my-1 bg-gray-700 border-2 border-red-400 hover:border-red-300 hover:bg-red-500 hover:bg-opacity-70 rounded-xl duration-300 transition"
              >
                Eliminar
              </button> -->
          </div>
        </div>
      </div>
      <!-- <div
        class="flex justify-center items-center"
        v-show="
          filterUser().length == 0 &&
            filter_by == 'all' &&
            search_word.trim() == ''
        "
      >
        <span class="py-4 text-xl text-white">
          No hay usuarios pendientes <i class="fas fa-check-circle"></i>
        </span>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="filterUser().length == 0 && search_word.trim() != ''"
      >
        <span class="py-4 text-xl text-white">
          No hay coincidencias
        </span>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="
          filterUser().length == 0 &&
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ListOrientations",
  data: function (){
    return{
      search_word: "",
      filter_by: "all",
    }
  },
  props: {
    orientations: Array
  },
  methods:{
  }
};
</script>

<style></style>
