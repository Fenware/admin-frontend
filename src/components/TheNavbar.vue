<template>
  <nav
    class="relative w-full sm:w-1/6 md:w-16 lg:w-16 sm:h-full rounded-2xl | bg-gray-700 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl"
  >
    <ul
      class="p-2 sm:py-4 sm:px-0 h-full text-center flex flex-row sm:flex-col justify-between"
    >
      <div class="flex gap-2 sm:gap-0 sm:block">
        <li v-for="item in nav_items" :key="item" >
          <router-link class="relative group" :to="{ name: item.view }" v-slot="{ isActive }">
            <span
              :class="[isActive && 'active']"
              class="nav-icon group mt-1 material-icons"
            >
              {{ item.icon }}
            </span>

            <span class="tooltip group-hover:scale-100">{{ item.tooltip }}</span>
          </router-link>
        </li>
      </div>
      
      <div class="flex gap-2 sm:gap-0 sm:block">
        <div>
          <li class="group relative cursor-pointer">
            <a  @click="a">
              <span class="nav-icon material-icons">
                translate
              </span>
            </a>
          
            <span class="tooltip group-hover:scale-100 ml-3">{{getWord({file:'nav',word:'lang',lang})}}</span>
          </li>
        </div>
        <div>
          <li class="group relative cursor-pointer">
            <a  @click="logout()">
              <span class="nav-icon material-icons">
                logout
              </span>
            </a>
          
            <span class="tooltip group-hover:scale-100 ml-3">{{getWord({file:'nav',word:'close_session',lang})}}</span>
          </li>
        </div>
        
      </div>
      
    </ul>

    
  </nav>
</template>

<script>
import { mapActions,mapState } from "vuex";
import { getWord } from "@/utils/lang";
//import TheModal from "./TheModal";

export default {
  name: "Navbar",
  data() {
    return {
      nav_items: [
        { view: "Home", icon: "home", tooltip: 'Inicio' },
        { view: "Subjects", icon: "library_books", tooltip: "Materias" },
        { view: "Orientations", icon: "dashboard", tooltip: "Orientaciones" },
        { view: "Groups", icon: "groups", tooltip: "Grupos" },
        { view: "Users", icon: "assignment_ind", tooltip: "Usuarios" },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
    getWord,
    setWords(){
      //esta solucion es horrible pero no econtramos otra forma de usar lang en data
      this.nav_items.forEach(element => {
        switch(element.tooltip){
          case 'Inicio':
            if(this.lang == 'en')
              element.tooltip = 'Home';
            break;
          case 'Materias':
            if(this.lang == 'en')
              element.tooltip = 'Subjects';
            break;
          case 'Orientaciones':
            if(this.lang == 'en')
              element.tooltip = 'Orientations';
            break;
          case 'Grupos':
            if(this.lang == 'en')
              element.tooltip = 'Groups';
            break;
          case 'Usuarios':
            if(this.lang == 'en')
              element.tooltip = 'Users';
            break;
        }
      });
    },
  },
  computed: {
    ...mapState(['lang']),
  },
  created(){
    //console.log(this.lang);
    this.setWords();
  },
  components: {
    //TheModal,
  }
};
</script>

<style lang="css" scoped>
.nav-icon {
  @apply mt-0 px-2 py-1 sm:mt-2 text-3xl text-white transition-colors ease-in-out hover:bg-gray-600 rounded-xl;
}
.active {
  @apply bg-gray-600 transition-colors shadow-lg;
}

.tooltip {
  @apply transform absolute mt-3.5 w-auto p-2 m-2 min-w-max left-12 rounded-md shadow-lg text-white bg-gray-900 text-sm font-bold transition-all duration-100 scale-0 origin-left;
}
</style>
