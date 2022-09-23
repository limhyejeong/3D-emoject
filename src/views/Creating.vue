<template>
  <h1>Creating ...</h1>
  <div>선택한 이모지 : {{ emoji }}</div>
  <div>이름 : {{ name }}</div>
  <div>설명 : {{ content }}</div>
  <br />
  <div>감정 : {{ category }}</div>
  <div>활성도 : {{ activity }}</div>
  <hr />

  <!-- <router-link to="/output">아웃풋으로 보내기</router-link> -->
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  // name: "Creating",
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
    };
  },
};
</script>

<style lang="scss"></style>
