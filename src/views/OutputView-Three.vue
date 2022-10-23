<template>
  <section class="outputView">
    <div class="render">
      <Renderer ref="renderer" antialias orbit-ctrl resize="true">
        <Camera :position="{ x: 0, y: 0, z: 5 }" />
        <Scene ref="scene" background="#fff"></Scene>
      </Renderer>
    </div>

    <div class="outputInfo">
      <br />
      <div class="outputInfoEmoji">{{ emoji }}</div>
      <div class="outputInfoName">{{ name }}</div>
      <div class="outputInfoContent">{{ content }}</div>
      <br />
      <!-- <div class="outputInfoCategory">{{ category }}</div> -->
      <!-- <div class="outputInfoActivity">{{ activity }}</div> -->

      <button @click="clearInput" class="againBtn">Replay</button>
      <button
        @click="addEmotion(name, emoji, content, category, activity)"
        class="addBtn"
      >
        Upload
      </button>
    </div>
  </section>
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
    const store = useInputStore();
    const { name, emoji, content, category, activity, color } =
      storeToRefs(store);
    const { addEmotion, clearInput } = store;
    const renderer = ref(null);
    const scene = ref(null);
    const emojiCount = emoji.value.length / 2;
    console.log(color.value);

    let v3 = new THREE.Vector3();
    let clock = new THREE.Clock();
    let noiseSettings = {
      진폭: 10,
      반경: 0.1,
      속도: 1,
    };

    let colorArr = [
      new THREE.Color(0xf7781a),
      new THREE.Color(0xf2c925),
      new THREE.Color(0x37c8ff),
      new THREE.Color(0x91af00),
      new THREE.Color(0xa98e75),
    ];
    let sPick = Math.floor(Math.random() * colorArr.length);
    console.log(sPick);
    console.log(colorArr[sPick]);

    let geometry, material, mesh, matcapTexture;
    const texLoader = new THREE.TextureLoader(); // 텍스쳐 로더

    function create3D() {
      // Geometry
      if (category.value == "anger") {
        geometry = new THREE.ConeGeometry(1, 2, 128, 128);
        noiseSettings = { 진폭: 1, 반경: 0.2, 속도: 1 };
      } else if (category.value == "fear") {
        geometry = new THREE.SphereGeometry(1, 64, 64);
        noiseSettings = { 진폭: 10, 반경: 0.5, 속도: 1 };
      } else if (category.value == "sadness") {
        geometry = new THREE.TorusGeometry(0.5, 0.3, 64, 64);
        noiseSettings = { 진폭: 3, 반경: 0.5, 속도: 1 };
      } else if (category.value == "disgust") {
        geometry = new THREE.ConeGeometry(1, 1.3, 128, 128);
        noiseSettings = { 진폭: 8, 반경: 0.1, 속도: 1 };
      } else if (category.value == "surprise") {
        geometry = new THREE.TetrahedronGeometry(0.7, 10);
        noiseSettings = { 진폭: 2, 반경: 2, 속도: 1 };
      } else if (category.value == "anticipation") {
        // geometry = new THREE.DodecahedronGeometry(1, 5);
        geometry = new THREE.SphereGeometry(1, 64, 64);
        noiseSettings = { 진폭: 1, 반경: 4, 속도: 1 };
      } else if (category.value == "trust") {
        geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16, 2, 3);
        noiseSettings = { 진폭: 1, 반경: 0.2, 속도: 1 };
      } else if (category.value == "joy") {
        geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 256, 16, 1, 5);

        noiseSettings = { 진폭: 1, 반경: 0.2, 속도: 1 };
      }

      if (emojiCount == 2) {
        matcapTexture = texLoader.load("./assets/textures/matcap/말랑.png");
      } else if (emojiCount == 3) {
        matcapTexture = texLoader.load("./assets/textures/matcap/은은.png");
      } else if (emojiCount == 4) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울.png");
      } else if (emojiCount == 5) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울2.png");
      } else if (emojiCount == 6) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울2.png");
      } else if (emojiCount == 7) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울2.png");
      } else if (emojiCount == 8) {
        matcapTexture = texLoader.load("./assets/textures/matcap/음영.png");
      } else if (emojiCount == 9) {
        matcapTexture = texLoader.load("./assets/textures/matcap/철.png");
      } else if (emojiCount == 10) {
        matcapTexture = texLoader.load("./assets/textures/matcap/페인트.png");
      }

      matcapTexture = texLoader.load("./assets/textures/matcap/은은.png");

      material = new THREE.MeshMatcapMaterial({
        color: colorArr[sPick],
        matcap: matcapTexture,
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.value.scene.add(mesh);
    }

    function createMesh() {
      // transform();
      create3D();
      mesh.geometry.positionData = [];
      for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(mesh.geometry.attributes.position, i);
        mesh.geometry.positionData.push(v3.clone());
      }
    }

    onMounted(() => {
      createMesh();
      renderer?.value?.onBeforeRender(() => {
        if (mesh != null) {
          noise(mesh, clock, noiseSettings, v3);
          // twist(sphereMesh, clock, settings);
          mesh.rotation.y += 0.005;
        }
      });
    });

    return {
      store,
      name,
      emoji,
      content,
      category,
      mesh,
      activity,
      addEmotion,
      clearInput,
      renderer,
      scene,
      color,
      vertexShader,
      fragmentShader,
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
  background: #1a1a23;
  z-index: 10000;
}
.outputView {
  width: 100%;
  display: flex;
  align-items: center;
}
.outputInfo {
  position: absolute;
  right: 0;
  // border: 1px solid #eee;
  width: 40%;
  padding: 0 50px;

  .outputInfoName {
    font-weight: 800;
  }
  .outputInfoEmoji {
    font-size: 3rem;
  }
  .outputInfoContent {
    font-size: 0.85rem;
    color: #aaa;
  }

  button {
    padding: 10px 0;
    width: 100%;
    border-radius: 20px;
    // color: var(--text-color);
    border: none;
    font-weight: 500;

    &:hover {
      background: none;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
  }

  .againBtn {
    background: linear-gradient(var(--article-color), var(--section-color));
    border: 1px solid var(--inactive-color);
    margin: 10px 0;

    &:hover {
      // background: linear-gradient(var(--section-color), var(--article-color));
      // opacity: 0.5;
    }
  }
  .addBtn {
    background: linear-gradient(var(--main-color), var(--shadow-color));
    // box-shadow: inset 0px 5px 5px var(--highlight-color),
    //   inset 0px -5px 5px var(--background-color);
    border: 1px solid var(--main-color);

    &:hover {
      // background: linear-gradient(var(--shadow-color), var(--main-color));
      // box-shadow: inset 0px 5px 5px var(--background-color),
      //   inset 0px -5px 5px var(--highlight-color);
      // opacity: 0.5;
    }
  }
}
.render {
  width: 60%;
  height: 90vh;
}
</style>
