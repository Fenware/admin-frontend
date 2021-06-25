<template>
  <main class="bg-glass">
    <div class="" v-if="currentRouteName != 'Login'">
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: "Main",
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style></style>
