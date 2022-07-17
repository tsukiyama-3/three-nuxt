<script setup lang="ts">
const container = ref()
onMounted(() => {
  const { init } = useCanvas(container)
  init()
})
</script>

<template>
  <div>
    <div ref="container" class="container"></div>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>