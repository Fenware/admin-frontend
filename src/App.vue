<template>
  <div class="" v-if="currentRouteName() == 'Login'">
    <router-view/>
  </div>
  <div
    class="flex items-center min-h-screen max-h-screen max-w-screen"
    v-if="currentRouteName() != 'Login'"
  >
    <div
      class=" flex flex-col sm:flex-row sm:justify-between0 h-85vh w-90per mx-auto | bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl | rounded-2xl shadow-md "
    >
      <Navbar />
      <Main class="mt-5 sm:mt-0"/>
      <!-- <Sidebar /> -->
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/TheNavbar";
import Main from "@/components/TheMain";
/* import Sidebar from "@/components/TheSidebar"; */

export default {
  components: {
    Navbar,
    Main,
    /* Sidebar, */
  },
  methods: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style>
body {
  font-family: "Montserrat", sans-serif !important;
  /* background: linear-gradient(to right top ,#175AD4,#65DF9D); */
  background-image: url("./assets/background.svg");
  background-image: no-repeat;
  background-image: fixed;
  background-image: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  height: 100vh;
  width: 100vw;
}
.h-85vh {
  height: 90vh;
}
.w-90per {
  width: 95%;
}
::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(242, 242, 242);
  border-radius: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
* {
    -webkit-tap-highlight-color: transparent;
}
</style>
