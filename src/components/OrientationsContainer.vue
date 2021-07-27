<template>
  <div
    class=" max-h-28 m-3 py-3 w-full bg-gray-700 border-2 border-gray-600 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl"
    v-for="(orientation, index) in orientations"
    :key="orientation.id + index"
  >
    <div>
      <OrientationCard :orientation="orientation" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrientationCard from "@/components/OrientationCard";

export default {
  name: "OrientationsContainer",
  components: {
    OrientationCard,
  },
  data: function() {
    return {
      edit_mode: false,
    };
  },
  computed: {
    ...mapState(["API_URL", "headers", "orientations"]),
  },
};
</script>

<style></style>
