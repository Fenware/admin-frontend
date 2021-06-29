<template>
  <div class="" v-if="currentRouteName == 'Login'">
    <router-view />
  </div>
  <div class="page" v-else>
    <Navbar />
    <Main />
    <Sidebar />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Main from "@/components/Main.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Navbar,
    Main,
    Sidebar,
  },
  methods: {
    ...mapActions(["syncToken"]),
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    this.syncToken();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
:root {
  font-size: 62.5%;
  font-family: "Open Sans", sans-serif;
}

* {
  margin: 0;
  padding: 0;
}

body {
  /* background: linear-gradient(to right top ,#175AD4,#65DF9D); */

  // Posibles fondos

  background-image: url(https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-5120x2880-1432.jpg);
  /* background-image: url(https://4kwallpapers.com/images/wallpapers/macos-monterey-wwdc-21-stock-5k-6016x6016-5584.jpg); */

  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page{
  width: 90vw;
  height: 90vh;
  display: grid;
  justify-content: center;
  grid-template-columns: 6% 69% 20%;
  gap : 2%;
  /* & > *{
    background: rgba( 255, 255, 255, 0.10 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 1rem;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  } */
}
.bg-glass {
  background-color: rgba(255, 255, 255, 0.06);
  /* background-color: rgba(0, 0, 0, 0.2); */
  -webkit-backdrop-filter: blur(2.5rem);
  backdrop-filter: blur(2.5rem);
  border-radius: 1.2rem;

-webkit-box-shadow: 0px 0px 46px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 46px -6px rgba(0,0,0,0.75);
box-shadow: 0px 0px 46px -6px rgba(0,0,0,0.75);
/* -webkit-box-shadow: 0px 0px 41px 1px rgba(0,0,0,1);
-moz-box-shadow: 0px 0px 41px 1px rgba(0,0,0,1);
box-shadow: 0px 0px 41px 1px rgba(0,0,0,1); */
}
</style>
