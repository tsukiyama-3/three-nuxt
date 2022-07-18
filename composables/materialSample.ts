import { Ref } from 'vue'

import { Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TorusGeometry, WebGLRenderer } from 'three'

export const useMaterial = (container: Ref<HTMLElement>) => {
  const { clientWidth, clientHeight } = container.value
  const init = () => {
    if (container.value instanceof HTMLElement) {
      // renderer
      const renderer = new WebGLRenderer()
      renderer.setSize(clientWidth, clientHeight)
      renderer.setPixelRatio(clientWidth / clientHeight)
      container.value.appendChild(renderer.domElement)
      // scene
      const scene = new Scene()
      // camera
      const camera = new PerspectiveCamera(45, clientWidth / clientHeight)
      camera.position.set(0, 0, +1000)
      // geometry
      const geometry = new TorusGeometry(300, 100, 64, 100)
      // material
      const material = new MeshBasicMaterial({ color: 0x6699ff })
      // create mesh
      const mesh = new Mesh(geometry, material)
      // add scene
      scene.add(mesh)

      const tick = () => {
        mesh.rotation.x += .01
        mesh.rotation.y += .01
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
      }
      tick()
    }
  }
  return { init }
}