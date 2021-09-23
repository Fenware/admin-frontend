<template>
  <div
    class="
      max-w-screen-sm
      mx-auto
      my-4
      text-white
      bg-gray-600 bg-opacity-10
      backdrop-filter backdrop-blur-xl
      shadow-2xl
      rounded-2xl
    "
  >
    <div
      class="
        flex
        justify-between
        pl-5
        items-center
        bg-gray-200 bg-opacity-10
        backdrop-filter backdrop-blur-xl
        shadow-2xl
        rounded-t-2xl
      "
    >
      <div class="flex items-center">
        <span class="material-icons">manage_accounts</span>
        <h2 class="px-2 font-extrabold select-none">Perfil del usuario</h2>
      </div>
      <div class="flex items-center">
        <!-- <button
          @click="createUser()"
          class="px-3 m-1 py-1 text-xs font-semibold transition-colors rounded-md bg-indigo-200 hover:bg-indigo-300 text-blue-900"
        >
          Guardar
        </button> -->

        <button
          @click="changeModeToList()"
          class="btn-info rounded-tr-xl px-2 m-1 py-1 border-0 text-xs flex items-center"
        >
          <span class="material-icons text-sm mr-1">arrow_back</span>

          Volver
        </button>
      </div>
    </div>

    <!-- Cuerpo__________________________ -->

    <div
      class="p-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <h1 class="text-2xl text-indigo-300 font-bold text-center">{{ user.type == "student" ? "ESTUDIANTE" : "DOCENTE" }}</h1>

      <div class="grid grid-cols-2 gap-2 px-10">
        <div class="mb-5 mt-2 col-span-2 flex items-center">
          <img
            class="w-3/12 mr-5"
            :src="require('@/assets/avatars/' + user.avatar)"
            alt="avatar"
          />
          <div class="w-full">
            <div class="block">
              <span class="block select-none text-xs font-medium "
                >Cédula de identidad</span
              >
              <p class="font-medium text-2xl tracking-widest px-2">{{ user.ci }}</p>
            </div>

            <div class="block mt-2 ">
              <label for="nickname" class="block select-none text-xs"
                >Nombre de usuario</label
              >
              <input
                id="nickname"
                class="input w-full"
                type="text"
                :value="user.nickname"
                :placeholder="
                  user.nickname ? 'Ingrese el nombre de usuario' : 'Ninguno'
                "
              />
            </div>
          </div>
        </div>

        <div>
          <label for="name" class="block select-none text-xs">Nombre</label>
          <input id="name" class="input" type="text" :value="user.name" />
        </div>

        <div>
          <label for="middle_name" class="block select-none text-xs"
            >Segundo nombre</label
          >
          <input
            id="middle_name"
            class="input"
            type="text"
            :value="user.middle_name"
            :placeholder="
              !user.middle_name ? 'Ninguno' : 'Ingrese el segundo nombre'
            "
          />
        </div>
        <div>
          <label for="surname" class="block select-none text-xs"
            >Apellido</label
          >
          <input id="surname" class="input" type="text" :value="user.surname" />
        </div>

        <div>
          <label for="second_surname" class="block select-none text-xs"
            >Segundo apellido</label
          >
          <input
            id="second_surname"
            class="input"
            type="text"
            :value="user.second_surname"
            :placeholder="
              !user.second_surname ? 'Ninguno' : 'Ingrese el segundo apellido'
            "
          />
        </div>
        <div class=" col-span-2 mt-">
          <label for="second_surname" class="block select-none text-xs"
            >Email</label
          >
          <input
            id="email"
            class="input w-full"
            type="email"
            :value="user.email"
            :placeholder="
              !user.email ? 'Ninguno' : 'Ingrese el segundo apellido'
            "
          />
        </div>
      </div>
      <button
        @click="removeUser()"
        class="btn-danger text-sm mt-5 ml-auto pt-0.5 px-3 flex items-center"
      >
        <span class="material-icons text-md mr-1">warning</span>
        <span class="mt-0.5">Dar de baja</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { confirmModal } from "@/utils/alerts.js";

export default {
  name: "EditUser",
  data: function() {
    return {
      edited_user: {},
    };
  },
  created() {
    let user = {
      ci: this.user.ci,
      name: this.user.name,
      middle_name: this.user.middle_name,
      surname: this.user.surname,
      second_surname: this.user.second_surname,
      email: this.user.email,
      nickname: this.user.nickname,
      avatar: this.user.avatar,
    };
    this.edited_user = user;
  },
  computed: {
    ...mapState({
      API_URL: (state) => state.API_URL,
      headers: (state) => state.headers,
      user: (state) => state.users.user,
    }),
  },
  methods: {
    ...mapActions(["deleteUser"]),
    changeModeToList() {
      this.$emit("changeMode", "list");
    },
    validateData() {
      if (this.edited_user.name.length == 0) {
        this.$swal({
          icon: "error",
          title: `Debes ingresar un nombre!`,
        });
        return false;
      } else if (this.edited_user.surname.length == 0) {
        this.$swal({
          icon: "error",
          title: `Debes ingresar un apellido!`,
        });
        return false;
      } else if (this.edited_user.email.length == 0) {
        this.$swal({
          icon: "error",
          title: `Debes ingresar un email!`,
        });
        return false;
      } else if (this.edited_user.nickname.length == 0) {
        this.$swal({
          icon: "error",
          title: `Debes ingresar un nickname!`,
        });
        return false;
      } else {
        return true;
      }
    },
    removeUser() {
      confirmModal({
        function: this.deleteUser,
        second_function: this.changeModeToList,
        text: `<span class="text-white"><b>CI: ${this.user.ci}<br> ${this.user.name} ${this.user.surname}  </b> <br> ¿Dar de baja al usuario?</span>`,
        data: {
          user_id: parseInt(this.user.id),
          username: `${this.user.name} ${this.user.surname}`,
        },
      });
    },

    /* async createUser() {
      if (this.validateData()) {
        let data = this.edited_user;
        await axios({
          method: "put",
          url: this.API_URL + "/user",
          data: data,
          headers: this.headers,
        })
          .then(() => {
            this.changeModeToList();
            this.$swal({
              icon: "success",
              title: `El usuario ${this.edited_user.name} fue modificado correctamente!`,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, */
  },
};
</script>

<style>
.w-90per {
  width: 90%;
}
.input {
  @apply w-90per font-medium px-2 py-0.5 transition-all bg-opacity-0 focus:bg-opacity-10 hover:bg-opacity-10 bg-white rounded-md text-xl outline-none;
}
</style>
