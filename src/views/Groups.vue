<template>
  <div class="text-white w-full ">
    <h2 class="text-center text-3xl mt-1 font-semibold">
      Grupos
    </h2>

    <ListGroup v-show="mode == 'list'" />
    <CreateGroup v-if="mode == 'create'" />
    <EditGroup v-if="mode == 'edit'" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListGroup from "@/components/groups/ListGroup";
import CreateGroup from "@/components/groups/CreateGroup";
import EditGroup from "@/components/groups/EditGroup";

export default {
  name: "Groups",
  data: function() {
    return {
      groups_filter: "",
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
    ...mapState({
      mode: (state) => state.groups.mode,
    }),
  },
  methods: {
    ...mapActions(["getGroups", "getOrientations"]),
  },
};
</script>

<style></style>
