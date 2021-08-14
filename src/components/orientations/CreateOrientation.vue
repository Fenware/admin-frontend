<template>
  <div
    class="max-w-screen-sm mx-auto my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between pl-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-folder-plus pb-1"></i>
        <h2 class="px-2 font-extrabold">Crear orientación</h2>
      </div>
      <div class="flex items-center">
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
        class="flex flex-wrap items-center justify-start sm:justify-around"
      >
        <div class="">
          <label class="block text-xs pl-1 mt-2">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese el nombre  de la oreintación"
            v-model="new_orientation.name"
            class="w-60 sm:w-80 text-sm placeholder-gray-400 py-2 px-2 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-lg rounded-xl outline-none"
          />
        </div>
        <div class="flex sm:justify-center justify-start mt-2 mx-1">
          <div>
            <label class="block text-xs">Bachillerato</label>
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
      <!-- <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-h-96 overflow-auto "
      ></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateOrientation",
  data: function() {
    return {
      search_word: "",
      filter_by: "all",
      new_orientation: {
        name: "",
        year: 1,
      },
    };
  },
  methods: {
    changeModeToList() {
      this.$emit("changeMode", "list");
    },
  },
};
</script>

<style></style>
