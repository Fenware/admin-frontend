<template>
  <div class="text-white w-full px-3">
    <h1 class="text-center text-3xl mt-1 font-semibold">Usuarios</h1>

    <div
      class="my-2 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
    >
      <div
        class="flex justify-between pl-3 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
      >
        <div class="flex items-center">
          <span class="material-icons">people</span>
          <h2 class="p-1 font-extrabold">Lista de usuarios</h2>
        </div>
        <div class="flex items-center mr-1">
          <span class="material-icons mr-2">filter_list</span>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <div class="flex mr-2">
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
              Docentes
            </button>

            <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
            <button
              @click="filter_by = 'student'"
              :class="
                'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                  (filter_by == 'student' ? ' bg-white bg-opacity-20 ' : '')
              "
            >
              Estudiantes
            </button>
          </div>

          <router-link
            :to="{ name: 'UserRegistration' }"
            class="btn-success border-0 rounded-tr-xl py-0.5 px-2 text-sm"
          >
            Crear
          </router-link>
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
          class="w-1/3 focus:w-2/5 placeholder-gray-300 text-center py-2 px-2 | bg-white transition-all transform duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-xl | rounded-xl  outline-none"
        />
      </div>
      <div
        class="py-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
      >
        <div v-show="usersFiltered.length == 0 && text_filter.length === 0">
          <p class="text-center text-2xl my-5">Cargando...</p>
        </div>
        <div v-show="usersFiltered.length == 0 && text_filter.length > 0">
          <p class="text-center text-2xl my-5">No hay coincidencias</p>
        </div>
        <div
          class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 max-h-96 overflow-auto "
        >
          <!-- Haciendo un for de los usuarios filtrados (por defecto se muestran todos) -->
          <div
            v-for="user in usersFiltered"
            :key="user.id"
            class="sm:flex sm:justify-between my-2 mx-3 py-2 px-3 bg-gray-700 border-2 border-gray-600 shadow-md rounded-2xl"
          >
            <div>
              <p
                class="mb-1 text-xs tracking-widest font-extrabold select-none text-indigo-300"
              >
                <!-- Poniendo si es estudiante o docente segun el tipo -->
                {{ user.type == "student" ? "ESTUDIANTE" : "DOCENTE" }}
              </p>

              <p class="font-bold text-xl">
                {{ user.name }}
                {{ user.middle_name }} {{ user.surname }}
                {{ user.second_surname }}
              </p>
              <p>
                <span class="font-medium">CI: </span
                ><span class=" tracking-widest">{{ user.ci }}</span>
              </p>
              <!-- <p>
              <span class="font-medium">Nickname: </span>{{ user.nickname }}
            </p> -->
              <p class="flex items-center">
                <span class="font-medium">
                  {{ user.email }}
                </span>
                <transition name="fade" type="out-in">

                <span
                  :id="`${user.email}_copy_icon`"
                  @click="copyEmail(user.email)"
                  class="material-icons transition-all text-xl ml-1 text-gray-400 cursor-pointer hover:text-gray-300"
                  >content_copy</span
                >
                </transition>

                <transition name="fade" type="out-in">
                  <span
                    :id="`${user.email}_check_icon`"
                    class="hidden material-icons transition-all text-xl ml-1 text-green-500"
                    >check</span
                  >
                </transition>
              </p>
            </div>

            <div
              class="flex md:flex-col flex-wrap gap-2 justify-center md:justify-start"
            >
              <router-link
                :to="{ name: 'User', params: { nickname: user.nickname } }"
                class="btn-info pr-3 mt-1 pl-5 font-semibold flex items-center"
              >
                Ver más
                <span class="material-icons">expand_more</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Muestro el componente para listar usuarios si la variable mode == 'list'
         Le paso por props el array de usuarios
         Le puedo pasar una funcion de este componente para que la use desde el componente hijo -->
    <!-- <ListUsers
      v-show="mode == 'list'"
      @changeMode="changeMode"
    />

    <EditUser v-if="mode == 'edit'" @changeMode="changeMode" /> -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { showAlert } from "@/utils/alerts";

export default {
  name: "Users",
  data: () => {
    return {
      filter_by: "all",
      text_filter: "",
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
    usersFiltered() {
      // Filtrando siempre por tipo de usuario
      let users_filtered =
        this.filter_by == "all"
          ? this.users.filter((user) => user.state_account == "1")
          : this.users.filter(
              (user) => user.type == this.filter_by && user.state_account == "1"
            );

      // Si el filtro es un numero ( osea una cedula )
      if (!isNaN(parseInt(this.text_filter))) {
        // Filtra los usuarios por coincidencias de cedula
        users_filtered = users_filtered.filter(
          (user) => user.ci.indexOf(this.text_filter.toString()) >= 0
        );

        // Si no es un numero y lo ingresado no son espacios
      } else if (
        isNaN(parseInt(this.text_filter)) &&
        this.text_filter.trim() != ""
      ) {
        users_filtered = users_filtered.filter((user) => {
          // Concateno nombres y apellidos
          let nombre =
            user.name +
            " " +
            user.middle_name +
            " " +
            user.surname +
            " " +
            user.second_surname;

          // Filtro usuario si hay coincidencias de lo ingresado con el nombre completo
          return nombre.indexOf(this.text_filter.toString()) >= 0;
        });
      }
      return users_filtered;
    },
  },
  methods: {
    ...mapActions(["getUsers"]),
    ...mapMutations(["setUser"]),
    copyEmail(email) {
      let copy_icon = document.getElementById(email + "_copy_icon");
      let check_icon = document.getElementById(email + "_check_icon");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function() {
          copy_icon.classList.add("hidden");
          check_icon.classList.remove("hidden");

          setTimeout(() => {
            copy_icon.classList.remove("hidden");
            check_icon.classList.add("hidden");
          }, 1500);
        });
      } else {
        showAlert({
          type: "error",
          message: `Tu navegador no soporta la copia automatica, hazlo manualmente.`,
        });
      }
    },
  },
};
</script>

<style>
</style>
