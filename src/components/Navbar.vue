<template>
  <nav class='navbar'>
    <ul class="navbar-nav">
      
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