<template>
  <aside class="creating">
    <h1>Creating ...</h1>
  </aside>

  <div class="page">
    <section class="outputView">
      <div class="render">
        <Renderer ref="renderer" antialias orbit-ctrl resize="true">
          <Camera :position="{ x: 0, y: 0, z: 5 }" />

          <Scene ref="Scene" background="#000">
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
              :cast-shadow="true"
              :receive-shadow="true"
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
                    uColor: { value: settings.color },
                    uLightColor: { value: settings.lightColor },
                    uLightDirection: { value: settings.lightDirection },
                    uBrightness: { value: settings.brightness },
                    uContrast: { value: settings.contrast },
                    uOscilation: { value: settings.oscilation },
                    uPhase: { value: settings.phase },
                  },
                  vertexShader: vertexShader,
                  fragmentShader: fragmentShader,
                }"
              >
                <Texture
                  src="/assets/textures/water/Water_COLOR.jpg"
                  uniform="map"
                />
              </ShaderMaterial>
            </Sphere>
          </Scene>
        </Renderer>
      </div>

      <div class="outputInfo">
        <h3>입력 정보</h3>
        <!-- <hr /> -->
        <br />
        <div>Emoji 이모지 : {{ emoji }}</div>
        <div>Name 이름 : {{ name }}</div>
        <div>Content 설명 : {{ content }}</div>
        <br />
        <div>Category 대표 감정 : {{ category }}</div>
        <div>Activity 활발함 : {{ activity }}</div>

        <button @click="clearInput">다시하기</button>
        <button @click="addEmotion(name, emoji, content, category, activity)">
          감정 등록
        </button>
      </div>
    </section>
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
  ShaderMaterial,
  Texture,
} from "troisjs";
// import { makeNoise4D } from "open-simplex-noise";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import * as THREE from "three";
import { noise } from "@/assets/js/noise";
import router from "@/router/index";

// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";

export default {
  name: "OutputView",
  components: {
    Renderer,
    Camera,
    Scene,
    Sphere,
    ShaderMaterial,
    Texture,
  },
  setup() {
    setTimeout(
      () => (document.querySelector(".creating").style.display = "none"),
      2000
    );

    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { addEmotion, clearInput } = store;
    const renderer = ref(null);

    console.log(emoji.value, category.value);

    let sphereRef = ref(null);
    let sphereMesh = null;
    let v3 = new THREE.Vector3();
    let clock = new THREE.Clock();
    let noiseSettings = {
      진폭: 1,
      반경: 0.1,
      속도: 2,
    };

    // 기본 Mesh 세팅
    let settings = {
      speed: 0.5,
      distortion: 0, //왜곡
      density: 0, //밀도
      strength: 0, //힘
      frequency: 0, //빈도
      amplitude: 0, //진폭
      intensity: 0, //대비
      color: new THREE.Color(0xf5a69b),
      lightColor: new THREE.Color(0xffffff),
      lightDirection: new THREE.Vector3(0.0, 1.0, 0.0),
      brightness: new THREE.Vector3(1.0, 1.0, 1.0),
      contrast: new THREE.Vector3(1.0, 1.0, 1.0),
      oscilation: new THREE.Vector3(0.1, 0.1, 0.1),
      phase: new THREE.Vector3(0.1, 0.1, 0.1),
    };

    // 감정에 따른 Mesh 변화
    function transform() {
      if (category.value == "anger") {
        settings = {
          speed: 0.3,
          distortion: 1, //왜곡
          density: 5, //밀도
          strength: 0.5, //힘
          frequency: 5, //빈도 (회전)
          amplitude: 1, //진폭 (회전)
          intensity: 1, //대비
          color: new THREE.Color(0xf93e3a),
          lightColor: new THREE.Color(0xf9c53a),
          brightness: new THREE.Vector3(2, 2, 2),
          contrast: new THREE.Vector3(4, 4, 4),
          oscilation: new THREE.Vector3(0.5, 0.5, 2.0),
          phase: new THREE.Vector3(0.1, 0.1, 0.1),
        };
      } else if (category.value == "fear") {
        settings = {
          speed: 0.3,
          distortion: 1, //왜곡
          density: 10, //밀도
          strength: 1, //힘
          frequency: 1, //빈도 (회전)
          amplitude: 3, //진폭 (회전)
          intensity: 1, //대비
          color: new THREE.Color(0xffc107),
          lightColor: new THREE.Color(0xffffff),
          brightness: new THREE.Vector3(1.0, 1.0, 2.0),
          contrast: new THREE.Vector3(2.0, 1.0, 3.0),
          oscilation: new THREE.Vector3(0.1, 0.1, 0.2),
          phase: new THREE.Vector3(0.1, 0.1, 0.1),
        };
      } else if (category.value == "sadness") {
        settings = {
          speed: 0.5,
          distortion: 1, //왜곡
          density: 5, //밀도
          strength: 0.05, //힘
          frequency: 1, //빈도 (회전)
          amplitude: 1, //진폭 (회전)
          intensity: 25, //대비
          color: new THREE.Color(0x2196f3),
          lightColor: new THREE.Color(0xffffff),
          brightness: new THREE.Vector3(1, 1, 1),
          contrast: new THREE.Vector3(1, 1, 1),
          oscilation: new THREE.Vector3(0.1, 0.1, 0.1),
          phase: new THREE.Vector3(0.1, 0.1, 0.1),
        };
      } else if (category.value == "disgust") {
        settings = {
          speed: 0.5,
          distortion: 1, //왜곡
          density: 3, //밀도
          strength: 0.2, //힘
          frequency: 1, //빈도 (회전)
          amplitude: 1, //진폭 (회전)
          intensity: 2, //대비
          color: new THREE.Color(0xf44336),
          lightColor: new THREE.Color(0xc745fc),
          brightness: new THREE.Vector3(5, 3, 4),
          contrast: new THREE.Vector3(0.3, 0.5, 0.3),
          oscilation: new THREE.Vector3(4, 4, 4),
          phase: new THREE.Vector3(4, 4, 4),
        };
      } else if (category.value == "surprise") {
        settings = {
          speed: 0.1,
          distortion: 1, //왜곡
          density: 10, //밀도
          strength: 0.3, //힘
          frequency: 1, //빈도 (회전)
          amplitude: 1, //진폭 (회전)
          intensity: 1, //대비
          color: new THREE.Color(0x90ceff),
          lightColor: new THREE.Color(0xffffff),
          brightness: new THREE.Vector3(1, 1, 1),
          contrast: new THREE.Vector3(1.5, 1.5, 2),
          oscilation: new THREE.Vector3(0.1, 0.1, 0.1),
          phase: new THREE.Vector3(1, 1, 1),
        };
      } else if (category.value == "anticipation") {
        settings = {
          speed: 0.1,
          distortion: 2, //왜곡
          density: 3, //밀도
          strength: 0.4, //힘
          frequency: 1, //빈도 (회전)
          amplitude: 1, //진폭 (회전)
          intensity: 1, //대비
          color: new THREE.Color(0xccdee9),
          lightColor: new THREE.Color(0xffffff),
          brightness: new THREE.Vector3(1, 1, 1),
          contrast: new THREE.Vector3(1, 1, 1),
          oscilation: new THREE.Vector3(0.1, 0.2, 0.1),
          phase: new THREE.Vector3(0.1, 0.1, 0.1),
        };
      } else if (category.value == "trust") {
        settings = {
          speed: 0.2,
          distortion: 1, //왜곡
          density: 2, //밀도
          strength: 1.5, //힘
          frequency: 1, //빈도 (회전)
          amplitude: 1, //진폭 (회전)
          intensity: 3, //대비
          color: new THREE.Color(0x4caf50),
          lightColor: new THREE.Color(0xcddc39),
          brightness: new THREE.Vector3(3, 3, 3),
          contrast: new THREE.Vector3(0.1, 0.1, 0.1),
          oscilation: new THREE.Vector3(0.2, 0.2, 0.2),
          phase: new THREE.Vector3(0.1, 0.1, 0.1),
        };
      } else if (category.value == "joy") {
        settings = {
          speed: 0.05,
          distortion: 1, //왜곡
          density: 2, //밀도
          strength: 1, //힘
          frequency: 5, //빈도 (회전)
          amplitude: 3, //진폭 (회전)
          intensity: 3, //대비
          color: new THREE.Color(0xf5a69b),
          lightColor: new THREE.Color(0xcc719c),
          brightness: new THREE.Vector3(1, 1, 1),
          contrast: new THREE.Vector3(2, 2, 2),
          oscilation: new THREE.Vector3(0.1, 0.1, 0.1),
          phase: new THREE.Vector3(1, 1, 1),
        };
      }
    }

    function createMesh() {
      transform();
      sphereMesh = sphereRef.value.mesh;
      sphereMesh.geometry.positionData = [];
      for (let i = 0; i < sphereMesh.geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(sphereMesh.geometry.attributes.position, i);
        sphereMesh.geometry.positionData.push(v3.clone());
      }
    }

    onMounted(() => {
      createMesh();
      renderer?.value?.onBeforeRender(() => {
        if (sphereMesh != null) {
          // noise(sphereMesh, clock, noiseSettings, v3);
          twist(sphereMesh, clock, settings);
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
      addEmotion,
      clearInput,
      renderer,
      sphereRef,
      vertexShader,
      fragmentShader,
      settings,
      noiseSettings,
    };
  },
};
</script>

<style lang="scss">
.creating {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: 10000;
}
.outputView {
  width: 100%;
  display: flex;
  // align-items: center;
}
.outputInfo {
  position: absolute;
  right: 0;
  // border: 1px solid #eee;
  width: 40%;
  padding-left: 50px;

  button {
    padding: 0 10px;
  }
}
.render {
  width: 60%;
  height: 90vh;
}
</style>
