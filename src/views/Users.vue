<template>
  <div class="text-white w-full">
    <h1 class="text-center text-3xl mt-1 font-semibold"> {{getWord({file:'user',word:'users',lang})}} </h1>

    <div
      class="my-2 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
    >
      <div
        class="flex justify-between pl-3 items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-t-2xl"
      >
        <div class="flex items-center">
          <span class="material-icons">people</span>
          <h2 class="p-1 font-extrabold"> {{getWord({file:'user',word:'user_list',lang})}} </h2>
        </div>
        <div class="flex items-center mr-5">
          <span class="material-icons mr-2">filter_list</span>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'all'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'all' ? '  bg-white bg-opacity-20 ' : '')
            "
          >
            {{getWord({file:'lang',word:'all',lang})}}
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'teacher'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'teacher' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            {{getWord({file:'lang',word:'teachers',lang})}}
          </button>

          <!-- Al darle click cambia la variable del filtro y se le agregan las clases para que quede "seleccionado" el boton -->
          <button
            @click="filter_by = 'student'"
            :class="
              'text-sm px-2 py-0.5 transition-colors rounded-lg ' +
                (filter_by == 'student' ? ' bg-white bg-opacity-20 ' : '')
            "
          >
            {{getWord({file:'lang',word:'students',lang})}}
          </button>
        </div>
      </div>
      <div
        class="flex justify-center px-5 border-l-2 border-r-2 pt-5 border-gray-700"
      >
        <!-- Mostrando el input solo si hay usuarios pendientes para buscar -->
        <input
          type="text"
          :placeholder="getWord({file:'user',word:'search_by_name_or_id',lang})"
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
                {{ user.type == "student" ? getWord({file:'lang',word:'student',lang}).toUpperCase()  : getWord({file:'lang',word:'teacher',lang}).toUpperCase() }}
              </p>

              <p class="font-bold text-xl">
                {{ user.name }}
                {{ user.middle_name }} {{ user.surname }}
                {{ user.second_surname }}
              </p>
              <p>
                <span class="font-medium">{{getWord({file:'lang',word:'id',lang})}}: </span
                ><span class=" tracking-widest">{{ user.ci }}</span>
              </p>
              <!-- <p>
              <span class="font-medium">Nickname: </span>{{ user.nickname }}
            </p> -->
              <p class="flex items-center">
                <span class="font-medium">{{ user.email }}</span>
                <span
                  class="material-icons text-xl ml-1 text-gray-400 cursor-pointer transition-colors hover:text-gray-300"
                  >content_copy</span
                >
              </p>
            </div>

            <div
              class="flex md:flex-col flex-wrap gap-2 justify-center md:justify-start"
            >
              <router-link
                :to="{ name: 'User', params: { nickname: user.nickname } }"
                class="btn-info pr-3 mt-1 pl-5 font-semibold flex items-center"
              >
                {{getWord({file:'lang',word:'more',lang})}}
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
import { getWord } from "@/utils/lang";

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
      lang: (state) => state.lang,
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
    getWord
  },
};
</script>

<style></style>
