
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, renderer, camera, controls;


// 기본적인 Sence 제작 함수
const initThreejs = (canvas, width, height) => {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        // alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    scene.add(camera);

    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    const pointLight = new THREE.PointLight(0xff0000, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(light, pointLight);

    controls = new OrbitControls(camera, renderer.domElement);
}

export { initThreejs, scene, renderer, camera, controls };