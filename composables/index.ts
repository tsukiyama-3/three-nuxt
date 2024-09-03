import * as THREE from 'three'

export const useThree = (container: Ref<HTMLElement | null>) => {
  onMounted(() => {
    // Three.jsのシーン、カメラ、レンダラーを作成
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // refで取得したHTML要素にThree.jsのレンダラーを追加
    container.value?.appendChild(renderer.domElement)

    // ジオメトリとマテリアルの作成
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    // アニメーション関数
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    // アニメーションを開始
    animate()
  })
}
