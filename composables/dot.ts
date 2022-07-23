import { AmbientLight, Mesh, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ref } from 'vue'

export const useDot = (container: Ref<HTMLElement>, mouse, color: Ref<number>) => {
  const init = () => {
    const renderer = new WebGLRenderer()
    renderer.setSize(512, 512)
    renderer.setPixelRatio(512 / 512)
    container.value.appendChild(renderer.domElement)

    const scene = new Scene()

    const camera = new PerspectiveCamera(45, 512 / 512)
    camera.position.set(0, 0, 512)

    const controls = new OrbitControls(camera, container.value)
    controls.enablePan = false
    controls.enableRotate = false
    controls.enableZoom = true
    controls.maxDistance = 512
    controls.minDistance = 1

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

    const light = new AmbientLight(0xffffff, 1.0)
    scene.add(light)

    const raycaster = new Raycaster()
    const tick = () => {
      raycaster.setFromCamera(mouse, camera)
      const hoge = '0x' + color.value as unknown as string
      const intersects = raycaster.intersectObjects(planeList)
      planeList.map((plane) => {
        if (intersects.length > 0 && plane === intersects[0].object) {
          plane.material.color.setHex(hoge)
        }
      })
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}