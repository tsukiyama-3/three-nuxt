<script setup lang="ts">
import { Ref } from 'vue'
const container: Ref<HTMLElement | null> = ref(null)
const { clientWidth, clientHeight } = useWindowSize()
const { getMousePosition, mouse } = useMouse()
const colorCode: Ref<string> = ref('')
const { color } = useColor(colorCode)
onMounted(() => {
  const { init } = useClick(container, clientWidth, clientHeight, mouse, color)
  init()
})
</script>

<template>
  <div class="container" ref="container" @click="getMousePosition">
    <input type="color" class="input" v-model="colorCode">
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

.input {
  position: absolute;
  top: 0;
  left: 0;
}
</style>