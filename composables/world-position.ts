import { AxesHelper, BufferGeometry, GridHelper, Group, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, MeshNormalMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, Vector4, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useWorldPosition = (container: Ref<HTMLElement>) => {
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
    camera.position.set(100, 150, 500)
    camera.lookAt(new Vector3(0, 0, 0))
    // 地面作成
    const plane2 = new GridHelper(600)
    scene.add(plane2)
    const plane = new AxesHelper(300)
    scene.add(plane)
    // group
    const group = new Group()
    scene.add(group)
    const targetMesh = ref(new Mesh())
    for (let i = 0; i < 10; i++) {
      const material = i === 0 ? new MeshNormalMaterial() : new MeshBasicMaterial()
      const geometry = new SphereGeometry(30, 30, 30)
      const mesh = new Mesh(geometry, material)
      const radian = (i / 10) * Math.PI * 2
      mesh.position.set(200 * Math.cos(radian), 0, 200 * Math.sin(radian))
      group.add(mesh)
      if (i === 0) {
        targetMesh.value = mesh
      }
    }
    const geometry = new BufferGeometry().setFromPoints([
      new Vector3(0, 0, 0),
      new Vector3(50, 50, 0)
    ])
    const line = new Line(geometry, new LineBasicMaterial())
    scene.add(line)
    const tick = () => {
      group.rotation.x += .02
      group.rotation.y += .01
      // ワールド座標を取得
      const world = targetMesh.value.getWorldPosition(new Vector3())
      // ラインを更新
      const positions: any = line.geometry.attributes.position.array
      positions[0] = 0
      positions[1] = 0
      positions[2] = 0
      positions[3] = world.x
      positions[4] = world.y
      positions[5] = world.z
      line.geometry.attributes.position.needsUpdate = true
      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}