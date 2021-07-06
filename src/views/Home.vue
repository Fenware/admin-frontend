<template>
  <div class="w-full">
    <h1 class="text-white text-center text-3xl pt-1">Administrador Chathink</h1>

    <UsersPending/>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersPending from '@/components/UsersPending';

export default {
  name: 'Home',
  components:{
    UsersPending
  }
}
</script>
