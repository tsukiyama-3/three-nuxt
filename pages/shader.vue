<script setup lang="ts">
const container = ref()

const { mouseMoved, mousePressed, mouseReleased } = useMouseEvent(container)

onMounted(() => {
  const { init } = useShader(container)
  init()
})
</script>

<template>
  <div class="container" ref="container" @mousemove="mouseMoved" @mousedown="mousePressed" @mouseup="mouseReleased">
    <!-- <NuxtLink to="/" class="link">top</NuxtLink> -->
  </div>
</template>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.link {
  position: absolute;
  top: 0;
  left: 0;
}
</style>