<template>
  <div class="text-white w-full h-full">
    <h2 class="text-center text-3xl mt-1">
      Orientaciones
    </h2>

    <div class="flex justify-between mt-10">
      <input
        type="text"
        placeholder="Buscar orientacion"
        v-model="orientation_filter"
        class="w-96 mx-2 py-2 px-2 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl  outline-none placeholder-white"
      />
      <button
        v-show="!create_orientation_mode && !modify_orientation_mode"
        @click="toogleCreateOrientationMode()"
        class="ml-4 pr-2 | bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 shadow-2xl | rounded-2xl"
      >
        <i
          class="fas fa-plus text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
        Agregar orientacion
      </button>

      <button
        v-show="create_orientation_mode"
        @click="toogleCreateOrientationMode()"
        class="ml-4 pr-2 | bg-red-400 bg-opacity-50 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-60 shadow-2xl | rounded-2xl"
      >
        <i
          class="fas fa-times text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
        Cancelar orientacion
      </button>

      <button
        v-show="modify_orientation_mode"
        @click="toogleModifyOrientationMode()"
        class="ml-4 pr-2 | bg-red-400 bg-opacity-50 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-60 shadow-2xl | rounded-2xl"
      >
        <i
          class="fas fa-times text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
        Cancelar
      </button>
    </div>

    <div
      class="flex overflow-auto h-2/3 mx-auto p-1 flex-wrap md:max-w-2xl lg:max-w-3xl mt-10 bg-white bg-opacity-10  shadow-2xl | rounded-lg"
    >
      <OrientationsContainer
        v-if="!create_orientation_mode && !modify_orientation_mode"
      />
      <CreateOrientationContainer v-if="create_orientation_mode" />
      <ModifyOrientationContainer v-if="modify_orientation_mode" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import OrientationsContainer from "@/components/OrientationsContainer";
import CreateOrientationContainer from "@/components/CreateOrientationContainer";
import ModifyOrientationContainer from "@/components/ModifyOrientationContainer";

export default {
  name: "Orientations",
  data: function() {
    return {
      orientation_filter: "",
    };
  },
  components: {
    OrientationsContainer,
    CreateOrientationContainer,
    ModifyOrientationContainer,
  },
  computed: {
    ...mapState([
      "subjects",
      "orientations",
      "create_orientation_mode",
      "modify_orientation_mode",
    ]),
  },
  methods: {
    ...mapMutations([
      "toogleModifyOrientationMode",
      "toogleCreateOrientationMode",
    ]),
    ...mapActions(["syncOrientations", "syncSubjects"]),
  },
  created() {
    this.syncOrientations();
    this.syncSubjects();
  },
};
</script>

<style></style>
