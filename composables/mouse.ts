import { Ref } from 'vue'

export type Mouse = {
  x: Ref<number>,
  y: Ref<number>,
}

const mouse: Mouse = {
  x: ref(),
  y: ref()
}

export const useMouse = () => {
  const getMousePosition = (e) => {    
    const element = e.currentTarget
    const x = e.clientX - element.offsetLeft
    const y = e.clientY - element.offsetTop
    const w = element.offsetWidth
    const h = element.offsetHeight
    mouse.x.value = (x / w) * 2 - 1
    mouse.y.value = -(y / h) * 2 + 1
  }
  return {
    getMousePosition,
    mouse: readonly(mouse)
  }
}