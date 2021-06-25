<template>
  <div class=""></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapActions(["syncToken"]),
  },
  created() {
    console.log(this.$route.name);
    this.syncToken();
  },
};
</script>

<style lang="scss" scoped></style>
