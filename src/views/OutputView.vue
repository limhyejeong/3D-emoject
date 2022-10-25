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

      <button @click="clearInput" class="againBtn">다시 하기</button>
      <button
        @click="addEmotion(name, emoji, content, category, activity)"
        class="addBtn"
      >
        감정 등록
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
import { createEmoject } from "@/assets/js/createEmoject";

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

    let mesh;

    function createMesh() {
      mesh = createEmoject(mesh, category.value, activity.value);
      scene.value.scene.add(mesh);
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
