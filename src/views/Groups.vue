<template>
  <div class="text-white w-full ">
    <h2 class="text-center text-3xl mt-1 font-semibold">
      Grupos
    </h2>

    <ListGroup
      v-show="mode == 'list'"
      :groups="groups"
      @changeMode="changeMode"
      @deleteGroup="deleteGroup"
    />
    <CreateGroup
      v-if="mode == 'create'"
      :orientations="orientations"
      @changeMode="changeMode"
      @addGroup="addGroup"
    />
    <EditGroup
      v-if="mode == 'edit'"
      :orientations="orientations"
      :group="group"
      @changeMode="changeMode"
      @modifyGroup="modifyGroup"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ListGroup from "@/components/groups/ListGroup";
import CreateGroup from "@/components/groups/CreateGroup";
import EditGroup from "@/components/groups/EditGroup";

export default {
  name: "Groups",
  data: function() {
    return {
      orientations: [],
      groups_filter: "",
      groups: [],
      group: {},
      mode: "list",
    };
  },
  components: {
    ListGroup,
    CreateGroup,
    EditGroup,
  },
  created() {
    this.getGroups();
    this.getOrientations();
  },
  computed: {
    ...mapState(["API_URL", "headers"]),
  },
  methods: {
    changeMode(mode, group) {
      this.mode = mode;
      if (group) {
        this.group = group;
      }
    },
    async getOrientations() {
      await axios({
        method: "get",
        url: this.API_URL + "/orientacion",
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            this.orientations = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getGroups() {
      await axios({
        method: "get",
        url: this.API_URL + "/group",
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            res.data.forEach((group) => {
              group.full_name =
                (group.year == "1" || group.year == "3"
                  ? group.year + "ero"
                  : group.year + "do") + ` ${group.name}`;
              this.groups.push(group);
            });
          } else {
            console.log("Error: getGroups -> " + res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addGroup(group) {
      this.groups.push(group);
    },
    modifyGroup(modified_group) {
      this.groups.forEach((group) => {
        if (group.id == modified_group.id) {
          group.id = modified_group.id;
          group.name = modified_group.name;
          group.year = modified_group.orientation.year;
          group.full_name = modified_group.full_name;
          group.id_orientation = modified_group.orientation.id;
          group.orientation_name = modified_group.orientation.name;
        }
      });
    },
    async deleteGroup(id, group_name, group_year) {
      var data = {
        id: parseInt(id),
      };
      await axios({
        method: "delete",
        url: this.API_URL + "/group",
        data: data,
        headers: this.headers,
      })
        .then((res) => {
          // Si la consulta salio bien
          if (res.data == 1) {
            // Elimino el objeto del array
            this.groups.forEach((group, index) => {
              if (parseInt(group.id) == parseInt(id)) {
                this.groups.splice(index, 1);
              }
            });

            // Lanzando alerta
            this.$swal({
              icon: "info",
              title: `El grupo ${group_year}${group_name} fue eliminado correctamente!`,
            });
          } else {
            this.$swal({
              icon: "error",
              title: `El grupo ${group_year}${group_name} no pudo ser eliminado, actualice la página e intente nuevamente`,
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
