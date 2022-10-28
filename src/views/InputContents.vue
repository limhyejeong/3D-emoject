<template>
  <div>
    <section class="nameInputSection">
      <h3 class="title">입력한 감정을 설명해줘</h3>
      <input
        type="text"
        v-model="content"
        class="contentsInput"
        placeholder="contents"
        autofocus
      />
    </section>

    <router-link to="/creating">생성</router-link>
  </div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  name: "InputView3",
  setup() {
    const store = useInputStore();
    const { content } = storeToRefs(store);

    return { content };
  },
};
</script>

<style lang="scss"></style>
