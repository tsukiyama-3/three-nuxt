import { DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, Scene, TorusGeometry, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useThree = (container: Ref<HTMLElement>, clientWidth, clientHeight) => {
  const init = () => {
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth.value, clientHeight.value)
    renderer.setPixelRatio(clientWidth.value / clientHeight.value)
    container.value.appendChild(renderer.domElement)
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, clientWidth.value / clientHeight.value)
    camera.position.set(0, 0, +1000)
    const geometry = new TorusGeometry(300, 100, 64, 100)
    const material = new MeshStandardMaterial({ color: 0x6699ff, roughness: .0 })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    const directionalLight = new DirectionalLight(0xfffff)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    const pointLight = new PointLight(0xfffff, 2, 1000)
    scene.add(pointLight)
    const pointLightHelper = new PointLightHelper(pointLight, 30)
    scene.add(pointLightHelper)
    const tick = () => {
      mesh.rotation.x += .01
      mesh.rotation.y += .01
      pointLight.position.set(
        500 * Math.sin(Date.now() / 500),
        500 * Math.sin(Date.now() / 1000),
        500 * Math.cos(Date.now() / 500)
      )
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}