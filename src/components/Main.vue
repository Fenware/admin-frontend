<template>
  <main class="mx-auto w-full overflow-y-auto px-3" v-if="isLoginView()">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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

<style>

</style>
