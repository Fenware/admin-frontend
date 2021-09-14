<template>
  <div
    class="my-4 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-between pl-3 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
    >
      <div class="flex items-center">
        <i class="fas fa-user "></i>
        <h2 class="p-1 font-extrabold">Lista de usuarios</h2>
      </div>
      <div class="flex items-center mr-5">
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
            <p>
              <span class="font-medium">Nickname: </span>{{ user.nickname }}
            </p>
            <p><span class="font-medium">Correo: </span>{{ user.email }}</p>
          </div>

          <div
            class="flex md:flex-col flex-wrap gap-2 justify-center md:justify-start"
          >
            <button
              @click="changeModeToEdit(user)"
              class=" pr-3 pl-5 font-semibold py-1.5 transition-colors rounded-md border-b-4 hover:border-indigo-500 border-indigo-400 bg-indigo-200 hover:bg-indigo-300 text-blue-900"
            >
              Ver más
              <i
                class="fas fa-caret-down text-blue-600 mx-1 text-md drop-shadow-lg"
              ></i>
            </button>
            <button
              @click="changeModeToDelete(user)"
              class=" btn-danger"            
            >
              Eliminar
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListUsers",
  data: () => {
    return {
      filter_by: "all",
      text_filter: "",
    };
  },
  props: {
    users: Array,
  },
  computed: {
    usersFiltered() {
      // Filtrando siempre por tipo de usuario
      let users_filtered =
        this.filter_by == "all"
          ? this.users
          : this.users.filter((user) => user.type == this.filter_by);

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
  methods:{ //david codeando
    changeModeToEdit(user) {
      this.$emit("changeMode", { mode: 'edit', user});
      
    },
    changeModeToDelete(user){
      this.$emit("changeMode", { mode: 'delete', user});
    },
  },
};
</script>

<style></style>
