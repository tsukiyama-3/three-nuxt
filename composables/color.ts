import { Ref } from 'vue'

const color: Ref<string> = ref()

export const useColor = (colorCode: Ref<string>) => {
  watchEffect(() => {
    color.value = '0x' + colorCode.value.slice(1)
  })
  return {
    color: readonly(color)
  }
}