import { AmbientLight, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { Ref } from 'vue'

// Shader Material
const mat = new ShaderMaterial({
  vertexShader:
    `
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vec4 mvPosition = viewMatrix * worldPosition;
      gl_Position = projectionMatrix * mvPosition;
    }
    `,
  fragmentShader:
    `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `
})

// シーン
const scene = new Scene()

// カメラ
const camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1)

// ジオメトリ
const geometry = new PlaneGeometry(2, 2, 10, 10)

// ユニフォーム
const uniform = {
  uAspect: {
    value: 1
  },
}

// マテリアル
const material = new ShaderMaterial({
  uniforms: uniform,
  vertexShader: mat.vertexShader,
  fragmentShader: mat.fragmentShader,
})

const mesh = new Mesh(geometry, material)

scene.add(mesh)

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