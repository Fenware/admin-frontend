<template>
  <div
    class="my-4 text-white bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between px-5 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-user-clock"></i>
        <h2 class="p-1">Usuarios pendientes</h2>
      </div>
      <div class="flex items-center">
        <div class="mr-7">
          <i class="fas fa-sort-alpha-down mr-1"></i>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'all'"
            :class="
              'text-sm px-2 py-0.5 ' +
                (filter_by == 'all'
                  ? ' rounded-full bg-white bg-opacity-20'
                  : '')
            "
          >
            Todos
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'teacher'"
            :class="
              'text-sm px-2 py-0.5 ' +
                (filter_by == 'teacher'
                  ? ' rounded-full bg-white bg-opacity-20'
                  : '')
            "
          >
            Docentes
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'student'"
            :class="
              'text-sm px-2 py-0.5 ' +
                (filter_by == 'student'
                  ? ' rounded-full bg-white bg-opacity-20'
                  : '')
            "
          >
            Estudiante
          </button>
        </div>
        <i
          @click="reloadUsersPending()"
          id="reload_icon"
          class="fas fa-sync-alt cursor-pointer animate-none hover:text-gray-300 transition-colors"
        ></i>
      </div>
    </div>
    <div class="flex justify-center my-2">
      <!-- Mostrando el input solo si hay usuarios pendientes para buscar -->
      <input
        type="text"
        v-show="filterUser().length > 0"
        :placeholder="users_pending.length == 0 ? 'No hay usuarios para buscar' : 'Buscar por nombre o cédula'"
        v-model="search_word"
        class="w-96 py-2 px-2 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 shadow-xl | rounded-2xl  outline-none placeholder-white"
      />
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-h-96 overflow-auto"
    >
      
        <!-- Haciendo un for de los usuarios filtrados (por defecto se muestran todos) -->
      <div
        v-for="user in filterUser()"
        :key="user.id"
        class="sm:flex sm:justify-between items-center mt-4 mb-2 mx-5 py-2 px-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-lg rounded-2xl"
      >
        <div>
          <p class="mb-2 text-xs tracking-widest font-extrabold">
            <!-- Poniendo si es estudiante o docente segun el tipo -->
            {{ user.type == "student" ? "ESTUDIANTE" : "DOCENTE" }}
          </p>
          <p><span class="font-bold">CI:</span> {{ user.ci }}</p>

          <p>
            <span class="font-bold">Nombre:</span> {{ user.name }}
            {{ user.middle_name }} {{ user.surname }} {{ user.second_surname }}
          </p>
        </div>

        <div class="flex flex-wrap justify-center sm:justify-end">
          <button
            @click="acceptUserPending(parseInt(user.id))"
            class="cursor-pointer mr-1 pl-1 pr-2 py-1 my-1 bg-green-700 rounded-xl duration-300 transition-colors ease-in-out hover:bg-green-600 "
          >
            <i
              class="fas fa-check text-green-300 mx-1 text-md drop-shadow-lg"
            ></i>
            Aceptar
          </button>
          <button
            @click="declineUserPending(parseInt(user.id))"
            class="cursor-pointer pl-1 pr-2 py-1 my-1 bg-red-700 rounded-xl duration-300 transition hover:bg-red-600 "
          >
            <i
              class="fas fa-times text-red-300 mx-1 text-md drop-shadow-lg "
            ></i>
            Rechazar
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex justify-center items-center"
      v-show="filterUser().length == 0 && filter_by == 'all' && search_word.trim() == ''"
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
        v-show="filterUser().length == 0 && (filter_by == 'student' || filter_by == 'teacher') && search_word.trim() == ''"
    >
        <span class="py-4 text-xl text-white">
          No hay {{ filter_by == "student" ? "estudiantes" : "docentes" }} pendientes <i class="fas fa-check-circle"></i>
        </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "UsersPending",
  data: function() {
    return {
      users_pending: [],
      // "all" para que no me filtre los usuarios por defecto
      filter_by: "all",
      // Variable para buscar usuario
      search_word: "",
    };
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  created() {
    this.getUsersPending();
  },
  methods: {
    async reloadUsersPending() {
      // Obtengo el icono de actualizar
      let reload = document.getElementById("reload_icon");
      // Le añado la animacion 'animate-spin' para que gire
      reload.classList.replace("animate-none", "animate-spin");
      // Sincronizo los usuarios pendientes
      this.getUsersPending();
      // Despues de 1 segundo detengo la animacion sacandole la clase
      setTimeout(function() {
        reload.classList.replace("animate-spin", "animate-none");
      }, 1000);
    },
    async getUsersPending() {
      await axios({
        method: "get",
        url: this.API_URL + "/user-pendiente",
        headers: this.headers,
      })
        .then((res) => {
          console.log(res.data);
          this.users_pending = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async declineUserPending(id) {
      await axios({
        method: "delete",
        url: this.API_URL + "/user-pendiente",
        data: {
          // Id del usuario a rechazar
          id: id,
        },
        headers: this.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            // Quito al usuario de la lista
            this.removeUserPending(id);
          } else {
            console.log("Error: declineUserPending");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async acceptUserPending(id) {
      await axios({
        method: "post",
        url: this.API_URL + "/user-pendiente",
        data: {
          // Id del usuario a aceptar
          id: id,
        },
        headers: this.headers,
      })
        .then((res) => {
          if (res.data == 1) {
            // Quito al usuario de la lista
            this.removeUserPending(id);
          } else {
            console.log("Error: acceptUserPending");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeUserPending(id) {
      // Busco al usuario por su id y lo elimino del array
      this.users_pending.forEach((user, index) => {
        if (user.id == id) {
          this.users_pending.splice(index, 1);
        }
      });
    },
    filterUser() {
      // Filtrando siempre por tipo de usuario
      let users_filtered = this.filter_by == "all" ? this.users_pending : this.users_pending.filter((user) => user.type == this.filter_by);

      // Si el filtro es un numero ( osea una cedula )
      if (!isNaN(parseInt(this.search_word))) {
        // Filtra los usuarios por coincidencias de cedula
        users_filtered = users_filtered.filter((user) => user.ci.indexOf(this.search_word.toString()) >= 0);

        // Si no es un numero y lo ingresado no son espacios
      }else if(isNaN(parseInt(this.search_word)) && this.search_word.trim() != ""){

        users_filtered = users_filtered.filter((user) => {
          // Concateno nombres y apellidos
          let nombre = user.name + ' ' + user.middle_name + ' ' + user.surname + ' ' + user.second_surname;

          // Filtro usuario si hay coincidencias de lo ingresado con el nombre
          return nombre.indexOf(this.search_word.toString()) >= 0;
        });
      }
      return users_filtered;
    },
  },
};
</script>

<style></style>
