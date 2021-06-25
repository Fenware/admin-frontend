<template>
  <nav class="navbar bg-glass">
    <ul class="navbar-nav">
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/home.svg" />
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/add-user.svg" />
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/add-group.svg" />
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/add-materia.svg" />
      </li>
      <li @click="logout()" class="nav-item">
        <img class="nav-icon" src="@/assets/icons/logout.svg" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Navbar",
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style lang="scss">
.navbar {
  /* justify-content: center; */

  /* align-items: center; */
  padding: 4rem 0 1rem;
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-item {
  list-style: none;
  margin: 1rem auto;

  border-radius: 1.5rem;
  padding: 1.2rem;

  transition: all 0.08s ease-in-out;

  .nav-icon {
    max-width: 4rem;
    transition: all 0.08s ease-in-out;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-top: auto;
    margin-bottom: 0;
    padding-bottom: 0.8rem;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.06);
    -webkit-backdrop-filter: blur(2.5rem);
    backdrop-filter: blur(2.5rem);
  }
}
/* .navbar{
  height: 100%;  
}

.navbar-nav{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-icon{
  max-width: 5rem;
}

.nav-item{
  width: 100%;
}

.nav-item:last-child{
  margin-top: auto;
} */
</style>
