<script setup lang="ts">
import { Ref } from 'vue'

const container: Ref<HTMLElement | null> = ref(null)
const { getMousePosition, mouse } = useMouse()
const colorCode: Ref<string> = ref('#000000')
const { color } = useColor(colorCode)

const { isClick, clickFlug } = useDraw()

onMounted(() => {
  const { init } = useDot(container, mouse, color)
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
  <div>
    <div class="editer" ref="container" @mousedown="drow" @mousemove="hoge" @mouseup="isClick">
    </div>
    <input type="color" v-model="colorCode">
  </div>
</template>

<style scoped>
.editer {
  border: 1px solid #000;
  width: 512px;
  height: 512px;
}
</style>