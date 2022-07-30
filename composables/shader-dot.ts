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

    bool circle(vec2 position, float radius) {
      if (length(position) <= radius) {
        return true;
      } else {
        return false;
      }
    }

    void main() {
      vec2 position = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
      position.x -= uTime /1.5;
      position.y += uTime /1.5;
      position.x = sin(position.x * 10.0);
      position.y = sin(position.y * 10.0);
      vec4 distColor;
      vec4 backgroundColor = vec4(1.0, .0, .25, 1.0);
      float radius = .5;
      vec4 circleColor = vec4(.0, .0, .5, 1.0);
      if (circle(position, radius)) {
        distColor = circleColor;
      } else {
        distColor = backgroundColor;
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