<script setup>

import baseHeader from '../components/baseHeader.vue';
import baseFooter from '../components/baseFooter.vue';
</script>

<template>
  <header>
    <slot name="header"><baseHeader></baseHeader></slot>
  </header>
  <main>
    <slot name="main"></slot>
  </main>
  <footer>
    <slot name="footer"><baseFooter></baseFooter></slot>
  </footer>
</template>

<style scoped>

</style>