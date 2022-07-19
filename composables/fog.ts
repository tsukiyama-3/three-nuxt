import { AmbientLight, BoxBufferGeometry, DirectionalLight, Fog, Group, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useFog = (container: Ref<HTMLElement>) => {
  const { clientWidth, clientHeight } = container.value
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(clientWidth / clientHeight)
    container.value.appendChild(renderer.domElement)
    // シーン作成
    const scene = new Scene()
    // フォグを設定
    scene.fog = new Fog(0x000000, 50, 2000)
    // カメラ作成
    const camera = new PerspectiveCamera(45, clientWidth / clientHeight)
    camera.position.set(0, 0, +1000)
    // グループ作成
    const group = new Group()
    scene.add(group)
    const geometry = new BoxBufferGeometry(50, 50, 50)
    const material = new MeshStandardMaterial()
    for (let i = 0; i < 1000; i++) {
      const mesh = new Mesh(geometry, material)
      mesh.position.x = (Math.random() - .5) * 2000
      mesh.position.y = (Math.random() - .5) * 2000
      mesh.position.z = (Math.random() - .5) * 2000
      mesh.rotation.x = Math.random() * 2 * Math.PI
      mesh.rotation.y = Math.random() * 2 * Math.PI
      mesh.rotation.z = Math.random() * 2 * Math.PI
      // グループに格納する
      group.add(mesh)
    }
    scene.add(new DirectionalLight(0xff0000, 2))
    scene.add(new AmbientLight(0x00ffff))
    const tick = () => {
      group.rotateY(.01)
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}