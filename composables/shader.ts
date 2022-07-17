import { Scene, OrthographicCamera, WebGLRenderer, PlaneGeometry, ShaderMaterial, Mesh, Vector2 } from "three"

const _VS = `
varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = vec4( position, 1.0 );
}
`

const _FS = `
varying vec2 vUv;
uniform float uAspect;
uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;

void main() {
  vec2 uv = vec2( vUv.x * uAspect, vUv.y );
  vec2 center = vec2( uMouse.x * uAspect, uMouse.y );
  float radius = .05 + sin( uTime * 2.0 ) * .025;
  float lightness = uRadius / length( uv - center );
  vec4 color = vec4( vec3( lightness ), 1.0 );
  color *= vec4( .2, 1.0, .5, 1.0 );

  gl_FragColor = color;
}
`

// mouse
const mouse = new Vector2(.5, .5)
const targetRadius = ref(.005)

const scene = new Scene()
export const useShader = (container: any) => {
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1)
  const renderer = new WebGLRenderer()
  const { clientWidth, clientHeight } = container.value
  const init = () => {
    if (container.value instanceof HTMLElement) {
      // renderer
      renderer.setSize(clientWidth, clientHeight)
      renderer.setPixelRatio(clientWidth / clientHeight)
      container.value.appendChild(renderer.domElement)
      const geometry = new PlaneGeometry(2, 2, 10, 10)

      const uniforms = {
        uAspect: {
          value: clientWidth / clientHeight
        },
        uTime: {
          value: .0
        },
        uMouse: {
          value: new Vector2(.5, .5)
        },
        uRadius: {
          value: targetRadius.value
        }
      }

      const material = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: _VS,
        fragmentShader: _FS,
        wireframe: false
      })

      const mesh = new Mesh(geometry, material)

      scene.add(mesh)

      const render = () => {
        requestAnimationFrame(() => { render() })
        const sec = performance.now() / 1000
        uniforms.uTime.value = sec
        uniforms.uMouse.value.lerp(mouse, .2)
        uniforms.uRadius.value += (targetRadius.value - uniforms.uRadius.value) * 0.2
        renderer.render(scene, camera)
      }

      render()

      // animate()
    }
  }

  const animate = () => {
    requestAnimationFrame(() => { animate() })
    const sec = performance.now() / 1000
    renderer.render(scene, camera)
  }

  return { init }
}

// ここ冗長的かも
export const useMouseEvent = (container) => {
  const clientWidth = ref()
  const clientHeight = ref()
  onMounted(() => {
    clientWidth.value = container.value.clientWidth
    clientHeight.value = container.value.clientHeight
  })
  const mouseMoved = (e) => {
    mouse.x = e.clientX / clientWidth.value
    mouse.y = 1.0 - (e.clientY / clientHeight.value)
  }
  const mousePressed = (e) => {
    mouseMoved(e)
    targetRadius.value = .1
  }
  const mouseReleased = (e) => {
    mouseMoved(e)
    targetRadius.value = .005
  }
  return { mouseMoved, mousePressed, mouseReleased }
}