<template>
  <hr />
  <h3>Output</h3>
  <div>선택한 이모지 : {{ emoji }}</div>
  <div>이름 : {{ name }}</div>
  <div>설명 : {{ content }}</div>
  <br />
  <div>감정 : {{ category }}</div>
  <div>활성도 : {{ activity }}</div>

  <button @click="createObj">Hi</button>

  <button @click="createEmotion(name, emoji, content, category, activity)">
    감정 등록
  </button>

  <div class="render">
    <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 5, y: 5, z: 5 }" />

      <Scene ref="Scene" background="#000">
        <!-- <AmbientLight :position="{ z: 100, y: 1000, z: 100 }" /> -->
        <!-- <PointLight :position="{ z: 100, y: 100, z: 100 }" /> -->
        <AmbientLight :intensity="0.5" />
        <PointLight :position="{ y: 50, z: 0 }" />
        <PointLight
          color="#ff6000"
          :intensity="0.75"
          :position="{ y: -50, z: 0 }"
        />

        <Sphere
          ref="sphereRef"
          :position="{ z: 0, y: 0, z: 0 }"
          :width-segments="64"
          :height-segments="64"
          :scale="{ x: 1, y: 1, z: 1 }"
          :rotation="{
            y: Math.PI / 4,
            z: Math.PI / 4,
          }"
        >
          <ShaderMaterial
            :props="{
              uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: settings.speed },
                uDistortion: { value: 0 },
                uNoiseDensity: { value: settings.density },
                uNoiseStrength: { value: settings.strength },
                uFrequency: { value: settings.frequency },
                uAmplitude: { value: settings.amplitude },
                uIntensity: { value: settings.intensity },
              },
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
            }"
          >
            <Texture
              src="/assets/textures/stone_alabaster.jpg"
              uniform="myCustomTexture"
            />
          </ShaderMaterial>
        </Sphere>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import {
  Renderer,
  Camera,
  Scene,
  Sphere,
  AmbientLight,
  PointLight,
  ShaderMaterial,
  Texture,
} from "troisjs";
// import { makeNoise4D } from "open-simplex-noise";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import * as THREE from "three";
import { noise } from "@/assets/js/noise";
// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";

export default {
  name: "OutputView",
  components: {
    Renderer,
    Camera,
    Scene,
    Sphere,
    AmbientLight,
    PointLight,
    ShaderMaterial,
    Texture,
  },
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;

    const renderer = ref(null);
    const scene = ref(null);

    let sphereRef = ref(null);
    let sphereMesh = null;
    let v3 = new THREE.Vector3();
    let clock = new THREE.Clock();
    let 진폭 = 6;
    let 반경 = 0.2;
    let 속도 = 0.6;

    const settings = {
      speed: 0.5,
      distortion: 1, //왜곡
      density: 1, //밀도
      strength: 0.2, //힘
      frequency: 1.0, //빈도
      amplitude: 10, //진폭
      intensity: 4, //대비
    };

    // renderer?.value?.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    function init() {
      sphereMesh = sphereRef.value.mesh;
      sphereMesh.geometry.positionData = [];
      for (let i = 0; i < sphereMesh.geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(sphereMesh.geometry.attributes.position, i);
        sphereMesh.geometry.positionData.push(v3.clone());
      }
    }

    onMounted(() => {
      init();
      renderer?.value?.onBeforeRender(() => {
        // noise(sphereMesh, clock, 진폭, 반경, 속도, v3);
        twist(sphereMesh, clock, settings);
        // sphereRef.value.mesh.rotation.y += 0.01;
      });
    });

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
      createEmotion,
      renderer,
      sphereRef,
      vertexShader,
      fragmentShader,
      settings,
    };
  },
};
</script>

<style lang="scss">
canvas {
  position: inherit;
  border: 1px solid #999;
}
</style>
