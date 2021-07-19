<template>
  <div class="">
    <div class="flex px-2 justify-between items-center">
      Grupo:
      <span
        class="mx-4 py-1 px-2 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-lg "
        >{{ group.name }}</span
      >
      <span
        class="flex-none py-1 px-5 ml-3 | bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >Código: <span class="font-bold">{{ group.code }}</span></span
      >
    </div>
    <div class="mt-3 ml-2 flex justify-between items-center">
      <div div class="flex overflow-x-auto max-w-lg ">
        <div class="flex">
          <p
            class="px-2 mx-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl shadow-2xl rounded-full select-none"
          >
            Orientación:
            <span class="font-bold"> {{ group.orientation_name }} </span>
          </p>
        </div>
      </div>

      <div class="flex ml-1">
        <button
          @click="modifyGroup()"
          class="py-1 px-5 mr-2 | transition-colors duration-200 bg-blue-700  bg-opacity-50 hover:bg-opacity-70 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >
          Editar
        </button>
        <button
          @click="deleteGroup()"
          class="py-1 px-5 mr-2 | transition-colors duration-200 bg-red-700  bg-opacity-50 hover:bg-opacity-70 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-full"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "GroupCard",
  props: {
    group: Object,
  },
  computed: {
    ...mapState(["API_URL", "headers", "orientations"]),
    ...mapGetters(["orientationSubjctsFiltered"]),
  },
  methods: {
    ...mapMutations(["toogleModifyGroupMode", "setGroup", "removeGroup"]),
    ...mapActions([]),
    modifyGroup() {
      let group_data = {
        id: this.group.id,
        name: this.group.name,
        id_orientation: this.group.id_orientation,
      };
      this.toogleModifyGroupMode();
      this.setGroup(group_data);
    },
    async deleteGroup() {
      let data = {
        id: parseInt(this.group.id),
      };
      await axios({
        method: "delete",
        url: this.API_URL + "/group",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          if (!isNaN(parseInt(res.data))) {
            this.removeGroup(data);
          } else {
            console.log("Error: deleteGroup -> " + res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
