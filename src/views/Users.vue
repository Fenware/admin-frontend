<template>
  <div class="text-white w-full ">
    <h1 class="text-center text-3xl mt-1 font-semibold">
      Usuarios
    </h1>
    <ListUsers :users="users" />
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
    async getUsers() {
      await axios({
        method: "get",
        url: this.API_URL + "/user",
        headers: this.headers,
      })
        .then((res) => {
          if(Array.isArray(res.data)){
            this.users = res.data;
            console.log(this.users);
          }else{
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
