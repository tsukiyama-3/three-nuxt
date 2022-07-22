import { Ref } from 'vue'

export const useWindowSize = () => {
  const clientWidth: Ref<number> = ref(0)
  const clientHeight: Ref<number> = ref(0)
  const dom = ref()
  onMounted(() => {
    dom.value = document.getElementById('app')
    clientWidth.value = dom.value.clientWidth
    clientHeight.value = dom.value.clientHeight
    window.addEventListener('resize', resizeWindow)
  })
  const resizeWindow = () => {
    clientWidth.value = dom.value.clientWidth
    clientHeight.value = dom.value.clientHeight
  }
  return { clientWidth, clientHeight }
}