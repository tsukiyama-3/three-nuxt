import { BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SpotLight, TorusKnotGeometry, Vector3, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useShadow = (container: Ref<HTMLElement>) => {
  const { clientWidth, clientHeight } = container.value
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(clientWidth / clientHeight)
    container.value.appendChild(renderer.domElement)
    // レンダラー：シャドウを有効にする
    renderer.shadowMap.enabled = true
    // シーン作成
    const scene = new Scene()
    // カメラ作成
    const camera = new PerspectiveCamera(45, clientWidth / clientHeight)
    camera.position.set(20, 20, 20)
    camera.lookAt(new Vector3(0, 0, 0))
    // 床を作成
    const meshFloor = new Mesh(
      new BoxGeometry(2000, .1, 2000),
      new MeshStandardMaterial({ color: 0x808080, roughness: .0 })
    )
    // 影を受ける
    meshFloor.receiveShadow = true
    scene.add(meshFloor)
    // オブジェクトを作成
    const meshKnot = new Mesh(
      new TorusKnotGeometry(3, 1, 100, 16),
      new MeshStandardMaterial({ color: 0xaa0000, roughness: .0 })
    )
    meshKnot.position.set(0, 5, 0)
    // 影を落とす
    meshKnot.castShadow = true
    scene.add(meshKnot)
    // 照明を作成
    const light = new SpotLight(0xffffff, 2, 100, Math.PI / 4, 1)
    light.castShadow = true
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    scene.add(light)
    const tick = () => {
      // レンダリング
      renderer.render(scene, camera)
      // 照明の位置を更新
      const t = Date.now() / 500
      const r = 20.0
      const lx = r * Math.cos(t)
      const lz = r * Math.sin(t)
      const ly = 20.0 + 5.0 * Math.sin(t / 3.0)
      light.position.set(lx, ly, lz)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}