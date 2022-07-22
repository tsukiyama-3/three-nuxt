import { Ref } from 'vue'

const color: Ref<number> = ref()

export const useColor = (colorCode: Ref<string>) => {
  watchEffect(() => {
    color.value = colorCode.value.slice(1) as unknown as number
  })
  return {
    color
  }
}