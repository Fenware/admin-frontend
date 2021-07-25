<template>
  <div class="text-white w-full h-full">
    <h2 class="text-center text-3xl mt-1">
      Grupos
    </h2>

    <div class="flex justify-between mt-10">
      <input
        type="text"
        placeholder="Buscar grupo"
        v-model="orientation_filter"
        class="w-96 mx-2 py-2 px-2 | bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-2xl  outline-none placeholder-white"
      />
      <button
        v-show="!create_group_mode && !modify_group_mode"
        @click="toogleCreateGroupMode()"
        class="ml-4 pr-2 | bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 shadow-2xl | rounded-2xl"
      >
        <i
          class="fas fa-plus text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
        Agregar grupo
      </button>

      <button
        v-show="create_group_mode"
        @click="toogleCreateGroupMode()"
        class="ml-4 pr-2 | bg-red-400 bg-opacity-50 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-60 shadow-2xl | rounded-2xl"
      >
        <i
          class="fas fa-times text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
        Cancelar
      </button>

      <button
        v-show="modify_group_mode"
        @click="toogleModifyGroupMode()"
        class="ml-4 pr-2 | bg-red-400 bg-opacity-50 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-60 shadow-2xl | rounded-2xl"
      >
        <i
          class="fas fa-times text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
        Cancelar
      </button>
    </div>

    <CreateGroupContainer class="mt-2" v-if="create_group_mode" />
    <ModifyGroupContainer v-if="modify_group_mode" />
    <div
      class="flex overflow-auto h-2/3 mx-auto p-1 flex-wrap md:max-w-2xl lg:max-w-3xl mt-10 bg-white bg-opacity-10  shadow-2xl | rounded-lg"
    >
      <GroupsContainer />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import GroupsContainer from "@/components/GroupsContainer";
import CreateGroupContainer from "@/components/CreateGroupContainer";
import ModifyGroupContainer from "@/components/ModifyGroupContainer";

export default {
  name: "Orientations",
  data: function() {
    return {
      orientation_filter: "",
    };
  },
  components: {
    GroupsContainer,
    CreateGroupContainer,
    ModifyGroupContainer,
  },
  computed: {
    ...mapState([
      "API_URL",
      "headers",
      "create_group_mode",
      "modify_group_mode",
      "orientations",
    ]),
  },
  methods: {
    ...mapMutations([
      "toogleModifyGroupMode",
      "toogleCreateGroupMode",
      "setGroups",
    ]),
    ...mapActions(["checkSession", "syncOrientations"]),
    async getGroups() {
      await axios({
        method: "get",
        url: this.API_URL + "/group",
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            let groups_array = [];
            res.data.forEach((group) => {
              let orientation_data = this.orientations.find(
                (orientation) =>
                  parseInt(orientation.id) == group.id_orientation
              );
              group.orientation_name = orientation_data.name; 
              groups_array.push(group);
            });
            this.setGroups(groups_array);
          } else {
            console.log("Error: getGroups -> " + res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.checkSession();
    this.syncOrientations();
    this.getGroups();
  },
};
</script>

<style></style>
