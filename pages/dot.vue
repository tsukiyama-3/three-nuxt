<script setup lang="ts">
import { Ref } from 'vue'

const container: Ref<HTMLElement | null> = ref(null)
const { clientWidth, clientHeight } = useWindowSize()
const { getMousePosition, mouse } = useMouse()
const colorCode: Ref<string> = ref('#000000')
const { color } = useColor(colorCode)

const { isClick, clickFlug } = useDraw()

onMounted(() => {
  const { init } = useDot(container, clientWidth, clientHeight, mouse, color)
  init()
})

const drow = (e) => {
  isClick()
  getMousePosition(e)
}

const hoge = (e) => {
  if (clickFlug.value) {
    getMousePosition(e)
  }
}
</script>

<template>
  <div class="container" ref="container" @mousedown="drow" @mousemove="hoge" @mouseup="isClick">
    <input class="input" type="color" v-model="colorCode">
  </div>
</template>