<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
useThree(container)
</script>

<template>
  <div ref="container" class="scene-container"></div>
</template>
