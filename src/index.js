import * as THREE from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import fox from './img/fox.jpg'

const OrbitControls = require('three-orbit-controls')(THREE)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
const controls = new OrbitControls(camera)
// const canvas = document.createElement('canvas')
// const context = canvas.getContext('webgl2', { alpha: false })
// const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: false })

const renderer = new THREE.WebGLRenderer({antialias: false})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
const container = document.getElementById('root')
container.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const uniforms = {
  iTime: {value: 0},
  iResolution: {value: new THREE.Vector3()},
  image: {type:   't', value: new THREE.TextureLoader().load(fox)}
}
const material = new THREE.ShaderMaterial({vertexShader, fragmentShader, uniforms})
// const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
// const cube = new THREE.Mesh(geometry, material)
const mesh = new THREE.Mesh(geometry, material)
// object.scale(0)
mesh.geometry.scale(3,3,3)
scene.add(mesh)

// const cubes = [
//   makeInstance(geometry, 0x44aa88, -2),
//   makeInstance(geometry, 0x8844aa, 0),
//   makeInstance(geometry, 0xaa8844, 2),
// ]

// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.position.set(-1, 2, 4)

// const grid = new THREE.GridHelper(10, 10)
// grid.material.depthTest = false
// grid.renderOrder = 1

// scene.add(grid)
// scene.rotation.x = 1

scene.background = new THREE.Color(0xaaaaaa)

// scene.add(light)
// scene.add(cube)

window.addEventListener(
  'resize',
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  },
  false
)
// function animate(time) {
//   time *= 0.001
//   cubes.forEach((cube, i) => {
//     cube.rotation.x += 0.01 * (i + 1)
//     cube.rotation.y += 0.01 * (i + 1)
//   })
//   const canvas = renderer.domElement
//   uniforms.iResolution.value.set(canvas.width, canvas.height, 1)
//   uniforms.iTime.value = time
//   // uniforms.iTime.value.set(time)
//   renderer.render(scene, camera)

//   requestAnimationFrame(animate)
// }

function animate() {
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()

function makeInstance(geometry, color, x) {
  const axes = new THREE.AxesHelper() // red - x; z - blue
  axes.material.depthTest = false
  axes.renderOrder = 2 // after the grid
  // const material = new THREE.MeshPhongMaterial({ color })
  const material = new THREE.ShaderMaterial({vertexShader, fragmentShader, uniforms})

  const cube = new THREE.Mesh(geometry, material)
  cube.add(axes)

  scene.add(cube)
  cube.position.x = x

  return cube
}
