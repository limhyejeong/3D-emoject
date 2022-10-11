<template>
  <div class="render">
    <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 5, y: 5, z: 5 }" />

      <Scene ref="scene" background="#000">
        <AmbientLight :position="{ x: 10, y: 10, z: 10 }" :intensity="0.5" />
        <PointLight :position="{ x: 10, y: 10, z: 10 }" :intensity="1" />

        <!-- <Mesh>
          <GltfModel
            ref="model"
            src="/assets/models/samplerender.glb"
            @load="onReady"
          />
          <MatcapMaterial name="312C34_A2AAB3_61656A_808494" />
          <PhongMaterial color="#ff00ff" />
        </Mesh> -->
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
  TorusKnot,
  Mesh,
  GltfModel,
  AmbientLight,
  PointLight,
  ShaderMaterial,
  PhongMaterial,
  Texture,
  MatcapMaterial,
} from "troisjs";
// import { makeNoise4D } from "open-simplex-noise";
import { vertexShader, fragmentShader, twist } from "@/assets/js/twist";
import * as THREE from "three";
import { noise } from "@/assets/js/noise";
// import { sample } from "@/assets/models/sample.glb";
// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "OutputView",
  components: {
    Renderer,
    Camera,
    Scene,
    TorusKnot,
    Mesh,
    GltfModel,
    AmbientLight,
    PointLight,
    ShaderMaterial,
    PhongMaterial,
    Texture,
    MatcapMaterial,
  },
  setup() {
    // gltf loader
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const matcapTex = textureLoader.load(
      "https://raw.githubusercontent.com/nidorx/matcaps/master/64/3B3C3F_DAD9D5_929290_ABACA8-64px.png"
    );
    let sample;

    gltfLoader.load("./../../../assets/models/sample.gltf", (gltf) => {
      sample = gltf.scene.children[2];
      sample.material = new THREE.MeshMatcapMaterial({
        matcap: matcapTex,
      });
      console.log(sample);
      scene.value.add(sample);
    });

    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;
    const renderer = ref(null);
    const scene = ref(null);
    // const mesh = ref(null);
    // console.log(mesh);

    let sphereRef = ref(null);
    let sphereMesh = null;
    let v3 = new THREE.Vector3();
    let clock = new THREE.Clock();
    let noiseSettings = {
      진폭: 1,
      반경: 0.1,
      속도: 0.5,
    };
    // let isCreated = ref(false);

    const settings = {
      speed: 0.5,
      distortion: 1, //왜곡
      density: 1, //밀도
      strength: 0.5, //힘
      frequency: 1, //빈도 (회전)
      amplitude: 1, //진폭 (회전)
      intensity: 1, //대비
      color: new THREE.Color(0xffffff),
      lightColor: new THREE.Color(0xf9c53a),
      lightDirection: new THREE.Vector3(0.0, 1.0, 0.0),
      brightness: new THREE.Vector3(1.0, 1.0, 1.0),
      contrast: new THREE.Vector3(1.0, 1.0, 1.0),
      oscilation: new THREE.Vector3(0.1, 0.1, 0.1),
      phase: new THREE.Vector3(0.1, 0.1, 0.1),
    };

    function createObj() {
      // createShapes();
      // isCreated.value = true;
      sphereMesh = sample;
      sphereMesh.geometry.positionData = [];
      for (let i = 0; i < sphereMesh.geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(sphereMesh.geometry.attributes.position, i);
        sphereMesh.geometry.positionData.push(v3.clone());
      }
    }

    function onReady(model) {
      // model.scenes[0].children[0].material.type = PhongMaterial;

      console.log(model.scenes[0].children[0].material.type);
      // model.traverse((o) => {
      //   if (o.isMesh) {
      //     // handle both multiple and single materials
      //     const asArray = Array.isArray(o.material) ? o.material : [o.material];
      //     // 0 works for matte materials - change as needed
      //     asArray.forEach((mat) => (mat.metalness = 0));
      //   }
      // });
    }

    onMounted(() => {
      // createObj();
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
      scene,
      sphereRef,
      vertexShader,
      fragmentShader,
      settings,
      createObj,
      noiseSettings,
      onReady,
    };
  },
};
</script>
