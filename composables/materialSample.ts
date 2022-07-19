import { Ref } from 'vue'

import { DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, Scene, TorusGeometry, WebGLRenderer } from 'three'

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
      const material = new MeshStandardMaterial({ color: 0x6699FF, roughness: 0.0 })
      // create mesh
      const mesh = new Mesh(geometry, material)
      // add scene
      scene.add(mesh)

      // 平行光源
      const directionalLight = new DirectionalLight(0xfffff)
      directionalLight.position.set(1, 1, 1)
      scene.add(directionalLight)

      // ポイント光源
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
  }
  return { init }
}