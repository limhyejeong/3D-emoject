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
    <!-- <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 50, y: 50, z: 50 }" />

      <Scene ref="Scene" background="#fff">
        <PointLight :position="{ z: 100, y: 100, z: 100 }" />

        <Box
          ref="Box"
          :scale="{ x: 20, y: 20, z: 20 }"
          :rotation="{
            y: Math.PI / 4,
            z: Math.PI / 4,
          }"
        >
          <PhongMaterial />
        </Box>

        <Sphere
          ref="Sphere"
          :position="{ z: 10, y: 10, z: 10 }"
          :scale="{ x: 10, y: 10, z: 10 }"
          :rotation="{
            y: Math.PI / 4,
            z: Math.PI / 4,
          }"
        >
          <PhongMaterial />
        </Sphere>
      </Scene>
    </Renderer> -->
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
  PointLight,
  Box,
  PhongMaterial,
} from "troisjs";
// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";

export default {
  name: "OutputView",
  components: { Renderer, Camera, Scene, PointLight, Box, PhongMaterial },
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;

    const renderer = ref(null);
    const scene = ref(null);
    // renderer?.value?.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // const obj = ref(null);
    // const box = ref(null);
    // const sphere = ref(null);
    // console.log(box, sphere);

    let mesh = "";

    function createObj() {
      // if (category.value == "joy") {
      //   mesh = "Box";
      // } else {
      //   mesh = "Sphere";
      // }
      // console.log(category.value);
      // console.log(mesh);
      // let ren = document.createElementNS("Renderer");
      // ren.setAttribute("ref", "renderer");
      // ren.setAttribute("resize", "window");
      // let cam = document.createElementNS("Camera");
      // cam.setAttribute(":position", "{ x: 50, y: 50, z: 50 }");
      // ren.append(cam);
      // let meshObj = document.createElement(mesh);
      // meshObj.setAttribute(":scale", "{ x: 20, y: 20, z: 20 }");
      // meshObj.setAttribute(":position", "{ z: 100, y: 100, z: 100 }");
      // console.log(meshObj);
      // let renderDiv = document.querySelector(".render");
      // renderDiv.append(ren);
      // scene.value.append(meshObj);
    }

    onMounted(() => {
      renderer?.value?.onBeforeRender(() => {
        // obj.value.mesh.rotation.x += 0.01 * activity.value;
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
      createObj,
      // obj,
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
