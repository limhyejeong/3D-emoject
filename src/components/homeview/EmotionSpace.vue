<template>
  <!-- <div class="meshInfo">{{ selectedData.emoji }}</div> -->
  <aside v-show="isClick" class="info">
    <div class="infoNum">{{ selectedData.emoji }}</div>
    <div class="infoName">{{ selectedData.name }}</div>
    <p class="infoContents">{{ selectedData.contents }}</p>

    <button @click="closeModal" class="closeModal">x</button>
    <button @click="deleteEmotion(selectedData.id)" class="deleteInfo">
      Delete
    </button>
  </aside>

  <canvas id="homeCanvas" />
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createEmoject } from "@/assets/js/createEmoject";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import { logEvent } from "@firebase/analytics";

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

    // 기본적인 Sence 제작 함수
    function initThreejs() {
      scene = new THREE.Scene();
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
      // camera.lookAt(0, 0, 0);
      scene.add(camera);

      const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
      const pointLight = new THREE.PointLight(0xff0000, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(light, pointLight);

      controls = new OrbitControls(camera, renderer.domElement);
      console.log(controls.target);
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
      emoject = createEmoject(emoject, data.category, data.activity);
      emoject.userData = data; // 이모젝트에 데이터 추가
      let range = 5; // 위치 범위
      emoject.position.x = Math.floor(Math.random() * (range * 2) - range);
      emoject.position.y = Math.floor(Math.random() * (range * 2) - range);
      emoject.position.z = Math.floor(Math.random() * (range * 2) - range);
      emoject.rotation.x = Math.random() * 360;
      emoject.rotation.y = Math.random() * 360;
      // scene.add(emoject);
      group.add(emoject);
    };

    // 레이캐스터 (클릭 감지)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // 클릭하면 selectedMesh 활성화, selectedData 값 변경
    let selectedData = ref({});
    let selectedMesh;
    function onPointerClick(event) {
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
          selectedData.value = selectedMesh.userData;
          openModal();
        }
      }
    }

    // 애니메이션
    function animate() {
      requestAnimationFrame(animate);
      if (isClick.value == false) if (group) group.rotation.y += 0.002;
      controls.update();
      TWEEN.update();
      renderer.render(scene, camera);
    }

    const settings = {
      speed: 0.5,
      density: 1,
      strength: 0.8,
      frequency: 2.0,
      amplitude: 10.0,
      intensity: 1,
    };
    let duration = 1000;

    function openModal() {
      isClick.value = true;

      // 카메라 위치
      new TWEEN.Tween(camera.position)
        .to(
          {
            x: selectedMesh.position.x + 2,
            y: selectedMesh.position.y,
            z: selectedMesh.position.z + 5,
          },
          duration
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();

      console.log(controls.target);

      // 카메라 시점
      new TWEEN.Tween(controls.target)
        .to(
          {
            x: selectedMesh.position.x,
            y: selectedMesh.position.y,
            z: selectedMesh.position.z,
          },
          duration
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    }

    // 정보 닫기
    function closeModal() {
      isClick.value = false;

      // 카메라 위치
      new TWEEN.Tween(camera.position)
        .to(
          {
            x: 0,
            y: 0,
            z: 20,
          },
          duration
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();

      // 카메라 시점
      new TWEEN.Tween(controls.target)
        .to(
          {
            x: 0,
            y: 0,
            z: 0,
          },
          duration
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    }

    let 진폭 = 6;
    let 반경 = 0.2;
    let 속도 = 0.6;

    // 브라우저 창 사이즈
    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }
    window.addEventListener("resize", setSize);

    onMounted(() => {
      initThreejs();
      animate();
      homeCanvas.addEventListener("click", onPointerClick);
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
    };
  },
};
</script>

<style lang="scss">
.meshInfo {
  position: absolute;
  top: 10px;
  right: 10px;
}
.info {
  position: absolute;
  right: 0;
  margin: 50px 50px 0 0;
  padding: 50px;
  // background: #27292e;
  color: #fff;
  border-radius: 10px;
  border: 1px solid var(--section-color);
  // box-shadow: inset -12px -8px 20px #000;
  // box-shadow: inset 6px 4px 16px #888;
  z-index: 100;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 5px 5px 20px #000;
  max-width: 500px;

  div {
    margin-bottom: 10px;
  }

  .closeModal {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    right: -25px;
    top: -25px;
    background: #111;
    color: #aaa;
    font-size: 1.2rem;
    margin: 5px 5px 0 0;
    border: 1px solid #555;
    cursor: pointer;
  }

  .deleteInfo {
    width: 100%;
    background: #e91e51;
    border: none;
    color: #fff;
    border-radius: 10px;
    padding: 10px;
  }

  .infoNum {
    font-size: 2.5rem;
    font-weight: 700;
  }

  .infoName {
    font-size: 0.9rem;
    font-weight: 700;
    color: #aaa;
  }

  .infoEmoji {
    font-size: 1.3rem;
  }

  .infoContents {
    font-size: 0.85rem;
    margin-bottom: 10px;
  }
}
</style>
