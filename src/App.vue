<template>
  <div class="">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["syncToken"]),
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
  background-image: url(https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-5120x2880-1432.jpg);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-glass {
  background-color: rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(2.5rem);
  backdrop-filter: blur(2.5rem);
  border-radius: 1.2rem;
}
</style>
