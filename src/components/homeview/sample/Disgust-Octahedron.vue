<template>
  <div class="render">
    <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 5, y: 5, z: 5 }" />

      <Scene ref="Scene" background="#000">
        <Tube
          ref="sphereRef"
          :detail="5"
          :segment="80"
          :radialSegments="20"
          :position="{ z: 0, y: 0, z: 0 }"
          :scale="{ x: 1, y: 1, z: 1 }"
          :cast-shadow="true"
          :receive-shadow="true"
        >
          <MatcapMaterial name="4A6442_D0AB75_81CD94_181B12" />
        </Tube>
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
  Octahedron,
  AmbientLight,
  PointLight,
  MatcapMaterial,
  Texture,
  Tube,
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
    Octahedron,
    AmbientLight,
    PointLight,
    MatcapMaterial,
    Texture,
    Tube,
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
      진폭: 0.5,
      반경: 1,
      속도: 1,
    };
    // let isCreated = ref(false);

    const settings = {
      speed: 0.5,
      distortion: 1, //왜곡
      density: 3, //밀도
      strength: 0.2, //힘
      frequency: 1, //빈도 (회전)
      amplitude: 1, //진폭 (회전)
      intensity: 2, //대비
      color: new THREE.Color(0x009688),
      lightColor: new THREE.Color(0xa7fa1d),
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
          // noise(sphereMesh, clock, noiseSettings, v3);
          // twist(sphereMesh, clock, settings);
          // sphereMesh.rotation.y += 0.01;
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
