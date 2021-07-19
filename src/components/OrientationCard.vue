<template>
  <div class="">
    <div class="flex px-2 justify-between ">
      <span
        class="py-1 px-2 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-lg "
        >{{ orientation.name }}</span
      >
      <span
        class="flex-none py-1 px-5 ml-3 | bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >Año: {{ orientation.year }}</span
      >
    </div>
    <div class="mt-3 ml-2 flex justify-between items-center">
      <div div class="flex overflow-x-auto max-w-lg ">
        <div
          class="flex-none"
          v-for="(subject, index) in orientationSubjctsFiltered"
          :key="subject.id_subject + index"
        >
          <p
            class="px-2 mx-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl shadow-2xl rounded-full select-none"
            v-if="
              parseInt(subject.id_orientation) == parseInt(orientation.id)
            "
          >
            {{ subject.name }}
          </p>
        </div>
      </div>
      <div class="flex ml-1">
        <button
          @click="modifyOrientation()"
          class="py-1 px-5 mr-2 | transition-colors duration-200 bg-blue-700  bg-opacity-50 hover:bg-opacity-70 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >
          Editar
        </button>
        <button
          @click="deleteOrientation(parseInt(orientation.id))"
          class="py-1 px-5 mr-2 | transition-colors duration-200 bg-red-700  bg-opacity-50 hover:bg-opacity-70 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "OrientationCard",
  props: {
    orientation: Object,
  },
  data: function() {
    return {
      count : 0
    };
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
    ...mapGetters(["orientationSubjctsFiltered"]),
  },
  methods: {
    ...mapMutations(["toogleModifyOrientationMode", "setOrientation"]),
    ...mapActions(["getOrientationSubjects",'deleteOrientation']),
    modifyOrientation() {
      this.toogleModifyOrientationMode();
      this.setOrientation(this.orientation);
    },
  },
};
</script>

<style></style>
