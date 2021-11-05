<template>
  <div class="text-white w-full h-full">
    <h2 class="text-center text-3xl pt-1 font-semibold">
      {{getWord({file:'orientation',word:'orientations',lang})}}
    </h2>

    <ListOrientation v-show="mode == 'list'" />

    <CreateOrientation v-if="mode == 'create'" />

    <EditOrientation v-if="mode == 'edit'" />
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getWord } from "@/utils/lang";
import ListOrientation from "@/components/orientations/ListOrientation";
import CreateOrientation from "@/components/orientations/CreateOrientation";
import EditOrientation from "@/components/orientations/EditOrientation";

export default {
  name: "Orientations",
  created() {
    this.getOrientations();
    this.getSubjects();
  },
  components: {
    ListOrientation,
    CreateOrientation,
    EditOrientation,
  },
  computed: {
    ...mapState({ 
      mode: (state) => state.orientations.mode,
      lang: (state) => state.lang,
    }),
  },
  methods: {
    ...mapActions(["getOrientations", "getSubjects"]),
    getWord
  },
};
</script>

<style></style>
