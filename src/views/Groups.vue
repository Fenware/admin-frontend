<template>
  <div class="text-white w-full ">
    <h2 class="text-center text-3xl mt-1 font-semibold">
      Grupos
    </h2>

    <ListGroup v-show="mode == 'list'" :groups="groups" @changeMode="changeMode" @deleteGroup="deleteGroup"/>
    <CreateGroup v-if="mode == 'create'" :orientations="orientations" @changeMode="changeMode" @addGroup="addGroup"/>


    <!-- <div class="flex justify-between mt-10">
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
    </div>

    <CreateGroupContainer class="mt-2" v-if="create_group_mode" :orientations="orientations"/>
    <ModifyGroupContainer v-if="modify_group_mode" />
    <div
      class="flex overflow-auto h-2/3 mx-auto p-1 flex-wrap md:max-w-2xl lg:max-w-3xl mt-5 bg-white bg-opacity-10  shadow-2xl | rounded-lg"
    >
      <GroupsContainer />
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
/* import GroupsContainer from "@/components/GroupsContainer";
import CreateGroupContainer from "@/components/CreateGroupContainer";
import ModifyGroupContainer from "@/components/ModifyGroupContainer"; */
import ListGroup from "@/components/groups/ListGroup";
import CreateGroup from "@/components/groups/CreateGroup";
/* import EditGroup from "@/components/groups/EditGroup"; */

export default {
  name: "Orientations",
  data: function() {
    return {
      groups_filter: "",
      groups: [],
      mode: "list"
    };
  },
  components: {
    ListGroup,
    CreateGroup,
    /* EditGroup */
/*     GroupsContainer,
    CreateGroupContainer,
    ModifyGroupContainer, */
  },
  created() {
    this.getGroups();
  },
  computed: {
    ...mapState([
      "API_URL",
      "headers"
    ]),
  },
  methods: {
    ...mapMutations([
      "toogleModifyGroupMode",
      "toogleCreateGroupMode",
      "setGroups",
    ]),
    changeMode(mode, orientation) {
      this.mode = mode;
      if(orientation){
        this.orientation = orientation;
      }
    },
    async getGroups() {
      await axios({
        method: "get",
        url: this.API_URL + "/group",
        headers: this.headers,
      })
        .then((res) => {
          if (Array.isArray(res.data)) {
            console.log(res.data);
            res.data.forEach(group => {
              group.full_name = (group.year == "1" || group.year == "3" ? group.year + "ero" : group.year + "do") + ` ${group.name}`;
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
    addGroup(group){
      this.groups.push(group);
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
              if(parseInt(group.id) == parseInt(id)){
                this.groups.splice(index, 1);
              }
            });

            // Lanzando alerta
            this.$swal({
              icon: "info",
              title: `El grupo ${group_year}${group_name} fue eliminado correctamente!`,
            });
          }else{
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
