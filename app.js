import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { TWEEN } from "three/addons/libs/tween.module.min.js";

const loadingState = document.getElementById("loading-state");
let canvas = document.getElementById("dCanvas");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

let object;

let controls;

let loader = new GLTFLoader();

loader.load(
  "assets/scene.gltf",
  function (gltf) {
    loadingState.innerHTML = "";
    object = gltf.scene;
    scene.add(object);
  },
  () => {
    loadingState.innerHTML = "Loading model...";
  }
);

let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);

document.getElementById("dCanvas").appendChild(renderer.domElement);

camera.position.set(5, 0, 1);

controls = new OrbitControls(camera, renderer.domElement);

let ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

let light = new THREE.PointLight(0x4c4c4c, 20);
light.position.set(0, 300, 500);
scene.add(light);

let light2 = new THREE.PointLight(0x4c4c4c, 10);
light2.position.set(500, 100, 0);
scene.add(light2);

let light3 = new THREE.PointLight(0x4c4c4c, 10);
light3.position.set(0, 100, -500);
scene.add(light3);

let light4 = new THREE.PointLight(0x4c4c4c, 20);
light4.position.set(-500, 300, 500);
scene.add(light4);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  TWEEN.update();
}

animate();

function runCamera(x, y, z) {
  let targetPosition = new THREE.Vector3(x, y, z);

  let duration = 1000;

  new TWEEN.Tween(camera.position)
    .to(targetPosition, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    })
    .start();
}

const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", () => {
  runCamera(5, 0, 1);
});

const btn2 = document.getElementById("btn2");

btn2.addEventListener("click", () => {
  runCamera(0, 5, 1);
});

const btn3 = document.getElementById("btn3");

btn3.addEventListener("click", () => {
  runCamera(5, 5, 5);
});

const btn4 = document.getElementById("btn4");

btn4.addEventListener("click", () => {
  runCamera(5, 5, 0);
});

const btn6 = document.getElementById("btn6");

btn6.addEventListener("click", () => {
  runCamera(5, 0, 0);
});

window.addEventListener("resize", () => {
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
