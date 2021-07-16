<template>
  <div
    class="  m-3 py-3 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl"
    v-for="(orientation, index) in orientations"
    :key="orientation.id + index"
  >
    <div class="">
      <OrientationCard :orientation="orientation" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import OrientationCard from "@/components/OrientationCard";

export default {
  name: "OrientationsContainer",
  components: {
    OrientationCard,
  },
  data: function() {
    return {
      edit_mode: false,
      orientation_data: { name: "", year: null, subjects: [] },
    };
  },
  computed: {
    ...mapState(["API_URL", "headers", "user", "subjects", "orientations"]),
  },
  methods: {
    ...mapActions(["createOrientation"]),
  },
};
</script>

<style></style>
