<template>
  <div
    class="flex overflow-auto flex-wrap md:max-w-2xl lg:max-w-3xl mt-20 bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-xl"
  >
    <div v-for="subject in subjectsFiltered" :key="subject.id">
      <SubjectCard :subject="subject" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SubjectCard from "@/components/SubjectCard";

export default {
  name: "SubjectContainer",
  components: {
    SubjectCard,
  },
  computed: {
    ...mapState(["subjects"]),
    ...mapGetters(["subjectsFiltered"]),
  },
};
</script>

<style></style>
