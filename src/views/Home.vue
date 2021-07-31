<template>
  <div class="w-full">
    <h1 @click="showAlert()" class="text-white text-center text-3xl pt-1">
      Administrador Chathink
    </h1>

    <UsersPending />
  </div>
</template>

<script>
// @ is an alias to /src
import UsersPending from "@/components/UsersPending";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    UsersPending,
  },
  methods: {
    ...mapActions(["showAlert"]),
  },
};
</script>
