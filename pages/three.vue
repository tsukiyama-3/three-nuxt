<script setup lang="ts">
import { Ref } from 'vue'
const container: Ref<HTMLElement | null> = ref(null)
const { clientWidth, clientHeight } = useWindowSize()
onMounted(() => {
  const { init } = useThree(container, clientWidth, clientHeight)
  init()
})
</script>

<template>
  <div class="container" ref="container"></div>
</template>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>