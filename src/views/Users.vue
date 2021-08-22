<template>
  <div class="text-white w-full ">
    <h1 class="text-center text-3xl mt-1 font-semibold">
      Usuarios
    </h1>
    <!-- Muestro el componente para listar usuarios si la variable mode == 'list'
         Le paso por props el array de usuarios
         Le puedo pasar una funcion de este componente para que la use desde el componente hijo -->
    <ListUsers
      v-show="mode == 'list'"
      :users="users"
      @changeMode="changeMode"
    />

    <!-- 
      Ejemplo de componente que use para los grupos
      Le paso el array de orientaciones y el grupo para editarlo
      Tambien le paso la funcion para modificar el grupo
      Asi es como podes comunicar los componentes, si no te queda muy claro busca "comunicacion entre padre hijo vuejs" o preguntame y te explico bien
    -->
    <!-- <EditGroup
      v-if="mode == 'edit'"
      :orientations="orientations"
      :group="group"
      @changeMode="changeMode"
      @modifyGroup="modifyGroup"
    /> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// Componentes
import ListUsers from "@/components/users/ListUsers.vue";

export default {
  name: "Users",
  data: () => {
    return {
      users: [],
      // El modo esta por defecto en listar usuario
      mode: "list",
    };
  },
  components: {
    ListUsers,
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  created() {
    this.getUsers();
  },
  methods: {
    // Esta funcion la uso para cambiar la visibilidad de los componentes (listar, editar, crear, etc)
    changeMode(mode /* , user */) {
      // Si necesitas pasar datos desde el hijo hacia acá podes agregarle parametros y setearselos a una variable en data ted dejo comentado el ejemplo
      this.mode = mode;
      /* this.user = user; */
    },
    async getUsers() {
      await axios({
        method: "get",
        url: this.API_URL + "/user",
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            this.users = res.data;
            console.log(this.users);
          } else {
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
