<script setup lang="ts">
const container = ref()
onMounted(() => {
  const { init } = useWorldPosition(container)
  init()
})
</script>

<template>
  <div class="container" ref="container"></div>
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