<script setup lang="ts">
import { Ref } from 'vue'

const container: Ref<HTMLElement | null> = ref(null)
const { getMousePosition, mouse } = useMouse()
const colorCode: Ref<string> = ref('#000000')
const { color } = useColor(colorCode)

const { isClick, clickFlug } = useDraw()

const { moveLeft, moveRight, moveTop, moveBottom } = useDot(mouse, color)

onMounted(() => {
  const { init } = useDot(mouse, color)
  init(container)
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
  <div>
    <div class="editer" ref="container" @mousedown="drow" @mousemove="hoge" @mouseup="isClick" @click="clickFlug = false">
    </div>
    <input type="color" v-model="colorCode">
    <div style="display: flex">
      <div @click="moveLeft">←</div>
      <div @click="moveRight">→</div>
      <div @click="moveTop">↑</div>
      <div @click="moveBottom">↓</div>
    </div>
  </div>
</template>

<style scoped>
.editer {
  border: 1px solid #000;
  width: 512px;
  height: 512px;
}
</style>