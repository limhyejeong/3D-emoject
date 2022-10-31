<template>
  <!-- <div class="meshInfo">{{ selectedData.emoji }}</div> -->
  <aside v-show="isClick" class="infoModal">
    <div class="infoName">{{ selectedData.name }} 님의 11번째 감정</div>
    <div class="infoNum">{{ selectedData.emoji }}</div>
    <p class="infoContents">{{ selectedData.contents }}</p>

    <button @click="closeModal" class="closeModal">x</button>
    <button @click="deleteEmotion(selectedData.id)" class="deleteInfo">
      Delete{{ selectedData.id }}
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
import {
  createEmoject,
  noiseSettings,
  noiseAnimation,
} from "@/assets/js/createEmoject";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import { logEvent } from "@firebase/analytics";
import { PreventDragClick } from "@/assets/js/PreventDragClick";

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
      let range = 5; // 위치 범위
      emoject.position.x = Math.floor(Math.random() * (range * 2) - range);
      emoject.position.y = Math.floor(Math.random() * (range * 2) - range);
      emoject.position.z = Math.floor(Math.random() * (range * 2) - range);
      emoject.rotation.x = Math.random() * 360;
      emoject.rotation.y = Math.random() * 360;
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
      if (isClick.value == false) {
        controls.autoRotate = true;
      } else {
        controls.autoRotate = false;
      }
      for (let i = 0; i < group.children.length; i++) {
        noiseAnimation(group.children[i], group.children[i].userData[1]);
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
.infoModal {
  position: absolute;
  right: 0;
  margin: 50px 50px 0 0;
  padding: 50px;
  background: var(--background);
  color: #fff;
  border-radius: 10px;
  box-shadow: -3px -3px 5px var(--light), inset -2px -2px 5px var(--shadow),
    5px 5px 20px var(--shadow);
  z-index: 100;
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
