<template>
  <div class="flex justify-evenly mx-2 w-full items-center">
    <input
      v-model="group.name"
      class=" w-72 my-2 p-2 | text-white rounded-lg shadow-lg transition-all ease-in-out hover:shadow-xl bg-gray-50 bg-opacity-25 hover:bg-opacity-40 focus:bg-opacity-40 outline-none placeholder-white focus:placeholder-transparent focus:ring-4 ring-white ring-opacity-20"
      type="text"
      placeholder="Nombre del grupo"
      required
    />

    <select
      name="orientations"
      class="px-2 py-1.5 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl outline-none"
      v-model="group.id_orientation"
    >
      <option selected disabled hidden>Seleccionar orientacion</option>
      <option
        class="text-black cursor-pointer"
        v-for="orientation in orientations"
        :key="orientation.id"
        :value="orientation.id"
        >{{ orientation.name }}</option
      >
    </select>

    <div
      @click="modifyGroup()"
      class="ml-4 pr-5 | bg-yellow-400 bg-opacity-40 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-50 shadow-2xl | rounded-2xl transition-transform transform hover:scale-105 select-none cursor-pointer"
    >
      <i
        class="fas fa-pen text-white text-md py-3 px-3 | filter drop-shadow-xl "
      ></i>
      Modificar
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "ModifyGroupContainer",
  computed: {
    ...mapState(["API_URL", "headers", "orientations", "group"]),
  },
  methods: {
    ...mapMutations(["toogleModifyGroupMode",'editGroup']),
    ...mapActions(["searcher"]),
    async modifyGroup() {
      let data = {
        id: parseInt(this.group.id),
        name: this.group.name,
        orientacion: parseInt(this.group.id_orientation),
      };
      await axios({
        method: "put",
        url: this.API_URL + "/group",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          console.log(res);
          if (!isNaN(parseInt(res.data))) {
            this.editGroup(data);
            this.toogleModifyGroupMode();
          } else {
            console.log("Error: modifyGroup -> " + res.data);
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
