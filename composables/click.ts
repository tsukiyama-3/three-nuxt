import { AmbientLight, BoxBufferGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useClick = (container: Ref<HTMLElement>, clientWidth: Ref<number>, clientHeight: Ref<number>, mouse, color: Ref<number>) => {
  const init = () => {
    // renderer
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth.value, clientHeight.value)
    renderer.setPixelRatio(clientWidth.value / clientHeight.value)
    container.value.appendChild(renderer.domElement)
    // scene
    const scene = new Scene()
    // camera
    const camera = new PerspectiveCamera(45, clientWidth.value / clientHeight.value)
    camera.position.set(0, 0, 1000)
    // cube
    // const geometry = new BoxGeometry(10, 10, 10)
    // const material = new MeshLambertMaterial({ color: 0xffffff })
    // const cube = new Mesh(geometry, material)
    // scene.add(cube)

    const geometry = new BoxBufferGeometry(50, 50, 50)
    const meshList = []
    for (let i = 0; i < 200; i++) {
      const material = new MeshStandardMaterial({ color: 0xffffff })

      const mesh = new Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 800
      mesh.position.y = (Math.random() - 0.5) * 800
      mesh.position.z = (Math.random() - 0.5) * 800
      mesh.rotation.x = Math.random() * 2 * Math.PI
      mesh.rotation.y = Math.random() * 2 * Math.PI
      mesh.rotation.z = Math.random() * 2 * Math.PI
      scene.add(mesh)

      // 配列に保存
      meshList.push(mesh)
    }

    // light
    const light = new AmbientLight(0xffffff, 1)
    scene.add(light)
    // raycaster
    const raycaster = new Raycaster()
    // console.log(, 'num')
    const tick = () => {
      const hoge = '0x' + color.value as unknown as string
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(meshList)
      meshList.map((mesh) => {
        // 交差しているオブジェクトが1つ以上存在し、
        // 交差しているオブジェクトの1番目(最前面)のものだったら
        if (intersects.length > 0 && mesh === intersects[0].object) {
          // 色を赤くする
          mesh.material.color.setHex(hoge)
        }
      })
      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}