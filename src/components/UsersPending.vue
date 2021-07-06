<template>
  <div
    class="pb-3 mt-4  text-white bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
  >
    <div
      class="flex justify-center items-center bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl"
    >
      <i class="fas fa-user-clock"></i>
      <h2 class="p-1">Usuarios pendientes</h2>
    </div>

    <div v-for="user in users_pending" :key="user.id" class="flex justify-evenly text-lg my-4 mx-5 py-4 px-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl">
      <p><span class="font-bold">CI:</span> {{user.ci}}</p>
      
      <p><span class="font-bold">Nombre:</span> {{user.name}} {{user.middle_name}} {{user.surname}} {{user.second_surname}}</p>
    
      <div class="text-center">
          <span
            @click="acceptUserPending(parseInt(user.id))"
            class="cursor-pointer mr-1 pl-1 pr-2 py-1 bg-green-700 rounded-full duration-300 transition hover:bg-green-600 "
          >
            <i
              class="fas fa-check text-green-300 mx-1 text-md drop-shadow-lg"
            ></i> 
            Aceptar
          </span>
          <span
            @click="cancelEdit(subject.id)"
            class="cursor-pointer pl-1 pr-2 py-1 bg-red-700 rounded-full duration-300 transition hoverbg-red-600 hover:bg-red-600 "
          >
            <i
              class="fas fa-times text-red-300 mx-1 text-md drop-shadow-lg "
            ></i>
            Rechazar
          </span>
        </div>  
    </div>
    <div class="flex justify-center items-center" v-if="users_pending.length == 0">
      <span class="pt-4 pb-2 text-xl text-white"> No hay usuarios pendientes <i class="fas fa-check-circle"></i> </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "UsersPending",
  computed:{
    ...mapState(['users_pending'])
  },
  methods:{
    ...mapActions(['syncUsersPending','acceptUserPending'])
  },
  created(){
    this.syncUsersPending();
    console.log(this.users_pending);
  }
};
</script>

<style></style>
