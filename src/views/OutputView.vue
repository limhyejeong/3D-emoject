<template>
  <div class="info">
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
  </div>

  <div class="render">
    <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 5, y: 5, z: 5 }" />

      <Scene ref="Scene" background="#000">
        <!-- <AmbientLight :position="{ z: 100, y: 1000, z: 100 }" /> -->
        <!-- <PointLight :position="{ z: 100, y: 100, z: 100 }" /> -->
        <AmbientLight :intensity="0.5" />
        <PointLight :position="{ x: 5 }" color="#00BCFF" />
        <PointLight :position="{ y: 5 }" color="#AD0EFF" />
        <PointLight :position="{ z: 5 }" color="#FF0004" />
        <PointLight
          color="#ff6000"
          :intensity="0.75"
          :position="{ y: -5, z: 0 }"
        />

        <Sphere
          ref="sphereRef"
          :position="{ z: 0, y: 0, z: 0 }"
          :width-segments="128"
          :height-segments="128"
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
              src="/assets/textures/water/Water_COLOR.jpg"
              uniform="myCustomTexture"
            />
            <Texture
              src="/assets/textures/water/Water_DISP.png"
              uniform="myCustomTexture2"
            />
            <Texture
              src="/assets/textures/water/Water_NORM.jpg"
              uniform="myCustomTexture3"
            />
            <Texture
              src="/assets/textures/water/Water_OCC.jpg"
              uniform="myCustomTexture4"
            />
            <Texture
              src="/assets/textures/water/Water_SPEC.jpg"
              uniform="myCustomTexture5"
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

    let sphereRef = ref(null);
    let sphereMesh = null;
    let v3 = new THREE.Vector3();
    let clock = new THREE.Clock();
    let noiseSettings = {
      진폭: 1,
      반경: 0.1,
      속도: 1,
    };
    // let isCreated = ref(false);
    const settings = {
      speed: 1,
      distortion: 1, //왜곡
      density: 1, //밀도
      strength: 0.1, //힘
      frequency: 10, //빈도
      amplitude: 1, //진폭
      intensity: 1, //대비
    };

    function createShapes() {
      if (category.value == "sadness") {
        noiseSettings.진폭 = 1;
      }
    }

    function createObj() {
      createShapes();
      // isCreated.value = true;
      sphereMesh = sphereRef.value.mesh;
      sphereMesh.geometry.positionData = [];
      for (let i = 0; i < sphereMesh.geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(sphereMesh.geometry.attributes.position, i);
        sphereMesh.geometry.positionData.push(v3.clone());
      }
    }

    onMounted(() => {
      createObj();
      renderer?.value?.onBeforeRender(() => {
        // if (sphereMesh != null) {
        noise(sphereMesh, clock, noiseSettings, v3);
        twist(sphereMesh, clock, settings);
        sphereMesh.rotation.y += 0.01;
        // }
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
      createObj,
      noiseSettings,
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
