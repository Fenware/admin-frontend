<template>
  <div class="page">
    <Navbar/>
    <Main/>
    <Sidebar/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components:{
    Navbar,
    Main,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.page{
  width: 90vw;
  height: 90vh;
  display: grid;
  justify-content: center;
  grid-template-columns: 6% 69% 20%;
  gap : 2%;
  /* & > *{
    background: rgba( 255, 255, 255, 0.10 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 1rem;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  } */
}
</style>