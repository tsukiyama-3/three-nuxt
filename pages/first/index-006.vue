<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const { initThree, keydownSpace, keyupSpace } = use006(container)
onMounted(() => {
  initThree()
  window.addEventListener('keydown', keydownSpace)
  window.addEventListener('keyup', keyupSpace)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownSpace)
  window.removeEventListener('keyup', keyupSpace)
})
</script>

<template>
  <div class="scene-container" ref="container"></div>
</template>

<style scoped>
.scene-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
