<template>
  <aside v-show="isClick" class="info">
    <div class="infoNum">{{ seletedData.num }}th Emoject</div>
    <div class="infoName">{{ seletedData.name }}</div>
    <div class="infoEmoji">{{ seletedData.emoji }}</div>
    <p class="infoContent">{{ seletedData.content }}</p>

    <button @click="closeInfo">close</button>
  </aside>

  <Renderer ref="renderer" antialias orbitCtrl resize="window">
    <Stats />
    <Camera
      ref="camera"
      :position="{ x: 0, y: 0, z: 15 }"
      :look-at="{ x: 0, y: 0, z: 0 }"
    />

    <Raycaster ref="raycaster" @click="onClick" />

    <Scene ref="scene" background="#000">
      <AmbientLight :position="{ x: 10, y: 10, z: 10 }" :intensity="0.5" />
      <PointLight :position="{ x: 10, y: 10, z: 10 }" :intensity="0.5" />

      <Sphere
        :ref="setItemRef"
        v-for="sadnessBox in sadness"
        :key="sadnessBox.id"
        :scale="{ x: 1, y: 1, z: 1 }"
        :radius="1"
        :width-segments="16"
        :height-segments="16"
        :position="{
          x: Math.floor(Math.random() * 10 - 5),
          y: Math.floor(Math.random() * 10 - 5),
          z: Math.floor(Math.random() * 10 - 5),
        }"
        @click="boxClick(sadnessBox)"
      >
        <PhongMaterial color="#d88993" />
      </Sphere>

      <Sphere
        :ref="setItemRef"
        v-for="joyBox in joy"
        :key="joyBox.id"
        :scale="{ x: 1, y: 1, z: 1 }"
        :radius="1"
        :width-segments="16"
        :height-segments="16"
        :position="{
          x: Math.floor(Math.random() * 10 - 5),
          y: Math.floor(Math.random() * 10 - 5),
          z: Math.floor(Math.random() * 10 - 5),
        }"
        @click="boxClick(joyBox)"
      >
        <ShaderMaterial
          :props="{
            uniforms: {
              uTime: { value: 0 },
              uSpeed: { value: settings.speed },
              uNoiseDensity: { value: settings.density },
              uNoiseStrength: { value: settings.strength },
              uFrequency: { value: settings.frequency },
              uAmplitude: { value: settings.amplitude },
              uIntensity: { value: settings.intensity },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
          }"
        />
      </Sphere>
    </Scene>
  </Renderer>
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import {
  Renderer,
  Camera,
  Raycaster,
  Scene,
  AmbientLight,
  PointLight,
  Sphere,
  ShaderMaterial,
  PhongMaterial,
} from "troisjs";
import Stats from "troisjs/src/components/misc/Stats";
import * as THREE from "three";
// import { makeNoise4D } from "open-simplex-noise";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import { noise } from "@/assets/js/noise";

export default {
  name: "EmotionSpace",
  components: {
    Renderer,
    Camera,
    Raycaster,
    Scene,
    AmbientLight,
    PointLight,
    Sphere,
    PhongMaterial,
    ShaderMaterial,
    Stats,
  },
  setup() {
    const store = useHomeStore();
    const { cate } = storeToRefs(store);
    const { fetchEmotions } = store;

    let renderer = ref(null);
    let camera = ref(null);
    let scene = ref(null);

    let seletedData = ref("");
    let seletedMesh = null;
    let isClick = ref(false);
    let clock = new THREE.Clock();

    fetchEmotions();

    const joy = cate.value.joy;
    const sadness = cate.value.sadness;
    const surprise = cate.value.surprise;
    const disgust = cate.value.disgust;

    const settings = {
      speed: 0.5,
      density: 1,
      strength: 0.8,
      frequency: 2.0,
      amplitude: 10.0,
      intensity: 1,
    };

    // 오브젝트 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    // 메쉬 클릭 시 정보 표시
    function boxClick(data) {
      if (isClick.value == false) {
        isClick.value = true;
        seletedData.value = data;
      }

      // gsap.to(camera.value.camera.position, {
      //   z: seletedMesh.position.z + seletedMesh.scale.z * 5,
      //   duration: 0.75,
      // });
    }

    let v3 = new THREE.Vector3();
    // 클릭한 메쉬의 정보 가져오기
    function onClick(event) {
      if (isClick.value == false) {
        seletedMesh = event.component.mesh;

        seletedMesh.geometry.positionData = [];
        for (
          let i = 0;
          i < seletedMesh.geometry.attributes.position.count;
          i++
        ) {
          v3.fromBufferAttribute(seletedMesh.geometry.attributes.position, i);
          seletedMesh.geometry.positionData.push(v3.clone());
        }
      }
    }

    // 정보 닫기
    function closeInfo() {
      isClick.value = false;
      // gsap.to(camera.value.camera.position, {
      //   x: 0,
      //   y: 0,
      //   z: 100,
      //   duration: 1,
      // });
    }

    let 진폭 = 6;
    let 반경 = 0.2;
    let 속도 = 0.6;

    onMounted(() => {
      renderer.value.onBeforeRender(() => {
        // itemRefs.forEach((item) => {
        //   item.mesh.rotation.y += 0.01;
        // });
        if (seletedMesh != null) {
          // console.log(seletedMesh);
          // twist();
          twist(seletedMesh, clock, settings);
          // noise(seletedMesh, clock, 진폭, 반경, 속도, v3);
        }
      });
    });

    return {
      seletedData,
      boxClick,
      isClick,
      onClick,
      closeInfo,
      renderer,
      camera,
      scene,
      setItemRef,
      itemRefs,
      joy,
      sadness,
      surprise,
      disgust,
      vertexShader,
      fragmentShader,
      settings,
    };
  },
};
</script>

<style lang="scss">
.info {
  position: absolute;
  padding: 30px;
  background: #171a1f;
  color: #fff;
  border-radius: 10px;
  box-shadow: inset -12px -8px 20px #000;
  // box-shadow: inset 6px 4px 16px #888;
  z-index: 10000;

  .infoNum {
    font-size: 2rem;
    font-weight: 900;
  }

  .infoName {
    font-size: 0.9rem;
  }
}
</style>
