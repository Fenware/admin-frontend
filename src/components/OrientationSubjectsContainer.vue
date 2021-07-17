<template>
  <div
    v-if="edit_mode"
    class="flex overflow-auto flex-wrap mx-auto md:max-w-2xl lg:max-w-3xl mt-5"
  >
    <div v-for="subject in subjectsFiltered" :key="subject.id">
      <div
        :id="subject.id"
        :class="
          subjectIsSelected(parseInt(subject.id))
            ? ' scale-110 bg-blue-700 bg-opacity-50 block m-2 px-5 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-filter backdrop-blur-xl shadow-2xl rounded-full cursor-pointer transform-gpu transition-all duration-200'
            : ' block m-2 px-5 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-filter backdrop-blur-xl shadow-2xl rounded-full cursor-pointer transform-gpu transition-all duration-200'
        "
        v-if="subject.state == 1"
        @click="toogleSubject(subject.id)"
      >
        <span class=" bg-transparent outline-none select-none" type="text">
          {{ subject.name }}
        </span>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex overflow-auto flex-wrap mx-auto md:max-w-2xl lg:max-w-3xl mt-5"
  >
    <div v-for="subject in subjectsFiltered" :key="subject.id">
      <div
        :id="subject.id"
        class="block m-2 px-5 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-filter backdrop-blur-xl shadow-2xl rounded-full cursor-pointer transform-gpu transition-all duration-200"
        v-if="subject.state == 1"
        @click="toogleSubject(subject.id)"
      >
        <span class=" bg-transparent outline-none select-none" type="text">
          {{ subject.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "SubjectContainer",
  data: function() {
    return {
      preselectedSubjects: [],
    };
  },
  props: {
    orientation: Object,
    edit_mode: Boolean,
  },
  created() {
    if (this.edit_mode) {
      this.sortPreselectedSubjects();
    }
  },
  computed: {
    ...mapState([
      "subjects",
      "orientations_subjects",
    ]),
    ...mapGetters(["subjectsFiltered"]),
  },
  methods: {
    ...mapActions(["createSubject", "removeSubject", "editSubject"]),
    ...mapMutations([
      "onlySelectOrientationSubject",
      "onlyDeleteOrientationSubject",
      "setModifyOrientationSubjects",
      "addOriginalOrientationSubjects",
    ]),
    toogleSubject(id) {
      let subject_card = document.getElementById(id);
      subject_card.classList.toggle("scale-110");
      subject_card.classList.toggle("bg-blue-700");
      subject_card.classList.toggle("bg-opacity-50");

      if (subject_card.classList.contains("scale-110")) {
        this.onlySelectOrientationSubject(parseInt(id));
      } else {
        this.onlyDeleteOrientationSubject(parseInt(id));
      }
    },
    sortPreselectedSubjects() {
      this.subjects.forEach((subject) => {
        this.orientations_subjects.forEach((orientationSubject) => {
          if (
            parseInt(subject.id) == orientationSubject.id_subject &&
            parseInt(this.orientation.id) == orientationSubject.id_orientation
          ) {
            subject.selected = true;
            this.preselectedSubjects.push(parseInt(subject.id));
            this.addOriginalOrientationSubjects(parseInt(subject.id));
          }
        });
      });
      this.setModifyOrientationSubjects(this.preselectedSubjects);
    },
    subjectIsSelected(id) {
      let matched = false;
      this.preselectedSubjects.forEach((subject) => {
        if (subject == id) {
          matched = true;
        }
      });
      return matched;
    },
  },
};
</script>

<style></style>
