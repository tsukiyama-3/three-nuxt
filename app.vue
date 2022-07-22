<script setup lang="ts">
// const container = ref()
useWindowSize()

</script>

<template>
  <div class="container" ref="container" id="app">
    <NuxtPage />
  </div>
</template>

<style>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>