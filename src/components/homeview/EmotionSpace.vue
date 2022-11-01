<template>
  <section v-show="isClick" class="outputView">
    <div class="outputInfo">
      <div class="title">
        <span class="outputInfoName">{{ selectedData.name }}</span
        >님의 감정 분석 결과
      </div>
      <div class="outputInfoEmoji">
        <h5>분석 이모지</h5>
        {{ selectedData.emoji }}
      </div>
      <div class="outputInfoContent">
        <h5>감정 설명</h5>
        {{ selectedData.content }}
      </div>
    </div>

    <div class="outputInfo outputCategoryDiv">
      <h5>감정 유형 <span class="outputInfoCategory">ㅁㄴㄴ</span></h5>
      <div class="outputRadarDiv">
        <!-- <canvas id="outputRadarChart" /> -->
      </div>
    </div>

    <div class="outputInfo outputActivityDiv">
      <h5>
        감정의 활성도
        <span class="outputInfoActivity">{{ selectedData.activity }}</span>
      </h5>
      <div class="outputProgressDiv">
        <div class="outputProgress"></div>
      </div>
    </div>

    <button @click="deleteEmotion(selectedData.id)" class="deleteBtn">
      감정 삭제
    </button>

    <button @click="closeModal" class="closeModal">
      <img src="@/assets/plus.svg" />
    </button>
  </section>

  <canvas id="homeCanvas" />
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  createEmoject,
  noiseSettings,
  noiseAnimation,
} from "@/assets/js/createEmoject";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import { logEvent } from "@firebase/analytics";
import { PreventDragClick } from "@/assets/js/PreventDragClick";
import { radarChart } from "@/assets/js/radarChart";
import { doc } from "@firebase/firestore";

export default {
  name: "EmotionSpace",
  setup() {
    const store = useHomeStore();
    const { emotions } = storeToRefs(store);
    const { fetchEmotions, deleteEmotion } = store;
    let isClick = ref(false);

    fetchEmotions(); // home.js pinia에서 데이터 불러오기

    // threejs 추가하기
    let scene, renderer, camera, controls;
    let width = window.innerWidth,
      height = window.innerHeight;
    let homeCanvas;
    const homeRadarChart = ref("");
    let chartCanvas;

    // 기본적인 Sence 제작 함수
    function initThreejs() {
      scene = new THREE.Scene();
      // scene.background = new THREE.Color(0xffffff);
      // scene.fog = new THREE.Fog(0xffffff, 3, 80);
      homeCanvas = document.querySelector("#homeCanvas");
      renderer = new THREE.WebGLRenderer({
        canvas: homeCanvas,
        antialias: true,
        alpha: true,
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
      controls.enableDamping = true;
      controls.autoRotateSpeed = 1;
    }

    const group = new THREE.Group();

    // emotions에 데이터가 들어오면 감정 오브젝트를 뿌려줌
    watch(emotions, () => {
      for (let i = 0; i < emotions._object.emotions.length; i++) {
        importEmoject(emotions._object.emotions[i]);
      }
      scene.add(group);
    });

    // 감정 오브젝트 만드는 함수
    let emoject;
    const importEmoject = (data) => {
      emoject = createEmoject(
        emoject,
        data.category,
        data.activity,
        data.emoji.length / 2,
        data.color
      );
      emoject.userData = [data, noiseSettings]; // 이모젝트에 데이터 추가
      let range = 10; // 위치 범위
      emoject.position.x = Math.floor(Math.random() * (12 * 2) - 12);
      emoject.position.y = Math.floor(Math.random() * (8 * 2) - 8);
      emoject.position.z = Math.floor(Math.random() * (range * 2) - range);
      emoject.rotation.x = Math.random() * 360;
      emoject.rotation.y = Math.random() * 360;
      noiseAnimation(emoject, emoject.userData[1]);
      group.add(emoject);
    };

    // 레이캐스터 (클릭 감지)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // 클릭하면 selectedMesh 활성화, selectedData 값 변경
    let selectedData = ref({});
    let selectedMesh;

    function onPointerClick(event) {
      if (preventDragClick.mouseMoved) return;
      if (isClick.value == true) {
        closeModal();
      } else {
        pointer.x = (event.clientX / width) * 2 - 1;
        pointer.y = -(event.clientY / height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length !== 0) {
          // 클릭한 것이 있을 때
          for (let i = 0; i < intersects.length; i++) {
            selectedMesh = intersects[i].object;
            break;
          }
          selectedData.value = selectedMesh.userData[0];
          openModal();
        } else {
          selectedMesh = null;
        }
        setProgress(selectedData.value.activity);
        // radarChart(canvas, selectedData.value.categoryData);
      }
    }

    const settings = {
      speed: 0.5,
      density: 1,
      strength: 0.8,
      frequency: 2.0,
      amplitude: 10.0,
      intensity: 1,
    };
    let duration = 700;
    let saveControls;

    // 메쉬에 카메라 포커스가 맞춰지고 모달이 열리는 함수
    function openModal() {
      // setTimeout(() => (isClick.value = true), duration);
      isClick.value = true;
      saveControls = controls.saveState();

      // 카메라 위치 변경
      new TWEEN.Tween(camera.position)
        .to(
          {
            x: selectedMesh.position.x,
            y: selectedMesh.position.y,
            z: selectedMesh.position.z + 5,
          },
          duration
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();

      // 카메라 시점 변경
      new TWEEN.Tween(controls)
        .to({ target: selectedMesh.position }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    }

    // 모달 닫기
    function closeModal() {
      isClick.value = false;
      controls.reset();

      // 카메라 위치
      // new TWEEN.Tween(camera)
      //   .to(
      //     {
      //       position: new THREE.Vector3(0, 0, 20),
      //     },
      //     duration
      //   )
      //   .easing(TWEEN.Easing.Quadratic.InOut)
      //   .start();

      // 카메라 시점
      // new TWEEN.Tween(controls)
      //   .to({ target: new THREE.Vector3(0, 0, 0) }, duration)
      //   .easing(TWEEN.Easing.Quadratic.InOut)
      //   .start();
    }

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

    // 모든 emoject에 노이즈 애니메이션
    function emojectsMotion() {
      for (let i = 0; i < group.children.length; i++) {
        noiseAnimation(group.children[i], group.children[i].userData[1]);
      }
    }

    // 애니메이션
    function animate() {
      requestAnimationFrame(animate);
      if (isClick.value == false) {
        controls.autoRotate = true;
        // emojectsMotion();
      } else {
        selectedMesh.rotation.y += 0.01;
        selectedMesh.rotation.x += 0.01;
        noiseAnimation(selectedMesh, selectedMesh.userData[1]);
        controls.autoRotate = false;
      }
      controls.update();
      TWEEN.update();
      renderer.render(scene, camera);
    }

    let preventDragClick; // 드래그 시 클릭 방지

    onMounted(() => {
      initThreejs();

      animate();
      homeCanvas.addEventListener("click", onPointerClick);
      preventDragClick = new PreventDragClick(homeCanvas);
    });

    return {
      isClick,
      closeModal,
      openModal,
      importEmoject,
      renderer,
      camera,
      scene,
      vertexShader,
      fragmentShader,
      settings,
      emotions,
      controls,
      deleteEmotion,
      selectedData,
      homeRadarChart,
      chartCanvas,
    };
  },
};
</script>

<style lang="scss">
.closeModal {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right: -25px;
  top: -25px;
  background: var(--black);
  color: #aaa;
  font-size: 1.2rem;
  margin: 5px 5px 0 0;
  border: 1px solid #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
  }
}

.deleteBtn {
  display: absolute;
  width: 100%;
  border-radius: 8px;
  padding: 18px;
  background: rgb(217, 84, 84);
  color: var(--light);
  font-weight: 700;
  border: 1px solid var(--background);
  // box-shadow: inset 2px 2px 4px var(--gray1), inset -3px -3px 10px #000,
  //   10px 10px 20px var(--shadow);

  &:hover {
    box-shadow: inset 5px 5px 10px #000, inset -2px -2px 10px var(--gray1);
    color: var(--gray1);
  }
}
</style>
