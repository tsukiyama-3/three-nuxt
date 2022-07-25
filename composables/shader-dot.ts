import { AmbientLight, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import { Ref } from 'vue'

// シーン
const scene = new Scene()

// カメラ
const camera = new OrthographicCamera(0, 0, 0, 0, 8, 512)

// ライト
const light = new AmbientLight(0xffffff, 1.0)
scene.add(light)

export const useShaderDot = () => {
  // レンダラー
  const renderer = ref()

  const tick = () => {
    renderer.value.render(scene, camera)
    requestAnimationFrame(tick)
  }

  const init = (container: Ref<HTMLElement>) => {
    watchEffect(() => {
      renderer.value = new WebGLRenderer()
      renderer.value.setSize(512, 512)
      renderer.value.setPixelRatio(512 / 512)
    })
    container.value.appendChild(renderer.value.domElement)
    tick()
  }
  return { init }
}