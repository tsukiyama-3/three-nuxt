import {
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  SphereGeometry,
  MeshLambertMaterial,
  PointLight,
  Color
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const scene = new Scene()
export const useCanvas = (container: any ) => {
  const camera = new PerspectiveCamera()
  const renderer = new WebGLRenderer()
  const light = new PointLight()
  const controls = new OrbitControls(camera, renderer.domElement)
  const init = () => {
    if (container.value instanceof HTMLElement) {
      const { clientWidth, clientHeight } = container.value
      // scene.add(new GridHelper(500))
      scene.background = new Color(0xcccccc)
      // light
      light.color.setHex(0xffffff)
      light.position.set(2000, 2000, 1000)
      scene.add(light)
      // sphere
      // const sphere = createSphere()
      // scene.add(sphere)
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
      // camera
      controls.update()
      // render
      renderer.render(scene, camera)
      // update
      requestAnimationFrame(frame)
    }
    frame()
  }
  return { init }
}

export const useLoader = () => {
  const onFileInput = async ({ target }: Event) => {
    if (target instanceof HTMLInputElement && target.files) {
      // input file
      const file = target.files[0]
      // convert DataURL
      const dataURL = URL.createObjectURL(file)
      // load
      const loader = new FBXLoader()
      const group = await loader.loadAsync(dataURL)
      // add scene
      scene.add(group)
    }
  }
  return { onFileInput }
}
