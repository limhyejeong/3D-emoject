<template>
  <div>
    <section class="nameInputSection">
      <h3 class="title">이름을 알려주세요</h3>
      <input
        type="text"
        v-model="name"
        class="nameInput"
        placeholder="name"
        autofocus
      />
    </section>

    <router-link to="/contents">다음</router-link>
  </div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  name: "InputView2",
  setup() {
    const store = useInputStore();
    const { name } = storeToRefs(store);

    return { name };
  },
};
</script>

<style lang="scss"></style>
