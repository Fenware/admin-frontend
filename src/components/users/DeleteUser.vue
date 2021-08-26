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
        <h2 class="px-2 font-extrabold select-none">Eliminar usuario</h2>
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
    <div
      class="p-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
    >
      <form @submit.prevent="" class="items-center md:justify-around mb-8">
        <div class="flex flex-wrap pt-5 justify-center shadow-lg rounded-xl">
          <p>
            Esta seguro de que desea inactivar el usuario de cedula
            {{ user.ci }} ?
          </p>
        </div>
        <div class="flex flex-wrap pt-5 justify-center shadow-lg rounded-xl">
          <button
            @click="deleteUser()"
            class="
              pr-3
              pl-5
              font-extrabold
              py-1.5
              transition-colors
              rounded-md
              border-b-4
              hover:border-red-800
              border-red-700
              bg-red-500
              hover:bg-red-600
              text-blue-900
            "
          >
            INACTIVAR USUARIO
          </button>
        </div>
      </form>
      <div class="flex pt-5 mx-5 justify-end shadow-lg rounded-xl">
        <p>
          Tipo de usuario:
          {{ user.type == "student" ? "ESTUDIANTE" : "DOCENTE" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "DeleteUser.vue",
  data: function () {
    return {
      delete_user: {},
    };
  },
  props: {
    user: {},
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  methods: {
    changeModeToList() {
      this.$emit("changeMode", { mode: "list" });
    },
    async deleteUser() {
      let data = this.delete_user;
      await axios({
        method: "delete", //???
        url: this.API_URL + "/user",
        data: data,
        headers: this.headers,
      })
        .then(() => {
          this.changeModeToList();
          this.$swal({
            icon: "success",
            title: `El usuario ${this.delete_user.name} fue inactivado correctamente!`,
          });

          this.$swal({
            icon: "error",
            // title: res.data.result.error_msg,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>