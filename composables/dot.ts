import { AmbientLight, Mesh, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ref } from 'vue'

// シーン追加
const scene = new Scene()

// カメラ追加
const camera = new PerspectiveCamera(45, 512 / 512)
camera.position.set(0, 0, 628)

// ライト追加
const light = new AmbientLight(0xffffff, 1.0)
scene.add(light)

// メッシュ追加
const geometry = new PlaneGeometry(8, 8, 1, 1)
const planeList = []
const col = ref(-256)
const row = ref(-256)
for (let i = 0; i <= 64; i++) {
  for (let j = 0; j <= 64; j++) {
    const material = new MeshLambertMaterial({ color: 0xffffff })
    const plane = new Mesh(geometry, material)
    plane.position.x += col.value
    plane.position.y -= row.value
    col.value += 8
    scene.add(plane)
    planeList.push(plane)
  }
  row.value += 8
  col.value = -256
}

export const useDot = (mouse, color: Ref<number>) => {
  // レンダラー作成
  const renderer = ref()

  // rayCaster
  const raycaster = new Raycaster()

  // tick
  const tick = () => {
    raycaster.setFromCamera(mouse, camera)
    const hoge = '0x' + color.value as unknown as string
    const intersects = raycaster.intersectObjects(planeList)
    planeList.map((plane) => {
      if (intersects.length > 0 && plane === intersects[0].object) {
        plane.material.color.setHex(hoge)
      }
    })
    renderer.value.render(scene, camera)
    requestAnimationFrame(tick)
  }

  const controls = ref()

  const init = (container: Ref<HTMLElement>) => {
    watchEffect(() => {
      renderer.value = new WebGLRenderer()
      renderer.value.setSize(512, 512)
      renderer.value.setPixelRatio(512 / 512)
    })
    container.value.appendChild(renderer.value.domElement)

    controls.value = new OrbitControls(camera, container.value)
    controls.value.enablePan = false
    controls.value.enableRotate = false
    controls.value.enableZoom = true
    controls.value.maxDistance = 628
    controls.value.minDistance = 24

    tick()
  }

  const moveLeft = () => {
    planeList.map((plane) => {
      plane.position.x += 8
    })
  }

  const moveRight = () => {
    planeList.map((plane) => {
      plane.position.x -= 8
    })
  }

  const moveTop = () => {
    planeList.map((plane) => {
      plane.position.y -= 8
    })
  }

  const moveBottom = () => {
    planeList.map((plane) => {
      plane.position.y += 8
    })
  }

  const count = ref(0)

  const zoomIn = () => {
    if (count.value < 24) {
      camera.position.z -= 8 * Math.sqrt(2) * 2
      count.value++
    }
    console.log(count.value, camera.position.z)
  }

  const zoomOut = () => {
    camera.position.z += 8 * Math.sqrt(2) * 2
  }

  return {
    init,
    moveLeft,
    moveRight,
    moveTop,
    moveBottom,
    zoomIn,
    zoomOut
  }
}