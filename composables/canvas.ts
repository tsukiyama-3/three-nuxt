import {
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  SphereGeometry,
  MeshLambertMaterial,
  PointLight
} from "three"

export const useCanvas = (container: any) => {
  const scene = new Scene()
  const camera = new PerspectiveCamera()
  const renderer = new WebGLRenderer()
  const light = new PointLight();
  const init = () => {
    if (container.value instanceof HTMLElement) {
      const { clientWidth, clientHeight } = container.value
      scene.add(new GridHelper())
      // light
      light.color.setHex(0xffffff)
      light.position.set(10, 10, 0)
      scene.add(light)
      // sphere
      const sphere = createSphere()
      scene.add(sphere)
      // camera
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      camera.position.set(10, 10, 0)
      camera.lookAt(0, 0, 0)
      // renderer
      renderer.setSize(clientWidth, clientHeight)
      renderer.setPixelRatio(clientWidth / clientHeight)
      container.value.appendChild(renderer.domElement)
      animate()
    }
  }
  const createSphere = (): Mesh => {
    const geometry = new SphereGeometry(3)
    const material = new MeshLambertMaterial({ color: 0xffffff })
    return new Mesh(geometry, material)
  }
  const animate = () => {
    const  phi = ref(0)
    const frame = () => {
      // render
      renderer.render(scene, camera)
      // camera
      phi.value += .002 * Math.PI
      camera.position.set(10 * Math.cos(phi.value), 10, 10 * Math.sin(phi.value))
      light.position.set(10 * Math.cos(phi.value), 10, 10 * Math.sin(phi.value))
      camera.lookAt(0, 0, 0)
      // update
      requestAnimationFrame(frame)
    }
    frame()
  }
  return {
    init
  }
}