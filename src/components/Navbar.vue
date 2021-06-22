<template>
  <nav class='navbar'>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a href="#" class="nav-link">
          <img src="@/assets/icons/home.svg" alt="" class="nav-icon">
          <span class="link-text">Home</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <img src="@/assets/icons/home.svg" alt="" class="nav-icon">
          <span class="link-text">Agregar Papas</span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="#" class="nav-link">
          <img src="@/assets/icons/home.svg" alt="" class="nav-icon">
          <span class="link-text">Agregar Usuarios</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <img src="@/assets/icons/home.svg" alt="" class="nav-icon">
          <span class="link-text">Log Out</span>
        </a>
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
  height: 100%;
  z-index: 100;
  
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
}

</style>