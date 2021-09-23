<template>
  <div
    class="my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-center pl-3 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center mr-auto">
        <h2 class="p-1 font-extrabold">Lista de grupos</h2>
      </div>
      <div class="flex items-center mr-9">
        <input
          id="searcher"
          type="text"
          placeholder="Buscar grupo por nombre"
          v-model="text_filter"
          class=" px-2 w-16 focus:w-28 transform placeholder-gray-300  pt-0.5 pb-0.5 text-sm | bg-white transition-all duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-xl | rounded-md outline-none"
        />

        <button
          @click="focusSearcher()"
          class="px-1.5 m-1 py-0.5 min-w-max text-sm font-semibold transition-colors rounded-md bg-indigo-200 hover:bg-indigo-300 text-blue-900"
        >
          <i class="fas fa-search "></i>
        </button>
      </div>
      <div class="flex ml-auto items-center">
        <button
          @click="changeMode({mode: 'create'})"
          class="px-2 m-1 py-1 min-w-max text-xs font-semibold rounded-tr-xl transition-colors rounded-md bg-green-200 hover:bg-green-300 text-green-900"
        >
          Crear grupo
        </button>
      </div>
    </div>
    <div
      class="py-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 max-h-96 overflow-auto "
      >
        <!-- Haciendo un for de los usuarios filtrados (por defecto se muestran todos) -->
        <div
          v-for="group in groups"
          :key="group.id"
          class="sm:flex sm:justify-between items-center  my-2 mx-3 py-2 px-3 bg-gray-700 border-2 border-gray-600 shadow-md rounded-2xl"
        >
          <div class="w-8/12">
            <p>
              <span class="font-bold text-xl text-indigo-400 ">
                <span>
                  {{ group.full_name }}
                </span>
                <span class="font-normal text-sm text-white">
                  - {{ group.orientation_name }}
                </span></span
              >
            </p>
            <p class="w-max">
              <span class="font-semibold select-none">Código:</span>
              <span
                class="px-2 py-0.5 ml-1 bg-white rounded-md bg-opacity-10"
                >{{ group.code }}</span
              >
              <i
                class="fas fa-copy ml-1 text-gray-400 cursor-pointer transition-colors duration-300 hover:text-gray-300"
              ></i>
            </p>
          </div>

          <div
            class="flex md:flex-col flex-wrap gap-2 justify-center md:justify-end"
          >
            <button
              @click="changeMode({mode: 'edit', group: group})"
              class=" pr-3 pl-5 text-xs font-semibold py-1.5 transition-colors rounded-md border-b-2 hover:border-indigo-500 border-indigo-400 bg-indigo-200 hover:bg-indigo-300 text-blue-900"
            >
              Ver más
              <i
                class="fas fa-caret-down text-blue-600 mx-1 text-md drop-shadow-lg"
              ></i>
            </button>
            <button
              @click="confirmDeletion(group.id, group.name, group.year)"
              class="flex items-center pl-3 pr-5 py-1.5 text-xs font-semibold transition-colors duration-200 rounded-md border-b-2 hover:border-red-400 border-red-300    bg-red-200 hover:bg-red-300 text-red-900"
            >
              <i
                class="fas fa-exclamation-triangle mx-1 text-md drop-shadow-lg "
              ></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <!--  <div
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
      </div> -->

      <!-- Modal decente -->
      <!-- https://tailwindcomponents.com/component/modal -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "ListOrientations",
  data: function() {
    return {
      text_filter: "",
      filter_by: "all",
    };
  },
  computed: {
    ...mapState({
      groups: (state) => state.groups.groups,
    }),
  },
  methods: {
    ...mapMutations(['changeMode']),
    focusSearcher() {
      let input = document.getElementById("searcher");
      input.focus();
    },
  },
};
</script>

<style></style>
