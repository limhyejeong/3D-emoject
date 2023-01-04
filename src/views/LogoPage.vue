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
    // let noiseSettings = { amplitude: 0.7, scope: 1.3, speed: 1 };
    let activity = 6;
    let noiseSettings = {
      amplitude: 0.4 + 0.2 * activity,
      scope: 0.2 + activity * 0.2,
      speed: 9 * 0.2,
    };
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
      camera.position.z = 5;
      scene.add(camera);

      const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
      const pointLight = new THREE.PointLight(0xff0000, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(light, pointLight);

      controls = new OrbitControls(camera, renderer.domElement);
      let joyVec = 5;

      // const geometry = new THREE.ConeGeometry(0.7, 1.4, 128, 128);
      // const geometry = new THREE.TorusKnotGeometry(
      //   0.6,
      //   0.1,
      //   256,
      //   256,
      //   1,
      //   joyVec
      // );
      const geometry = new THREE.SphereGeometry(0.8, 64, 64);

      const matcapTexture = texLoader.load("./assets/textures/matcap/03.png");
      const material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(0xeb8264),
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
