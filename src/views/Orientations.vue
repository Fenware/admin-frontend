<template>
  <div class="text-white w-full h-full">
    <h2 class="text-center text-3xl mt-1">Orientaciones</h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Orientetions",
  methods:{
    ...mapActions(['checkSession', 'syncOrientations'])
  },
  created(){
    this.checkSession();
    this.syncOrientations();
  }
};
</script>

<style></style>
