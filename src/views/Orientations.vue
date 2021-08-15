<template>
  <div class="text-white w-full h-full">
    <h2 class="text-center text-3xl pt-1 font-semibold">
      Orientaciones
    </h2>

    <ListOrientation
      v-show="mode == 'list'"
      :orientations="orientations"
      @changeMode="changeMode"
      @deleteOrientation="deleteOrientation"
    />

    <CreateOrientation
      v-if="mode == 'create'"
      @changeMode="changeMode"
      @addOrientation="addOrientation"
    />

    <!-- <div class="flex justify-between mt-10 mx-10">
      <input
        type="text"
        placeholder="Buscar orientacion"
        v-model="orientation_filter"
        class="w-96 mx-2 py-2 px-2 bg-white transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl | rounded-xl  outline-none placeholder-white"
      />
      <button
        @click="toogleCreateOrientationMode()"
        class="ml-4 pl-2 text-sm  bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl transition duration-300 focus:bg-opacity-20 hover:bg-opacity-20 shadow-2xl | rounded-xl"
      >
        Agregar orientacion
        <i
          class="fas fa-plus text-white text-md py-3 px-3 | filter drop-shadow-xl transition-transform duration-300 transform hover:scale-110"
        ></i>
      </button>
    </div>

    <div
      class="flex overflow-auto h-2/3 mx-auto p-1 flex-wrap md:max-w-2xl lg:max-w-3xl mt-10 bg-white bg-opacity-10  shadow-2xl | rounded-lg"
    >
      <OrientationsContainer
        v-if="!create_orientation_mode && !modify_orientation_mode"
      />
      <CreateOrientationContainer v-if="create_orientation_mode" />
      <ModifyOrientationContainer v-if="modify_orientation_mode" />
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import ListOrientation from "@/components/orientations/ListOrientation";
import CreateOrientation from "@/components/orientations/CreateOrientation";

/* import OrientationsContainer from "@/components/OrientationsContainer";
import CreateOrientationContainer from "@/components/CreateOrientationContainer";
import ModifyOrientationContainer from "@/components/ModifyOrientationContainer"; */

export default {
  name: "Orientations",
  data: function() {
    return {
      orientations: [],
      mode: "list",
    };
  },
  created() {
    this.getOrientations();
  },
  components: {
    ListOrientation,
    CreateOrientation,
    /* OrientationsContainer,
    CreateOrientationContainer,
    ModifyOrientationContainer, */
  },
  computed: {
    ...mapState([
      "API_URL",
      "headers",
      "create_orientation_mode",
      "modify_orientation_mode",
    ]),
  },
  methods: {
    ...mapMutations([
      "toogleModifyOrientationMode",
      "toogleCreateOrientationMode",
    ]),
    changeMode(mode) {
      this.mode = mode;
    },
    async getOrientations() {
      await axios({
        method: "get",
        url: this.API_URL + "/orientacion",
        headers: this.headers,
      })
        .then((res) => {
          console.log(res.data);
          if (Array.isArray(res.data)) {
            this.orientations = res.data;
          }
          /* commit("setOrientations", res.data);
          dispatch("syncOrientationSubjects"); */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addOrientation(orientation) {
      this.orientations.push(orientation);
    },
    async deleteOrientation(id, orientation_name) {
      var data = {
        id: parseInt(id),
      };
      console.log(data);
      await axios({
        method: "delete",
        url: this.API_URL + "/orientacion",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          // Si la consulta salio bien
          if (res.data == 1) {
            // Elimino el objeto del array
            this.orientations.forEach((orientation, index) => {
              if(parseInt(orientation.id) == parseInt(id)){
                this.orientations.splice(index, 1);
              }
            });

            // Lanzando alerta
            this.$swal({
              icon: "info",
              title: `La orientación ${orientation_name} fue eliminada correctamente!`,
            });
          }else{
            this.$swal({
              icon: "error",
              title: `La orientación ${orientation_name} no pudo ser eliminada, actualice la pagina e intente nuevamente`,
            });
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
