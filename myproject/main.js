import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Set up the scene camera and canvas.
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Set the camera that it is window sized.
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Get geometry to the scene
const geometry = new THREE.IcosahedronGeometry(10, 2,3,8);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347, wireframe: true} );
const isohedron = new THREE.Mesh( geometry, material);

scene.add(isohedron);

// Add lightings to the scene.
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);


scene.add(pointLight, ambientLight)


// Add user controlls to the scene
const controls = new OrbitControls(camera, renderer.domElement)

// Add stars to the field 
function addStars() {
  const geometry = new THREE.SphereGeometry(0.15, 20, 20);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  scene.add(star)
}

Array(150).fill().forEach(addStars)

// Add image as a background.
const bg = new THREE.TextureLoader().load('bg.jpg');
scene.background = bg;


// Animate geometry movement
function animate() {
  requestAnimationFrame(animate)

  isohedron.rotation.x += 0.005;
  isohedron.rotation.y += 0.01;
  isohedron.rotation.z += 0.005;
  controls.update()
  renderer.render(scene, camera);
}

function moveCamera() {
  const userCamera = document.body.getBoundingClientRect().top;
  camera.position.z = userCamera * -0.01;
  camera.position.x = userCamera * -0.0002;
  camera.rotation.y = userCamera * -0.0002;
}

document.body.onscroll = moveCamera
moveCamera();

animate()