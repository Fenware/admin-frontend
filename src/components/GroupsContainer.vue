<template>
  <div
    class=" max-h-28 m-3 py-3 w-full bg-gray-700 border-2 border-gray-600 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl"
    v-for="group in groups"
    :key="group.id"
  >
    <GroupCard :group="group" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GroupCard from "@/components/GroupCard";

export default {
  name: "GroupsContainer",
  components: {
    GroupCard,
  },
  data: function() {
    return {
      edit_mode: false,
    };
  },
  computed: {
    ...mapState(["API_URL", "headers", "groups"]),
  },
};
</script>

<style></style>
