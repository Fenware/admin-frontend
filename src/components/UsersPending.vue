<template>
  <div
    class="m-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between px-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-user-clock"></i>
        <h2 class="p-1 font-extrabold">Usuarios pendientes</h2>
      </div>
      <div class="flex items-center">
        <div class="mr-7">
          <i class="fas fa-sort-alpha-down mr-2"></i>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="setFilter('all')"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'all' ? '  bg-white bg-opacity-20 ' : '')
            "
          >
            Todos
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="setFilter('teacher')"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'teacher' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            Docentes
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="setFilter('student')"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'student' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            Estudiantes
          </button>
        </div>
        <i
          @click="reloadUsersPending()"
          id="reload_icon"
          class="fas fa-sync-alt cursor-pointer animate-none hover:text-gray-300 transition-colors"
        ></i>
      </div>
    </div>
    <div
      class="flex justify-center px-5 border-l-2 border-r-2 pt-5 border-gray-700"
    >
      <!-- Mostrando el input solo si hay usuarios pendientes para buscar -->
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        v-model="text_filter"
        v-on:keyup="setTextFilter(text_filter)"
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
          v-for="user in usersFiltered"
          :key="user.id"
          class="sm:flex sm:justify-between items-center mt-4 mb-2 mx-5 py-2 px-3 bg-gray-700 border-2 border-gray-600 shadow-md rounded-2xl"
        >
          <div>
            <p class="mb-2 text-xs tracking-widest font-extrabold">
              <!-- Poniendo si es estudiante o docente segun el tipo -->
              {{ user.type == "student" ? "ESTUDIANTE" : "DOCENTE" }}
            </p>
            <p><span class="font-bold">CI:</span> {{ user.ci }}</p>

            <p>
              <span class="font-bold">Nombre:</span> {{ user.name }}
              {{ user.middle_name }} {{ user.surname }}
              {{ user.second_surname }}
            </p>
          </div>

          <div
            class="flex md:flex-col flex-wrap gap-2 justify-center md:justify-end"
          >
            <button
              @click="acceptUserPending(user)"
              class="px-3 mb-1 min-w-max text-sm font-semibold py-1 transition-colors rounded-md border-b-2 hover:border-green-500 border-green-400 bg-green-200 hover:bg-green-300 text-green-900"
            >
              <i class="fas fa-check mx-1 text-md drop-shadow-lg"></i>
              Aceptar
            </button>
            <button
              @click="declineUserPending(user)"
              class="px-3 mb-1 min-w-max text-sm font-semibold py-1 transition-colors rounded-md border-b-2 hover:border-yellow-500 border-yellow-400 bg-yellow-200 hover:bg-yellow-300 text-yellow-900"
            >
              <i
                class="fas fa-exclamation-triangle mx-1 text-md drop-shadow-lg "
              ></i>
              Rechazar
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="
          usersFiltered.length == 0 &&
            filter_by == 'all' &&
            text_filter.trim() == ''
        "
      >
        <span class="py-4 text-xl text-white">
          No hay usuarios pendientes <i class="fas fa-check-circle"></i>
        </span>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="usersFiltered.length == 0 && text_filter.trim() != ''"
      >
        <span class="py-4 text-xl text-white">
          No hay coincidencias
        </span>
      </div>
      <div
        class="flex justify-center items-center"
        v-show="
          usersFiltered.length == 0 &&
            (filter_by == 'student' || filter_by == 'teacher') &&
            text_filter.trim() == ''
        "
      >
        <span class="py-4 text-xl text-white">
          No hay
          {{ filter_by == "student" ? "estudiantes" : "docentes" }} pendientes
          <i class="fas fa-check-circle"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "UsersPending",
  data:() => {
    return{
      text_filter: ""
    }
  },
  computed: {
    ...mapState({filter_by : state => state.usersPending.filter_by}),
    ...mapGetters(["usersFiltered"]),
  },
  created() {
    this.getUsersPending();
  },
  methods: {
    ...mapActions([
      "getUsersPending",
      "acceptUserPending",
      "declineUserPending",
    ]),
    ...mapMutations(["setTextFilter", "setFilter"]),
    reloadUsersPending() {
      // Obtengo el icono de actualizar
      let reload = document.getElementById("reload_icon");
      // Le añado la animacion 'animate-spin' para que gire
      reload.classList.replace("animate-none", "animate-spin");
      // Obtengo nuevamente los usuarios pendientes
      this.getUsersPending();
      // Despues de 1 segundo detengo la animacion sacandole la clase
      setTimeout(function() {
        reload.classList.replace("animate-spin", "animate-none");
      }, 1000);
    },
  },
};
</script>

<style></style>
