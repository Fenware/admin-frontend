<template>
  <nav
    class="w-full sm:w-1/6 md:w-16 lg:w-16 sm:h-full rounded-2xl | bg-gray-700 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl"
  >
    <ul class="p-2 sm:py-4 sm:px-0 h-full text-center flex flex-row sm:flex-col justify-between">
      <div class="flex gap-2 sm:gap-0 sm:block">
        <li>
          <router-link :to="{ name: 'Home' }"  v-slot="{ isActive }">
            <span :class="[isActive && 'active']" class="nav-icon mt-1 material-icons">
              home
            </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Subjects' }" v-slot="{ isActive }">
            <span :class="[isActive && 'active']" class="nav-icon material-icons">
              library_books
            </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Orientations' }" v-slot="{ isActive }">
            <span :class="[isActive && 'active']" class="nav-icon material-icons">
              dashboard
            </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Groups' }" v-slot="{ isActive }">
            <span :class="[isActive && 'active']" class="nav-icon material-icons">
              groups
            </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Users' }" v-slot="{ isActive }">
            <span :class="[isActive && 'active']" class="nav-icon material-icons">
              assignment_ind
            </span>
          </router-link>
        </li>
      </div>
      <div class="flex gap-2 sm:gap-0 sm:block">
        <!-- <li>
          <router-link :to="{ name: 'Home' }">
            <i :class="'fa-cog ' + icon_class"></i>
          </router-link>
        </li> -->
        <li class="cursor-pointer">
          <span @click="logout()" class="nav-icon material-icons">
            logout
          </span>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Navbar",
  methods:{
    ...mapActions(['logout'])
  }
};
</script>

<style lang="css" scoped>
.nav-icon {
  @apply mt-0 px-2 py-1 sm:mt-2 text-3xl text-white transition-colors ease-in-out hover:bg-gray-600 rounded-xl;
}
.active{
  @apply bg-gray-600 transition-colors shadow-lg;
}
</style>
