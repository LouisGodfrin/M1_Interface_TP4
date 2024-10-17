<template>
  <img id = "tree" alt="Tree Logo" src="./assets/LogoApp.webp">
  <BaseLayout>
    <template #main>
      <router-view/>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout.vue';


export default 
{
  name: 'App',
  components:
  {
    BaseLayout,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
#tree
{
  height: 200px;
  width: 200px;
}

</style>
