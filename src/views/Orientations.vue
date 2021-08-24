<template>
  <div class="text-white w-full h-full">
    <h2 class="text-center text-3xl pt-1 font-semibold">
      Orientaciones
    </h2>

    <ListOrientation v-show="mode == 'list'" />

    <CreateOrientation
      v-if="mode == 'create'"
      @changeMode="changeMode"
      @addOrientation="addOrientation"
    />

    <EditOrientation
      v-if="mode == 'edit'"
      :orientation="orientation"
      @changeMode="changeMode"
      @modifyOrientation="modifyOrientation"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListOrientation from "@/components/orientations/ListOrientation";
import CreateOrientation from "@/components/orientations/CreateOrientation";
import EditOrientation from "@/components/orientations/EditOrientation";

export default {
  name: "Orientations",
  created() {
    this.getOrientations();
  },
  components: {
    ListOrientation,
    CreateOrientation,
    EditOrientation,
  },
  computed: {
    ...mapState({
      mode: (state) => state.orientations.mode,
    }),
  },
  methods: {
    ...mapActions(["getOrientations"]),
  },
};
</script>

<style></style>
