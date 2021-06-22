<template>
  <nav class='navbar bg-glass'>
    <ul class="navbar-nav">
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/home.svg">
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/add-user.svg">
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/add-group.svg">
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/add-materia.svg">
      </li>
      <li class="nav-item">
        <img class="nav-icon" src="@/assets/icons/logout.svg">
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style lang="scss">

.navbar{
  
  /* justify-content: center; */
  
  /* align-items: center; */
  padding: 4rem 0;
}

.navbar-nav{
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-item{
  list-style: none;
  margin: 2rem auto;

  border-radius: .8rem;
  padding: .5rem;
  border: .3rem solid transparent;

  transition: all 0.1s ease-in-out;

  .nav-icon{
    max-width: 4rem;
  }
  &:first-child{
    margin-top: 0;
  }
  &:last-child{
    margin-top: auto;
    margin-bottom: 0;
  }
  &:hover{
    cursor: pointer;
    border-color: white;
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