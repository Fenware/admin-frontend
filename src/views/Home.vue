<template>
  <div class="w-full">
    <h1 class="text-white text-center text-3xl font-semibold pt-1">
      {{getWord({file:'lang',word:'admin_chathink',lang})}}
    </h1>

    <UsersPending />
  </div>
</template>

<script>
// @ is an alias to /src
import UsersPending from "@/components/UsersPending";
import { mapState } from "vuex";
import { getWord } from "@/utils/lang";

export default {
  name: "Home",
  components: {
    UsersPending,
  },
  computed: {
    ...mapState({ 
      lang: (state) => state.lang,
    }),
  },
  methods: {
    getWord,
  },
};
</script>
