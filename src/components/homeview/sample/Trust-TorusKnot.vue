<template>
  <div class="render">
    <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 5, y: 5, z: 5 }" />

      <Scene ref="Scene" background="#000">
        <PointLight color="#ffffff" :intensity="0.5" />

        <TorusKnot
          ref="sphereRef"
          :position="{ z: 0, y: 0, z: 0 }"
          :radius="1"
          :tube="0.3"
          :tubularSegments="256"
          :radialSegments="64"
          :p="2"
          :q="3"
          :scale="{ x: 1, y: 1, z: 1 }"
          :rotation="{
            y: Math.PI / 4,
            z: Math.PI / 4,
          }"
          :cast-shadow="true"
          :receive-shadow="true"
        >
          <!-- <PhongMaterial color="#ffffff" /> -->
          <MatcapMaterial name="17395A_7EBCC7_4D8B9F_65A1B5" />
        </TorusKnot>
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
  TorusKnot,
  AmbientLight,
  PointLight,
  MatcapMaterial,
  Texture,
  PhongMaterial,
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
    TorusKnot,
    AmbientLight,
    PointLight,
    MatcapMaterial,
    Texture,
    PhongMaterial,
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
      진폭: 1.2,
      반경: 0.5,
      속도: 1,
    };
    // let isCreated = ref(false);

    const settings = {
      speed: 0.2,
      distortion: 1, //왜곡
      density: 2, //밀도
      strength: 1.5, //힘
      frequency: 1, //빈도 (회전)
      amplitude: 1, //진폭 (회전)
      intensity: 3, //대비
      color: new THREE.Color(0x4caf50),
      lightColor: new THREE.Color(0xcddc39),
      lightDirection: new THREE.Vector3(0.0, 1.0, 0.0),
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
        if (sphereMesh != null) {
          noise(sphereMesh, clock, noiseSettings, v3);
          // twist(sphereMesh, clock, settings);
          sphereMesh.rotation.y += 0.01;
        }
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
