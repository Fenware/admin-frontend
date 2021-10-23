<template>
  <div class="flex justify-center  mx-auto">
    <div class="text-white rounded-xl | max-w-lg">
      <div class="flex justify-between mb-3 items-center py-4 px-5">
        <div class="flex gap-2 select-none">
          <span
            class="text-sm text-white rounded-lg px-3 py-0.5 | bg-purple-500 backdrop-filter backdrop-blur-xl shadow-2xl"
          >
            {{ consultation.group_name }}
          </span>
          <span
            class="text-sm text-white rounded-lg px-3 py-0.5 | bg-blue-500 backdrop-filter backdrop-blur-xl shadow-2xl"
          >
            {{ consultation.subject_name }}
          </span>
        </div>
        <p class="text-white rounded-lg px-1 py-1">
          {{ consultation.creation_date }}
        </p>
      </div>

      <div class=" items-center mx-20 mb-5">
        <p
          class="text-white text-center font-bold text-xl wrap rounded-lg px-3 py-1 "
        >
          {{ consultation.theme }}
        </p>
      </div>

      <div class="flex items-center mx-20 text-sm">
        <span class="mr-3 font-medium">{{getWord({file:'lang',word:'student',lang})}}: </span>
        <p class=" text-white rounded-lg px-1 py-1">
          {{ consultation.student_name }}
        </p>
      </div>

      <div class="mx-20 mt-2">
        <span class="mr-3 text-sm font-bold">{{getWord({file:'consultation',word:'consultation',lang})}}: </span>
        <p class="text-white  rounded-lg py-1 | outline-none">
          {{ consultation.body }}
        </p>
      </div>

      <div class="mt-5 pb-2">
        <h3 class="pl-3 text-xl">{{getWord({file:'consultation',word:'responses',lang})}}</h3>

        <div class="my-2 mx-8 overflow-y-auto max-h-64">
          <p class="text-center" v-if="consultation.messages.length == 0">
            {{getWord({file:'consultation',word:'no_responses',lang})}}
          </p>
          <div
            class=" flex mb-2"
            v-for="message in consultation.messages"
            :key="message.id"
          >
            <div
              class="bg-gray-700  pr-5 py-0.5 rounded-3xl rounded-tl-sm w-full"
            >
              <span class="pl-2 text-xs font-bold flex justify-between"
                ><span>{{ message.name }} {{ message.surname }}</span>
                <span>{{ message.date }}</span></span
              >
              <p class="pl-8">{{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getWord } from "@/utils/lang";

export default {
  name: "TheConsultation",
  computed: {
    ...mapState({
      consultation: (state) => state.consultations.consultation,
      new_message_mode: (state) => state.consultations.new_message_mode,
      lang: (state) => state.lang,
    }),
  },
  methods: {
    ...mapMutations([
      "setConsultation",
      "removeConsultation",
      "toogleNewMessageMode",
      "setNewMessage",
      "setConsultationStateAnswered",
    ]),
    ...mapActions(["getConsultationMessages", "sendConsultationMessage"]),
    focusMessageInput() {
      document.getElementById("new_message").focus();
    },
    sendMessage() {
      this.setConsultationStateAnswered(this.consultation.id);
      this.setNewMessage(this.new_message);
      this.sendConsultationMessage(parseInt(this.consultation.id));
      this.new_message = "";
    },
    getWord,
  },
};
</script>

<style></style>
