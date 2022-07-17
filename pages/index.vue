<script setup lang="ts">
const container = ref()
const { onFileInput } = useLoader()
onMounted(() => {
  const { init } = useCanvas(container)
  init()
})
</script>

<template>
  <div>
    <div ref="container" class="container">
      <NuxtLink to="/shader" class="link">shader</NuxtLink>
      <div class="input-box">
        <label for="file" class="input-label">
          ファイルを選択してください
        </label>
        <input type="file" id="file" class="hidden" @input="onFileInput" />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer
}

.input-box {
  position: absolute;
  top: 0;
  right: 0;
  background-color: skyblue;
  color: #fff;
  padding: 1.5rem 1.25rem;
}

.link {
  position: absolute;
  top: 0;
  left: 0;
}
</style>