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
  components:{
    Navbar,
    Main,
    Sidebar
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
  justify-content: center;
  grid-template-columns: 6% 69% 20%;
  gap : 2%;
  & > *{
background: rgba( 255, 255, 255, 0.10 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4.5px );
-webkit-backdrop-filter: blur( 4.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
}


</style>
