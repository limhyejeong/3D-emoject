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

      <Scene ref="Scene" background="#fff">
        <!-- <AmbientLight :position="{ z: 100, y: 1000, z: 100 }" /> -->
        <PointLight :position="{ z: 100, y: 100, z: 100 }" />

        <Sphere
          ref="sphereRef"
          :position="{ z: 0, y: 0, z: 0 }"
          :scale="{ x: 1, y: 1, z: 1 }"
          :rotation="{
            y: Math.PI / 4,
            z: Math.PI / 4,
          }"
        >
          <PhongMaterial />
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
  PointLight,
  PhongMaterial,
} from "troisjs";
import { makeNoise4D } from "open-simplex-noise";

// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";

export default {
  name: "OutputView",
  components: { Renderer, Camera, Scene, Sphere, PointLight, PhongMaterial },
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;

    const renderer = ref(null);
    const scene = ref(null);
    // renderer?.value?.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // const sphereRef = ref(null).sphere.mesh;
    const sphereRef = ref(null);

    console.log(renderer);

    // 오브젝트 배열
    // let spheres;
    // const sphereRef = (el) => {
    //   console.log(el.value);
    //   // spheres = el;
    // };

    console.log(sphereRef.value._value);

    onMounted(() => {
      // renderer?.value?.onBeforeRender(() => {
      //   spheres.forEach((sphere) => {
      //     sphere.mesh.rotation.y += 0.01;
      //   });
      // });
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
