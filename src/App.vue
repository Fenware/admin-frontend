<template> 
  <div class="">

   <router-view/>

  </div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions(['syncToken'])
  },
  created(){
    this.syncToken()
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
  background: linear-gradient(to right top ,#175AD4,#65DF9D);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-glass{
  background: rgba( 255, 255, 255, 0.10 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
</style>
