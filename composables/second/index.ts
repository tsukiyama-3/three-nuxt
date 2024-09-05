import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const use002 = (container: Ref<HTMLElement | null>) => {
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

    const controls = new OrbitControls(camera, renderer.domElement)

    // レンダリング関数
    const render = () => {
      requestAnimationFrame(render)
      controls.update()
      renderer.render(scene, camera)
    }

    // 初回のレンダリング
    render()
  }
  return { initThree }
}

export const use003 = (container: Ref<HTMLElement | null>) => {
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: 100 / 100,
    near: 0.1,
    far: 1000.0,
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

    const axesBarLength = 50.0
    const axesHelper = new THREE.AxesHelper(axesBarLength)
    scene.add(axesHelper)

    const controls = new OrbitControls(camera, renderer.domElement)

    // レンダリング関数
    const render = () => {
      requestAnimationFrame(render)
      controls.update()
      renderer.render(scene, camera)
    }

    // 初回のレンダリング
    render()
  }
  return { initThree }
}

export const use004 = (container: Ref<HTMLElement | null>) => {
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: 100 / 100,
    near: 0.1,
    far: 1000.0,
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
  const isDown = ref(false)
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

    const axesBarLength = 50.0
    const axesHelper = new THREE.AxesHelper(axesBarLength)
    scene.add(axesHelper)

    const controls = new OrbitControls(camera, renderer.domElement)

    // レンダリング関数
    const render = () => {
      requestAnimationFrame(render)
      controls.update()
      if (isDown.value) {
        box.rotation.y += 0.05
      }
      renderer.render(scene, camera)
    }

    // 初回のレンダリング
    render()
  }
  const keydownSpace = (keyEvent: KeyboardEvent) => {
    switch (keyEvent.key) {
      case ' ':
        isDown.value = true
        break
      default:
    }
  }
  const keyupSpace = (keyEvent: KeyboardEvent) => {
    isDown.value = false
  }
  return { initThree, keydownSpace, keyupSpace }
}

export const use005 = (container: Ref<HTMLElement | null>) => {
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: 100 / 100,
    near: 0.1,
    far: 1000.0,
    position: new THREE.Vector3(0.0, 2.0, 5.0),
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  }
  const RENDERER_PARAM = {
    clearColor: 0x666666,
    width: 100,
    height: 100,
  }
  const DIRECTIONAL_LIGHT_PARAM = {
    color: 0xffffff,
    intensity: 1.0,
    position: new THREE.Vector3(-1.0, -1.0, - 1.0),
  }
  const MATERIAL_PARAM = {
    color: 0x3399ff,
  }
  const isDown = ref(false)
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

    const directionalLight = new THREE.DirectionalLight(
      DIRECTIONAL_LIGHT_PARAM.color,
      DIRECTIONAL_LIGHT_PARAM.intensity,
    )
    directionalLight.position.copy(DIRECTIONAL_LIGHT_PARAM.position)
    scene.add(directionalLight)

    const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0)
    const material = new THREE.MeshLambertMaterial(MATERIAL_PARAM)
    const box = new THREE.Mesh(geometry, material)
    scene.add(box)

    const axesBarLength = 50.0
    const axesHelper = new THREE.AxesHelper(axesBarLength)
    scene.add(axesHelper)

    const controls = new OrbitControls(camera, renderer.domElement)

    // レンダリング関数
    const render = () => {
      requestAnimationFrame(render)
      controls.update()
      if (isDown.value) {
        box.rotation.y += 0.05
      }
      renderer.render(scene, camera)
    }

    // 初回のレンダリング
    render()
  }
  const keydownSpace = (keyEvent: KeyboardEvent) => {
    switch (keyEvent.key) {
      case ' ':
        isDown.value = true
        break
      default:
    }
  }
  const keyupSpace = (keyEvent: KeyboardEvent) => {
    isDown.value = false
  }

  return { initThree, keydownSpace, keyupSpace }
}
