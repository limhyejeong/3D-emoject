<template>
  <hr />
  <h3>Output</h3>
  <div>선택한 이모지 : {{ emoji }}</div>
  <div>이름 : {{ name }}</div>
  <div>설명 : {{ content }}</div>
  <br />
  <div>활성도 : {{ activity }}</div>

  <button @click="createEmotion(name, emoji, content, category, activity)">
    감정 등록
  </button>

  <div>
    <Renderer ref="renderer" antialias orbit-ctrl resize="window">
      <Camera :position="{ x: 50, y: 50, z: 50 }" />

      <Scene background="#fff">
        <PointLight :position="{ z: 100, y: 100, z: 100 }" />

        <Box
          ref="box"
          :scale="{ x: 20, y: 20, z: 20 }"
          :rotation="{
            y: Math.PI / 4,
            z: Math.PI / 4,
          }"
        >
          <PhongMaterial />
        </Box>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { ref } from "vue";

// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";

export default {
  name: "OutputEmotion",
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;

    const renderer = ref(null);
    renderer?.value?.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
      renderer,
      createEmotion,
    };
  },
};
</script>

<style lang="scss">
// canvas {
//   position: inherit;
//   border: 1px solid #999;
// }
</style>
