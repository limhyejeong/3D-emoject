<template>
  <form class="inputDiv">
    <section class="inputSection">
      <h3 class="title">감정을 설명해주세요</h3>
      <p class="description">
        이모지를 선택하며 떠올렸던 감정을 설명해주세요.
        <br />
        입력하지 않으면 비밀로 처리돼요.
      </p>
      <input
        type="text"
        v-model="content"
        class="contentsInput"
        ref="contentsInput"
        placeholder="기억나는 순간의 감정"
        required
      />

      <!-- <router-link to="/name">이름 다시 입력할래요</router-link> -->
    </section>

    <aside class="emojiSubmitBox">
      <router-link to="/creating">
        <button type="submit" class="emojiSubmitBtn">
          감정 생성
        </button></router-link
      >
    </aside>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  name: "InputContents",
  setup() {
    const store = useInputStore();
    const { content } = storeToRefs(store);
    const contentsInput = ref(null);

    function focusInput() {
      contentsInput.value.focus();
    }

    onMounted(() => {
      focusInput();
    });

    return { contentsInput, content, focusInput };
  },
};
</script>

<style lang="scss">
.contentsInput {
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 20px;
  font-size: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: inset -2px -2px 5px var(--shadow), 3px 3px 10px var(--shadow);

  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: var(--gray1);
  }
}

@media screen and (min-width: 100px) and (max-width: 860px) {
  .contentsInput {
    height: 120px;
  }
}
</style>
