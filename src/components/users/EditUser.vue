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
        <i class="fas fa-folder-plus pb-1"></i>
        <h2 class="px-2 font-extrabold select-none">Editar usuario</h2>
      </div>
      <div class="flex items-center">
        <button
          @click="createUser()"
          class="
            px-3
            m-1
            py-1
            text-xs
            font-semibold
            transition-colors
            rounded-md
            bg-indigo-200
            hover:bg-indigo-300
            text-blue-900
          "
        >
          Guardar
        </button>

        <button
          @click="changeModeToList()"
          class="
            px-2
            m-1
            py-1
            text-xs
            font-semibold
            rounded-tr-xl
            transition-colors
            rounded-md
            bg-red-200
            hover:bg-red-300
            text-red-900
          "
        >
          Cancelar
        </button>
      </div>
    </div>

    <!-- Cuerpo__________________________ -->
    <!-- {{ user }} -->

    <div
      class="p-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <form
        @submit.prevent=""
        class="flex items-center justify-start md:justify-around mb-8"
      >
        <!-- <label class="block text-xs pl-12 mt-2 font-semibold select-none"
            >Nombre</label
          > -->
        <div class=" pt-5  shadow-lg rounded-xl">
          <div class="flex justify-center">
            <span class="text-2xl mx-5">CI: {{ user.ci }}</span>
          </div>
          
          
          

          <div class="flex flex-wrap sm:justify-center pt-5 shadow-lg rounded-xl">
            <input
              maxlength="16"
              type="text"
              placeholder="Nombre"
              v-model="edited_user.name"
              class="
                transition
                text-sm
                placeholder-gray-400
                py-2
                px-2
                my-1
                |
                bg-white
                duration-300
                focus:bg-opacity-20
                hover:bg-opacity-20
                bg-opacity-10
                shadow-lg
                rounded-xl
                outline-none
              "
            />
            <input
              maxlength="16"
              type="text"
              placeholder="Segundo Nombre"
              v-model="edited_user.middle_name"
              class="
                transition
                text-sm
                placeholder-gray-400
                py-2
                px-2
                m-1
                |
                bg-white
                duration-300
                focus:bg-opacity-20
                hover:bg-opacity-20
                bg-opacity-10
                shadow-lg
                rounded-xl
                outline-none
              "
            />

            <input
              maxlength="16"
              type="text"
              placeholder="Apellido"
              v-model="edited_user.surname"
              class="
                transition
                text-sm
                placeholder-gray-400
                py-2
                px-2
                m-1
                |
                bg-white
                duration-300
                focus:bg-opacity-20
                hover:bg-opacity-20
                bg-opacity-10
                shadow-lg
                rounded-xl
                outline-none
              "
            />

            <input
              maxlength="16"
              type="text"
              placeholder="Segundo Apellido"
              v-model="edited_user.second_surname"
              class="
                transition
                text-sm
                placeholder-gray-400
                py-2
                px-2
                m-1
                |
                bg-white
                duration-300
                focus:bg-opacity-20
                hover:bg-opacity-20
                bg-opacity-10
                shadow-lg
                rounded-xl
                outline-none
              "
            />
            <input
              maxlength="32"
              type="text"
              placeholder="Nickname"
              v-model="edited_user.nickname"
              class="
                transition
                text-sm
                placeholder-gray-400
                py-2
                px-2
                m-1
                |
                bg-white
                duration-300
                focus:bg-opacity-20
                hover:bg-opacity-20
                bg-opacity-10
                shadow-lg
                rounded-xl
                outline-none
              "
            />
          </div>
          <div class="pt-5 shadow-lg rounded-xl">
            <input
              maxlength="100"
              type="email"
              placeholder="Email"
              v-model="edited_user.email"
              class="
                transition
                text-sm
                placeholder-gray-400
                py-2
                px-2
                w-full
                m-1
                |
                bg-white
                duration-300
                focus:bg-opacity-20
                hover:bg-opacity-20
                bg-opacity-10
                shadow-lg
                rounded-xl
                outline-none
              "
            />
          </div>
         
        <div class="flex mt-3">
            <span class="text-1xl my-3 ml-auto mr-3">Tipo de Usuario: {{ user.type }}</span>
          </div>  
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "EditUser",
  data: function() {
    return {
      edited_user: {},
    };
  },
  props: {
    user: {},
  },
  created() {
    let user = {
      name: this.user.name,
      middle_name: this.user.middle_name,
      surname: this.user.surname,
      second_surname: this.user.second_surname,
      email: this.user.email,
      nickname: this.user.nickname,
    };
    this.edited_user = user;
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  methods: {
    changeModeToList() {
      this.$emit("changeMode", { mode: "list" });
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
    async createUser() {
      console.log("usuario : " + this.edited_user);
      if (this.validateData()) {
        /* let data = {
          name: this.edited_user.name,
          middle_name: this.edited_user.middle_name,
          surname: this.edited_user.surname,
          second_surname: this.edited_user.second_surname,
          email: this.edited_user.email,
          nickname: this.edited_user.nickname,
        }; */
        let data = this.edited_user;
        await axios({
          method: "put",
          url: this.API_URL + "/user",
          data: data,
          headers: this.headers,
        })
          .then((res) => {
            console.log(res.data);
            // if (res.data) {
            //   this.changeModeToList();
            //   this.$swal({
            //     icon: "success",
            //     title: `El usuario ${this.edited_user.name} fue modificado correctamente!`,
            //   });
            // }else if (res.data == 0) {
            //   this.$swal({
            //     icon: "info",
            //     title: 'No has modificado ningún dato!',
            //   });
            // } else {
            //   this.$swal({
            //     icon: "error",
            //     title: res.data.result.error_msg,
            //   });
            // }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
