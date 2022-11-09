<template>
  <div>
    <canvas id="logoCanvas"></canvas>
  </div>
</template>

<script>
import { onMounted } from "vue";
// import { makeNoise4D } from "open-simplex-noise";
// import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CreateEmoject,
  noiseSettings,
  noiseAnimation,
} from "@/assets/js/CreateEmoject";
import { noise } from "@/assets/js/noise";

export default {
  name: "logoPage",
  setup() {
    // threejs 추가하기
    let scene, renderer, camera, controls;
    let width = window.innerWidth,
      height = window.innerHeight;
    let outputCanvas;
    let sphere;
    let noiseSettings = { 진폭: 3, 반경: 1, 속도: 1 };
    let v3 = new THREE.Vector3();
    const texLoader = new THREE.TextureLoader(); // 텍스쳐 로더

    // 기본적인 Sence 제작 함수
    function initThreejs() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      outputCanvas = document.querySelector("#logoCanvas");

      renderer = new THREE.WebGLRenderer({
        canvas: outputCanvas,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 10;
      scene.add(camera);

      const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
      const pointLight = new THREE.PointLight(0xff0000, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(light, pointLight);

      controls = new OrbitControls(camera, renderer.domElement);

      const geometry = new THREE.SphereGeometry(1, 128, 128);

      const matcapTexture = texLoader.load(
        "./assets/textures/matcap/노랑은은.jpg"
      );

      const material = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      });

      // 노이즈 애니메이션을 위한 준비
      geometry.positionData = [];
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(geometry.attributes.position, i);
        geometry.positionData.push(v3.clone());
      }
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    }

    // 브라우저 창 사이즈
    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }
    window.addEventListener("resize", setSize);

    // 애니메이션
    function animate() {
      requestAnimationFrame(animate);
      // sphere.rotation.y += 0.01;
      noiseAnimation(sphere, noiseSettings);
      renderer.render(scene, camera);
    }

    onMounted(() => {
      initThreejs();
      animate();
    });
  },
};
</script>

<style lang="scss"></style>
