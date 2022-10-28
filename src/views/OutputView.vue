<template>
  <section class="outputView">
    <canvas id="outputCanvas"></canvas>

    <div class="outputInfo">
      <br />
      <div class="outputInfoEmoji">{{ emoji }}</div>
      <div class="outputInfoName">{{ name }}</div>
      <div class="outputInfoContent">{{ content }}</div>
      <br />
      <!-- <div class="outputInfoCategory">{{ category }}</div> -->
      <!-- <div class="outputInfoActivity">{{ activity }}</div> -->
    </div>

    <div class="outputBtns">
      <router-link to="/emoji">
        <button @click="clearInput" class="againBtn">다시 하기</button>
      </router-link>

      <button
        @click="addEmotion(name, emoji, content, category, activity)"
        class="addBtn"
      >
        감정 등록
      </button>
    </div>
  </section>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
// import { makeNoise4D } from "open-simplex-noise";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  createEmoject,
  noiseSettings,
  noiseAnimation,
} from "@/assets/js/createEmoject";
import { noise } from "@/assets/js/noise";
import router from "@/router/index";

export default {
  name: "OutputView",
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity, color } =
      storeToRefs(store);
    const { addEmotion, clearInput } = store;

    // threejs 추가하기
    let scene, renderer, camera, controls;
    let width = window.innerWidth,
      height = window.innerHeight;
    let outputCanvas;

    // 기본적인 Sence 제작 함수
    function initThreejs() {
      scene = new THREE.Scene();
      outputCanvas = document.querySelector("#outputCanvas");

      renderer = new THREE.WebGLRenderer({
        canvas: outputCanvas,
        antialias: true,
        alpha: true,
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
    }

    // 감정 오브젝트 만드는 함수
    let emoject;
    const importEmoject = () => {
      emoject = createEmoject(emoject, category.value, activity.value);
      emoject.userData = noiseSettings; // 이모젝트에 데이터 추가
      // emoject.rotation.x = Math.random() * 360;
      // emoject.rotation.y = Math.random() * 360;
      scene.add(emoject);
    };

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
      emoject.rotation.y += 0.01;
      noiseAnimation(emoject, emoject.userData);
      controls.update();
      renderer.render(scene, camera);
    }

    onMounted(() => {
      initThreejs();
      importEmoject();
      animate();
    });

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
      addEmotion,
      clearInput,
      renderer,
      scene,
      color,
      vertexShader,
      fragmentShader,
      noiseSettings,
    };
  },
};
</script>

<style lang="scss">
.outputView {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#outputCanvas {
  border: 1px solid red;
  width: 60%;
  // height: 90vh;
}
.outputInfo {
  position: absolute;
  top: 15%;
  // border: 1px solid #eee;
  width: 100%;
  padding: 0 50px;

  .outputInfoName {
    font-weight: 800;
  }
  .outputInfoEmoji {
    font-size: 3rem;
  }
  .outputInfoContent {
    font-size: 0.85rem;
    color: #aaa;
  }
}

.outputBtns {
  position: absolute;
  bottom: 0;

  button {
    padding: 20px;
  }
}
</style>
