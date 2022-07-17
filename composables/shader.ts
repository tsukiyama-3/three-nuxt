import { Scene, OrthographicCamera, WebGLRenderer, PlaneGeometry, ShaderMaterial, Mesh } from "three"

const _VS = `
void main() {
  vec3 pos = position;

  // pos.y = ( pos.y * 0.5 ) + sin( pos.x * 3.0 ) * 0.5;

  gl_Position = vec4( pos, 1.0 );
}
`

const _FS = `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

const scene = new Scene()
export const useShader = (container: any) => {
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1)
  const renderer = new WebGLRenderer()
  const init = () => {
    if (container.value instanceof HTMLElement) {
      const { clientWidth, clientHeight } = container.value
      // renderer
      renderer.setSize(clientWidth, clientHeight)
      renderer.setPixelRatio(clientWidth / clientHeight)
      container.value.appendChild(renderer.domElement)
      const geometry = new PlaneGeometry(2, 2, 10, 10)

      const material = new ShaderMaterial({
        vertexShader: _VS,
        fragmentShader: _FS,
        wireframe: true
      })

      const mesh = new Mesh(geometry, material)

      scene.add(mesh)
      console.log(scene)
      animate()
    }
  }

  const animate = () => {
    requestAnimationFrame(() => { animate() })
    const sec = performance.now() / 1000
    renderer.render(scene, camera)
  }

  return { init }
}