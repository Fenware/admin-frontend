<template>
  <div class="">
    <div class="flex px-2 justify-between">
      <span
        class="py-1 px-2 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-lg"
        >{{ orientation.name }}</span
      >
      <span
        class="flex-none py-1 px-5 ml-3 | bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >Año: {{ orientation.year }}</span
      >
    </div>
    <div class="mt-2 ml-2 flex justify-between">
      <div div class="flex">
        <div
          class="flex items-center"
          v-for="(subject, index) in orientationSubjctsFiltered"
          :key="subject.id_subject + index"
        >
          <p class="px-2 mx-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl shadow-2xl rounded-full" v-if="parseInt(subject.id_orientation) == parseInt(orientation.id)">{{ subject.name }}</p>
        </div>
      </div>
      <button
        @click="modifyOrientation()"
        class="py-1 px-5 mr-2 | transition-colors duration-200 bg-blue-700  bg-opacity-50 hover:bg-opacity-70 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
      >
        Editar
      </button>
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
  /* data: function() {
    return { orientation_subjects: this.orientation_subjects };
  }, */
  computed: {
    ...mapState(["API_URL", "headers"]),
    ...mapGetters(['orientationSubjctsFiltered']),
  },
  created() {
    /* this.orientation_subjects = this.getOrientationSubjects(parseInt(this.orientation.id)); */
    this.getOrientationSubjects(parseInt(this.orientation.id));
  },
  methods: {
    ...mapMutations(["toogleModifyOrientationMode"]),
    ...mapActions(["getOrientationSubjects"]),

    generateSubjectsArray(orientation_subjects_data) {
      orientation_subjects_data.forEach((orientation_subject) => {
        this.subjects.forEach((subject) => {
          if (orientation_subject.id_subject == parseInt(subject.id)) {
            this.orientation_subjects.push(subject);
          }
        });
      });
    },
    modifyOrientation() {
      this.toogleModifyOrientationMode();
      this.setOrientation(this.orientation);
    },
  },
};
</script>

<style></style>
