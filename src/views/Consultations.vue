<template>
  <div class="text-white w-full min-h-full" style="min-width: 15rem;">
    <div class="flex justify-between h-85vh">
      <TheConsultation v-if="consultation.active" />
      <div class="flex justify-center items-center mx-auto" v-else>
        <p class="text-2xl">Seleccione una consulta</p>
      </div>

      <div class="h-92vh bg-gray-700 rounded-2xl shadow-xl">
        <div class="text-center px-2 rounded-t-2xl rounded-b-md bg-gray-600">
          <div class="flex justify-between items-center pt-1">
            <h2 class="text-center text-2xl">
              Consultas
            </h2>
            <div>
              <router-link
                class="flex btn-info text-xs border-0"
                :to="{ name: 'User', params: { nickname: user.nickname } }"
                @click="clearConsultation()"
              >
                Volver
              </router-link>
            </div>
          </div>
          <p class="font-medium">
            {{ user.name }} {{ user.middle_name }} {{ user.surname }}
            {{ user.second_surname }}
          </p>
        </div>
        <div class=" mt-2 overflow-y-auto px-2" style="height: 31rem;">
          <div v-if="consultations.length == 0">
            <p>No tienes consultas pendientes</p>
          </div>
          <div
            @click="viewConsultation(consultation)"
            class=" text-white my-0.5 py-3 px-2 hover:bg-gray-800 hover:bg-opacity-40 transition-colors rounded-xl cursor-pointer"
            v-for="consultation in consultations"
            :key="consultation.id"
            :id="'consultation_' + consultation.id"
          >
            <div class="mr-3">
              <div class="flex flex-wrap">
                <span
                  class="ml-2 text-indigo-400 font-semibold px-1 rounded-md select-none"
                  >{{ consultation.subject_name }}</span
                >
              </div>
              <p class="text-sm pl-5 pt-0.5">
                {{ consultation.theme }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import TheConsultation from "@/components/TheConsultation";

export default {
  name: "Consultations",
  data: function() {
    return {
      consultation_selected: null,
    };
  },
  components: {
    TheConsultation,
  },
  computed: {
    ...mapState({
      consultations: (state) => state.consultations.user_consultations,
      consultation: (state) => state.consultations.consultation,
      user: (state) => state.users.user,
    }),
  },
  created() {
    if (
      "id" in this.user &&
      this.user.nickname == this.$route.params.nickname
    ) {
      this.getUserConsultations();
    } else {
      this.getUserByNickname(this.$route.params.nickname).then(() => {
        this.getUserConsultations();
      });
    }
  },
  methods: {
    ...mapMutations(["clearConsultation"]),
    ...mapActions([
      "getUserConsultations",
      "getConsultation",
      "getUserByNickname",
    ]),
    viewConsultation(consultation) {
      this.getConsultation(consultation.id);
      this.toggleConsultationSelected(consultation.id);
    },
    toggleConsultationSelected(id) {
      let div = document.getElementById("consultation_" + id);
      div.classList.add("bg-gray-800");

      if (
        this.consultation_selected != null &&
        this.consultation_selected != id
      ) {
        let selected_div = document.getElementById(
          "consultation_" + this.consultation_selected
        );
        selected_div.classList.remove("bg-gray-800");
      }

      this.consultation_selected = id;
    },
  },
};
</script>

<style></style>
