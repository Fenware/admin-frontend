<template> 
  <div class="page">
    <Navbar/>
    <div></div>
    <div></div>
  </div>

  <router-view/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components:{
    Navbar
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
:root{
  font-size: 62.5%;
  font-family: 'Open Sans', sans-serif;
}

*{
  margin: 0;
  padding: 0;
}
body{
  min-height: 100vh;
  background: linear-gradient(to right top ,#175AD4,#65DF9D);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page{
  width: 90vw;
  height: 90vh;
  display: grid;
  grid-template-columns: 6% 69% 20%;
  gap : 1%;
  & > *{
    background: green;
    border-radius: 1.5rem;
  }
}


</style>
