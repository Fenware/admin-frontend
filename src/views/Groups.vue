<template>
  <div class="text-white w-full ">
    <h2 class="text-center text-3xl mt-1 font-semibold">
    {{  getWord({file:'group',word:'groups',lang})  }}
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
import { getWord } from "@/utils/lang";

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
      lang: (state) => state.lang,
    }),
  },
  methods: {
    ...mapActions(["getGroups", "getOrientations"]),
    getWord,
  },
};
</script>

<style></style>
