<template>
  <div class="loading">
    <canvas id="loadingCanvas"></canvas>
    <span class="loadingText">감정 생성 중...</span>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router/index";
import * as THREE from "three";

export default {
  name: "LoadingAnimation",
  setup() {
    let scene, renderer, camera;
    let width = window.innerWidth,
      height = window.innerHeight;
    let loadingMesh;
    let time = 0;

    // 기본적인 Sence 제작 함수
    function initThreejs() {
      scene = new THREE.Scene();
      const loadingCanvas = document.querySelector("#loadingCanvas");

      renderer = new THREE.WebGLRenderer({
        canvas: loadingCanvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 7;
      scene.add(camera);

      const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
      const pointLight = new THREE.PointLight(0xff0000, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(light, pointLight);
    }

    function createLoadingMesh() {
      const geometry = new THREE.TorusGeometry(2, 0.1, 16, 64, time);
      const material = new THREE.MeshNormalMaterial();
      loadingMesh = new THREE.Mesh(geometry, material);
      loadingMesh.position.y = 0.1;

      loadingMesh.rotation.y = 3;
      loadingMesh.rotation.x = 2;
      scene.add(loadingMesh);
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
      scene.remove(loadingMesh);
      if (time < 6.5) time += 0.1;
      createLoadingMesh();
      renderer.render(scene, camera);
    }

    onMounted(() => {
      initThreejs();
      animate();
    });

    setTimeout(() => router.push("/output"), 1200);

    return {};
  },
};
</script>

<style lang="scss">
.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loadingText {
  font-size: 1.5rem;
  color: var(--gray2);
  font-weight: 600;
}
</style>
