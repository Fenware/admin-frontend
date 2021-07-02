<template>
  <main class="">
    <div class="" v-if="isLoginView()">
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: "MainComponent",
  methods: {
    isLoginView() {
      return this.$route.name != "Login";
    },
  },
};
</script>

<style></style>
