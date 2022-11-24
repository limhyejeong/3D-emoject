<template>
  <div>
    <section class="outputView">
      <div class="outputInfo">
        <div class="title">
          <span class="outputInfoName">{{ name }}</span
          >님의 감정 분석 결과
        </div>
        <div class="outputInfoEmoji">
          <h5>분석 이모지</h5>
          {{ emoji }}
        </div>
        <div class="outputInfoContent">
          <h5>감정 설명</h5>
          {{ content }}
        </div>
      </div>

      <div class="outputInfo outputCategoryDiv">
        <h5>
          대표 감정 유형
          <span class="outputInfoCategory">{{ categoryText }}</span>
        </h5>
        <div class="outputRadarDiv">
          <canvas id="outputRadarChart" width="300" height="300" />
        </div>
      </div>

      <div class="outputInfo outputActivityDiv">
        <h5>
          감정의 활성도 <span class="outputInfoActivity">{{ activity }}</span>
        </h5>
        <div class="outputProgressDiv">
          <div class="outputProgress"></div>
        </div>
      </div>

      <div class="outputBtns">
        <router-link to="/emoji">
          <button @click="clearInput" class="againBtn">다시 하기</button>
        </router-link>

        <button
          @click="
            addEmotion(
              name,
              emoji,
              content,
              category,
              activity,
              color,
              categoryData
            )
          "
          class="addBtn"
        >
          감정 등록
        </button>
      </div>
    </section>

    <canvas id="outputCanvas"></canvas>
  </div>
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
  CreateEmoject,
  noiseSettings,
  noiseAnimation,
} from "@/assets/js/CreateEmoject";
import { radarChart } from "@/assets/js/radarChart";
import { CategoryTrans } from "@/assets/js/CategoryTrans";

export default {
  name: "OutputView",
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, categoryData, activity, color } =
      storeToRefs(store);
    const { addEmotion, clearInput } = store;
    let categoryText = CategoryTrans(category.value); // 감정 한글로 변환

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
      camera.position.z = 7;
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
      emoject = CreateEmoject(
        emoject,
        category.value,
        activity.value,
        emoji.value.length / 2,
        color.value
      );

      emoject.userData = noiseSettings; // 이모젝트에 데이터 추가
      // emoject.rotation.x = Math.random() * 360;
      // emoject.rotation.y = Math.random() * 360;
      // emoject.position.x += 1.5;
      scene.add(emoject);
    };

    // 프로그래스 바 함수
    function setProgress(activity) {
      const outputProgress = document.querySelector(".outputProgress");
      outputProgress.style.width = activity * 10 + "%";
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
      if (emoject) {
        emoject.rotation.y += 0.01;
        noiseAnimation(emoject, emoject.userData);
      }
      controls.update();
      renderer.render(scene, camera);
    }

    onMounted(() => {
      initThreejs();
      importEmoject();
      radarChart(categoryData._object.categoryData);
      setProgress(activity.value);
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
      categoryData,
      noiseSettings,
      categoryText,
    };
  },
};
</script>

<style lang="scss">
.outputView {
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translate(0, -50%);
  transition: 0.25s;
}

.outputInfoName {
  font-weight: 700;
  color: var(--point);
}
.outputInfoEmoji {
  font-size: 2rem;
  margin: 10px 0;
}
.outputInfoContent {
  font-weight: 600;
  color: var(--point);
  h5 {
    margin-bottom: 5px;
  }
}
.outputInfoCategory,
.outputInfoActivity {
  font-weight: 700;
  padding-left: 7px;
  color: var(--point);
}

.outputInfo {
  background: linear-gradient(135deg, var(--light), var(--background));
  box-shadow: -2px -2px 5px #535353, inset -2px -2px 5px #000,
    10px 10px 50px var(--shadow);
  padding: 25px;
  border-radius: 10px;
  z-index: 10;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 500;
    padding-bottom: 10px;
  }
  h5 {
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--gray1);
  }
}

.outputCategoryDiv {
  .outputRadarDiv {
    width: 100%;
    height: 100%;
    canvas {
      width: 300px;
      height: 300px;
      // pointer-events: auto;
      margin-top: 15px;
    }
  }
}
.outputActivityDiv {
  .outputProgressDiv {
    width: 100%;
    height: 10px;
    background: var(--light);
    border-radius: 5px;
    margin-top: 15px;
  }
  .outputProgress {
    width: 50%;
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(-0.25turn, var(--point), #ffd000);
  }
}

.outputBtns {
  width: 100%;
  // display: flex;
  button {
    width: 50%;
    border-radius: 8px;
    padding: 18px;
    background: var(--light);
    color: var(--gray2);
    font-size: 1rem;
    font-weight: 500;
    border: 1px solid var(--background);
    // box-shadow: inset -10px -10px 20px var(--shadow);
    &:hover {
      box-shadow: inset 5px 5px 10px var(--shadow),
        inset -1px -1px 5px var(--gray2);
    }
  }
  .addBtn {
    background: var(--point);
    color: var(--shadow);
  }
}
</style>
