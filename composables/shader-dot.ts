import { AmbientLight, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three'
import { Ref } from 'vue'

// Shader Material
const mat = new ShaderMaterial({
  vertexShader:
    `
    void main() {
      gl_Position = vec4( position, 1.0 );
    }
    `,
  fragmentShader:
    `
    uniform float uTime;
    uniform vec2 uResolution;

    void main() {
      vec2 position = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
      position.y -= uTime / 1.5;
      vec4 distColor;
      float background = step(.0, sin(position.x * 12.5) * sin(position.y * 12.5));
      if (background == 1.0) {
        vec4 color = vec4(vec3(1.0), 1.0);
        distColor = color;
      } else {
        vec4 color = vec4(.0, .0, .0, 1.0);
        distColor = color;
      }
      gl_FragColor = distColor;
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
  uResolution: {
    value: new Vector2(512, 512)
  },
  uTime: {
    value: .0
  }
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
    const sec = performance.now() / 1000
    uniform.uTime.value = sec
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