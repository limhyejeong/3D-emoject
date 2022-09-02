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

  <TheCanvas />
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
// import { ref, onMounted } from "vue";
import TheCanvas from "./TheCanvas";

export default {
  name: "OutputView",
  components: {
    TheCanvas,
  },
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
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
