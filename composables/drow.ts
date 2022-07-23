import { Ref } from 'vue'

const clickFlug: Ref<boolean> = ref(false)

export const useDraw = () => {
  const isClick = () => {
    clickFlug.value = !clickFlug.value
  }
  return {
    isClick,
    clickFlug: readonly(clickFlug)
  }
}