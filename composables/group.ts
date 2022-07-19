import { AxesHelper, GridHelper, Group, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useGroup = (container: Ref<HTMLElement>) => {
  const { clientWidth, clientHeight } = container.value
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(clientWidth / clientHeight)
    container.value.appendChild(renderer.domElement)
    // シーン作成
    const scene = new Scene()
    // カメラ作成
    const camera = new PerspectiveCamera(45, clientWidth / clientHeight)
    camera.position.set(-100, 150, 500)
    camera.lookAt(new Vector3(0, 0, 0))
    // 地面と作成
    scene.add(new GridHelper(600))
    scene.add(new AxesHelper(300))
    // グループ作成
    const group = new Group()
    scene.add(group)

    for (let i = 0; i < 10; i++) {
      // 直方体を作成
      const material = new MeshNormalMaterial()
      const geometry = new SphereGeometry(30, 30, 30)
      const mesh = new Mesh(geometry, material)
      // 配置座標を計算
      const radian = (i / 10) * Math.PI * 2
      mesh.position.set(
        200 * Math.cos(radian),
        30,
        200 * Math.sin(radian)
      )
      group.add(mesh)
    }
    const tick = () => {
      group.rotation.y += .01
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}