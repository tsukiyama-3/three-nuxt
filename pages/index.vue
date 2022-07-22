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
      <div class="links">
        <NuxtLink to="/shader">shader</NuxtLink>
        <NuxtLink to="/materialSample">material</NuxtLink>
        <NuxtLink to="/light">light</NuxtLink>
        <NuxtLink to="/shadow">shadow</NuxtLink>
        <NuxtLink to="/camera">camera</NuxtLink>
        <NuxtLink to="/fog">fog</NuxtLink>
        <NuxtLink to="/group">group</NuxtLink>
        <NuxtLink to="/world-position">world-position</NuxtLink>
        <NuxtLink to="/three">three</NuxtLink>
      </div>
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
}

.input-box {
  position: absolute;
  top: 0;
  right: 0;
  background-color: skyblue;
  color: #fff;
  padding: 1.5rem 1.25rem;
}

.links {
  position: absolute;
  top: 0;
  left: 0;
}
</style>