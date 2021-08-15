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
          @click="changeModeToCreate()"
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
        class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 max-h-96 overflow-auto "
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
            <button
              @click="show_modal == !show_modal"
              class=" pl-2 text-xs font-semibold py-1 transition-colors rounded-md border-b-2 hover:border-green-500 border-green-400 bg-green-200 hover:bg-green-300 text-green-900"
            >
              Ver más
              <i
                class="fas fa-caret-down text-green-600 mx-1 text-md drop-shadow-lg"
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

      <transition name="fade">
        <div v-show="show_modal" class="fixed inset-0 z-30">
          <!--       background -->
          <div
            v-show="show_modal"
            @click="show_modal == !show_modal"
            class="bg-filter bg-white opacity-25 fixed inset-0 w-full h-full z-20"
          ></div>
          <!--          -->
          <div class="flex flex-col items-center justify-center h-full w-full">
            <transition name="fade-up-down">
              <div
                v-show="show_modal"
                class="modal-wrapper inline-block flex items-center z-30"
              >
                <div
                  class="modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded relative"
                >
                  <div
                    class="modal-header p-5 bg-gray-900 text-gray-900 rounded-t"
                  >
                    <h5 class="text-white text-2xl uppercase">
                      this is header
                    </h5>
                  </div>
                  <div class="modal-body p-5 w-full h-full overflow-y-auto ">
                    <p class="text-justify">
                      cilis omnis nam illum maiores, porro velit deserunt neque.
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Esse, voluptates eveniet labore dolorum molestiae, modi
                      saepe fugiat minima repudiandae repellendus obcaecati
                      voluptatibus ab tenetur recusandae eius quos at maiores
                      atque consectetur facilis! Nisi fuga
                    </p>
                  </div>
                  <div class="modal-footer py-3 px-5 border0-t text-right">
                    <button
                      class="bg-green-500 px-5 py-2 text-white"
                      @click="show_modal == !show_modal"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListOrientations",
  data: function() {
    return {
      search_word: "",
      filter_by: "all",
      show_modal: false
    };
  },
  props: {
    orientations: Array,
  },
  methods: {
    changeModeToCreate() {
      this.$emit("changeMode", "create");
    },
    confirmDeletion(orientation_id, orientation_name) {
      console.log(orientation_id);
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
          if (result.isConfirmed) {
            this.$emit("deleteOrientation", orientation_id, orientation_name);
          }
        });
    },
  },
};
</script>

<style>
.fade-up-down-enter-active {
  transition: all 0.3s ease;
}
.fade-up-down-leave-active {
  transition: all 0.3s ease;
}
.fade-up-down-enter {
  transform: translateY(10%);
  opacity: 0;
}
.fade-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active {
  -webkit-transition: opacity 2s;
  transition: opacity 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
