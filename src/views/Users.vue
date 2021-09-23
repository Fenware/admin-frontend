<template>
  <div class="text-white w-full">
    <h1 class="text-center text-3xl mt-1 font-semibold">Usuarios</h1>
    <!-- Muestro el componente para listar usuarios si la variable mode == 'list'
         Le paso por props el array de usuarios
         Le puedo pasar una funcion de este componente para que la use desde el componente hijo -->
    <ListUsers
      v-show="mode == 'list'"
      @changeMode="changeMode"
    />

    <EditUser v-if="mode == 'edit'" @changeMode="changeMode" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
// Componentes
import ListUsers from "@/components/users/ListUsers.vue";
import EditUser from "@/components/users/EditUser.vue";

export default {
  name: "Users",
  data: () => {
    return {
      // El modo esta por defecto en listar usuario
      mode: "list",
    };
  },
  components: {
    ListUsers,
    EditUser
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions(["getUsers"]),
    // Esta funcion la uso para cambiar la visibilidad de los componentes (listar, editar, crear, etc)
    changeMode(mode) {
      // Si necesitas pasar datos desde el hijo hacia acá podes agregarle parametros y setearselos a una variable en data ted dejo comentado el ejemplo
      this.mode = mode;
    },
  },
};
</script>

<style></style>
