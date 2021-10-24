<template>
  <main class="mx-auto w-full overflow-y-auto relative" v-if="isLoginView()">
    <ToggleLanguageButton class="absolute top-0 right-0 p-1 bg-opacity-0"/>
    <router-view/>
  </main>
</template>

<script>
import ToggleLanguageButton from '@/components/ToggleLanguageButton.vue';

export default {
  name: "MainComponent",
  methods: {
    isLoginView() {
      return this.$route.name != "Login";
    },
  },
  components: {
    ToggleLanguageButton,
  },
};
</script>

<style>
main{
  font-family: "Montserrat", sans-serif !important;
}
</style>
