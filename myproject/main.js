import './style.css'

import * as THREE from 'three';

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
const geometry = new THREE.IcosahedronGeometry(15, 2,3,8);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347, wireframe: true} );
const isohedron = new THREE.Mesh( geometry, material);

scene.add(isohedron);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);


scene.add(pointLight, ambientLight)

// Animate geometry movement
function animate() {
  requestAnimationFrame(animate)

  isohedron.rotation.x += 0.005;
  isohedron.rotation.y += 0.01;
  isohedron.rotation.z += 0.005;

  renderer.render(scene, camera);
}

animate()