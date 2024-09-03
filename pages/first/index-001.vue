<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const { initThree } = use001(container)
onMounted(() => {
  initThree()
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
