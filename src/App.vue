<template>
  <div class="" v-if="currentRouteName() == 'Login'">
    <router-view />
  </div>
  <div class="page" v-else>
    <!-- <Navbar />
    <Main />
    <Sidebar /> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  components: {},
  methods: {
    ...mapActions(["syncToken"]),
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    this.syncToken();
  },
};
</script>

<style>
body {
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');
  font-family: 'Nunito', sans-serif;
  /* background: linear-gradient(to right top ,#175AD4,#65DF9D); */
  background-image: url("./assets/background.svg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
