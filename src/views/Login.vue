<template>
  <div class="flex h-screen justify-center items-center relative">
    <form
      @submit.prevent="login(user)"
      class=" bg-gray-50 p-4 md:p-10 lg:p-10 xl:p-10 rounded-2xl bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-md"
    >
      <h1 class="text-center text-white text-4xl mb-12">
        {{
          getWord({file:"login",word:"login_header",lang})
        }}
      </h1>
      <div class="">
        <input
          class="block w-72 mx-auto my-5 p-2 | text-white rounded-lg shadow-lg transition-all ease-in-out hover:shadow-xl bg-gray-50 bg-opacity-25 hover:bg-opacity-40 focus:bg-opacity-40 outline-none placeholder-white focus:placeholder-transparent focus:ring-4 ring-white ring-opacity-20"
          v-model="user.user"
          type="text"
          :placeholder="getWord({file:'login',word:'user_input',lang})"
          required
        />
        <input
          class="block w-72 mx-auto my-5 p-2 | text-white rounded-lg shadow-lg transition-all ease-in-out hover:shadow-xl bg-gray-50 bg-opacity-25 hover:bg-opacity-40 focus:bg-opacity-40 outline-none placeholder-white focus:placeholder-opacity-0 focus:ring-4 ring-white ring-opacity-20"
          v-model="user.password"
          type="password"
          :placeholder="getWord({file:'login',word:'password',lang})"
          required
        />
      </div>
      <!-- <input
        class="block mx-auto mt-10 py-2 px-10 | text-white rounded-lg shadow-lg transition-all ease-in-out hover:shadow-xl cursor-pointer bg-gray-50 bg-opacity-25 hover:bg-opacity-40 outline-none focus:ring-4 ring-white ring-opacity-20"
        
      /> -->
      <input
        class="block mx-auto px-10 mt-10 font-semibold py-1.5 transition-colors rounded-md border-b-4 hover:border-green-500 border-green-400 bg-green-200 hover:bg-green-300 text-green-900 cursor-pointer"
        type="submit"
        :value="getWord({file:'login',word:'login',lang})"
      />
    </form>
    <ToggleLanguageButton class="absolute bottom-0 right-0 m-2"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getWord } from "@/utils/lang";
import ToggleLanguageButton from '@/components/ToggleLanguageButton.vue';

export default {
  name: "Login",
  data: function() {
    return {
      user: {
        user: "",
        password: "",
        type: "admin",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    getWord
  },
  computed: {
    ...mapState(['lang']),
  },
  created(){
    //console.log(this.lang);
  },
  components: {
    ToggleLanguageButton,
  }

};
</script>

<style></style>
