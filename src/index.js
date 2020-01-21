import * as THREE from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

// const canvas = document.createElement('canvas')
// const context = canvas.getContext('webgl2', { alpha: false })
// const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: false })

const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
const container = document.getElementById('root')
container.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const material = new THREE.ShaderMaterial({vertexShader, fragmentShader})
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
// const cube = new THREE.Mesh(geometry, material)

const cubes = [
  makeInstance(geometry, 0x44aa88, -2),
  makeInstance(geometry, 0x8844aa, 0),
  makeInstance(geometry, 0xaa8844, 2),
]

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-1, 2, 4)

const grid = new THREE.GridHelper(10, 10)
grid.material.depthTest = false
grid.renderOrder = 1

scene.add(grid)
scene.rotation.x = 1

scene.background = new THREE.Color(0xaaaaaa)

scene.add(light)
// scene.add(cube)

camera.position.z = 5

function animate(time) {
  cubes.forEach((cube, i) => {
    cube.rotation.x += 0.01 * (i + 1)
    cube.rotation.y += 0.01 * (i + 1)
  })
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

window.addEventListener(
  'resize',
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  },
  false,
)

animate()

function makeInstance(geometry, color, x) {
  const axes = new THREE.AxesHelper() // red - x; z - blue
  axes.material.depthTest = false
  axes.renderOrder = 2 // after the grid
  const material = new THREE.MeshPhongMaterial({ color })

  const cube = new THREE.Mesh(geometry, material)
  cube.add(axes)

  scene.add(cube)
  cube.position.x = x

  return cube
}
