<template>
  <section class="outputView">
    <canvas id="outputCanvas"></canvas>

    <div class="outputInfo">
      <div class="title">{{ name }}님의 감정을 시각화한 모습이에요.</div>
      <div class="outputInfoEmoji">
        <h5>분석된 이모지</h5>
        {{ emoji }}
      </div>
      <div class="outputInfoContent">
        <h5>참고한 정보</h5>
        {{ content }}
      </div>
      <br />
      <div class="outputInfoCategory">
        <h5>감정 분석 결과</h5>
        <canvas id="outputChart" />
        {{ category }}
        {{ activity }}
      </div>
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

.outputInfo {
  position: absolute;
  top: 15%;
  border: 1px solid #eee;
  width: 100%;
  padding: 0 50px;

  h5 {
    font-size: 1rem;
    font-weight: 800;
  }

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
