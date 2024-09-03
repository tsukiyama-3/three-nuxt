import * as THREE from 'three'

export const use001 = (container: Ref<HTMLElement | null>) => {
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: 100 / 100,
    near: 0.1,
    far: 10.0,
    position: new THREE.Vector3(0.0, 2.0, 5.0),
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  }
  const RENDERER_PARAM = {
    clearColor: 0x666666,
    width: 100,
    height: 100,
  }
  const MATERIAL_PARAM = {
    color: 0x3399ff,
  }
  const initThree = () => {
    if (!container.value) return
    const color = new THREE.Color(RENDERER_PARAM.clearColor)
    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(color)
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)

    container.value.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      CAMERA_PARAM.fovy,
      container.value.clientWidth / container.value.clientHeight,
      CAMERA_PARAM.near,
      CAMERA_PARAM.far,
    )
    camera.position.copy(CAMERA_PARAM.position)
    camera.lookAt(CAMERA_PARAM.lookAt)

    const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0)
    const material = new THREE.MeshBasicMaterial(MATERIAL_PARAM)
    const box = new THREE.Mesh(geometry, material)
    scene.add(box)

    // レンダリング関数
    const render = () => {
      renderer.render(scene, camera)
    }

    // 初回のレンダリング
    render()
  }
  return { initThree }
}
