<template>
  <div class="flex justify-evenly mx-2 w-full items-center">
    <input
      v-model="group_data.name"
      id="group_name"
      class=" w-72 my-2 p-2 | text-white rounded-lg shadow-lg transition-all ease-in-out hover:shadow-xl bg-gray-50 bg-opacity-25 hover:bg-opacity-40 focus:bg-opacity-40 outline-none placeholder-white focus:placeholder-transparent focus:ring-4 ring-white ring-opacity-20"
      type="text"
      placeholder="Nombre del grupo"
      required
    />

    <select
      name="orientations"
      class="px-2 py-1.5 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl outline-none"
      v-model="group_data.orientation"
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

    <div>
      <button
        @click="
          group_data.name.trim() != '' && group_data.name.length <= 3
            ? createGroup(group_data)
            : focusNameInput()
        "
        class="ml-4 pr-3 | bg-green-500 bg-opacity-80 backdrop-filter backdrop-blur-xl transition duration-300  hover:bg-opacity-90 shadow-2xl | rounded-2xl select-none cursor-pointer"
      >
        <i
          class="fas fa-plus text-white text-md py-3 px-2 | filter drop-shadow-xl "
        ></i>
        Crear
      </button>

      <button
        @click="toogleCreateGroupMode()"
        class="ml-4 pr-3 | bg-red-500 bg-opacity-80 backdrop-filter backdrop-blur-xl transition duration-300  hover:bg-opacity-90 shadow-2xl | rounded-2xl select-none cursor-pointer"
      >
        <i
          class="fas fa-times text-white text-md py-3 px-2 | filter drop-shadow-xl "
        ></i>
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "CreateGroupContainer",
  data: function() {
    return {
      group_data: {
        name: "",
        orientation: "Seleccionar orientacion",
      },
      text_filter: "",
    };
  },
  computed: {
    ...mapState(["API_URL", "headers", "orientations"]),
  },
  methods: {
    ...mapMutations(["toogleCreateGroupMode", "addGroup"]),
    ...mapActions(["searcher"]),
    focusNameInput() {
      document.getElementById("group_name").focus();
      if (this.group_data.name.length > 3) {
        alert('El nombre del grupo tiene un maximo de 3 caracteres. Ej:"3BE"');
      }
    },
    async createGroup() {
      if (this.group_data.orientation != "Seleccionar orientacion") {
        let data = {
          name: this.group_data.name,
          orientacion: parseInt(this.group_data.orientation),
        };
        await axios({
          method: "post",
          url: this.API_URL + "/group",
          data: data,
          headers: this.headers,
        })
          .then((res) => {
            console.log(res);
            if (!isNaN(parseInt(res.data))) {
              this.getGroupById(res.data);
              this.toogleCreateGroupMode();
            } else {
              console.log("Error: createGroup -> " + res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Tienes que seleccionar una orientacion");
      }
    },
    async getGroupById(id) {
      let data = `id=${id}`;
      await axios({
        method: "get",
        url: this.API_URL + `/group?${data}`,
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            let group = res.data[0];

            let orientation_data = this.orientations.find(
              (orientation) => parseInt(orientation.id) == group.id_orientation
            );
            group.orientation_name = orientation_data.name;

            this.addGroup(group);
          } else {
            console.log("Error: getGroups -> " + res.data);
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
