<script setup lang="ts">
import { Ref } from 'vue'

const container: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const { init } = useShaderDot()
  init(container)
})

</script>

<template>
  <div class="editer" ref="container"></div>
</template>

<style scoped>
.editer {
  border: 1px solid #000;
  width: 512px;
  height: 512px;
  margin: 5rem auto 0;
}
</style>