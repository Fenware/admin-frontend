<template>
  <main class="mx-auto w-full overflow-y-auto" v-if="isLoginView()">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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
