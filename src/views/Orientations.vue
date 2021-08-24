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

    <EditOrientation
      v-if="mode == 'edit'"
      :orientation="orientation"
      @changeMode="changeMode"
      @modifyOrientation="modifyOrientation"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapState, /* mapMutations,  */mapActions } from "vuex";
import ListOrientation from "@/components/orientations/ListOrientation";
import CreateOrientation from "@/components/orientations/CreateOrientation";
import EditOrientation from "@/components/orientations/EditOrientation";

export default {
  name: "Orientations",
  data: function() {
    return {
      mode: "list",
    };
  },
  created() {
    this.getOrientations();
  },
  components: {
    ListOrientation,
    CreateOrientation,
    EditOrientation,
  },
  computed: {
    ...mapState({
      orientations: state => state.orientations.orientations,
      orientation: state => state.orientations.orientation,
    }),
  },
  methods: {
    /* ...mapMutations([]), */
    ...mapActions(['getOrientations']),
    changeMode(mode, orientation) {
      this.mode = mode;
      if (orientation) {
        this.orientation = orientation;
      }
    },
    modifyOrientation(modified_orientation) {
      this.orientations.forEach((orientation) => {
        if (orientation.id == modified_orientation.id) {
          orientation.name = modified_orientation.name;
          orientation.year = modified_orientation.year;
        }
      });
      this.$swal({
        icon: "success",
        title: `La orientación ${modified_orientation.name} fue modificada correctamente!`,
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
              if (parseInt(orientation.id) == parseInt(id)) {
                this.orientations.splice(index, 1);
              }
            });

            // Lanzando alerta
            this.$swal({
              icon: "info",
              title: `La orientación ${orientation_name} fue eliminada correctamente!`,
            });
          } else {
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
