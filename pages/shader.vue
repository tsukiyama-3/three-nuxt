<script setup lang="ts">
const container = ref()
onMounted(() => {
  const { init } = useShader(container)
  init()
})
</script>

<template>
  <div class="container" ref="container">
    <NuxtLink to="/" class="link">top</NuxtLink>
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