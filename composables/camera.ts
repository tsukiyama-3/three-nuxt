import { BoxGeometry, Mesh, MeshStandardMaterial, NearestFilter, OrthographicCamera, PlaneGeometry, RepeatWrapping, Scene, SpotLight, TextureLoader, Vector3, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useCamera = (container: Ref<HTMLElement>) => {
  const { clientWidth, clientHeight } = container.value
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(clientWidth / clientHeight)
    container.value.appendChild(renderer.domElement)
    renderer.shadowMap.enabled = true
    // シーン作成
    const scene = new Scene()
    // カメラ作成
    const camera = new OrthographicCamera(-480, +480, 270, -270)
    // 光源作成
    const spotLight = new SpotLight(0xffffff, 4, 2000, Math.PI / 5, .2, 1.5)
    spotLight.position.set(500, 300, 500)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048
    scene.add(spotLight)
    // 地面作成
    // 床のテクスチャー
    const texture = new TextureLoader().load('../images/floor.png')
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.repeat.set(10, 10)
    texture.magFilter = NearestFilter
    const floor = new Mesh(
      new PlaneGeometry(1000, 1000),
      new MeshStandardMaterial({
        map: texture,
        roughness: .0,
        metalness: .6
      })
    )
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)
    // マス目を作成
    // 立方体のマテリアルとジオメトリを作成
    const material = new MeshStandardMaterial({
      color: 0x22dd22,
      roughness: .1,
      metalness: .2
    })
    const geometry = new BoxGeometry(45, 45, 45)
    // 立方体をランダムに配置
    for (let i = 0; i < 60; i++) {
      const box = new Mesh(geometry, material)
      box.position.x = Math.round((Math.random() - .5) * 19) * 60 + 25
      box.position.y = 25
      box.position.z = Math.round((Math.random() - .5) * 19) * 50 + 25
      // 影の設定
      box.receiveShadow = true
      box.castShadow = true
      scene.add(box)
    }
    const tick = () => {
      // 角度に応じてカメラ位置を設定
      camera.position.x = 500 * Math.sin(Date.now() / 2000)
      camera.position.y = 250
      camera.position.z = 500 * Math.cos(Date.now() / 2000)
      // 原点方向を見つめる
      camera.lookAt(new Vector3(0, 0, 0))
      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return { init }
}