<template>
  <div class="inputDiv">
    <section class="inputSection">
      <h3 class="title">이름을 알려주세요</h3>
      <p class="description">
        닉네임도 상관 없어요!
        <br />
        등록할 때 필요해요.
      </p>

      <input
        type="text"
        v-model="name"
        class="nameInput"
        ref="nameInput"
        placeholder="홍길동"
        @keypress.enter="enterEvent"
      />

      <!-- <router-link to="/emoji">이모지 다시 선택할래요</router-link> -->
    </section>

    <aside class="emojiSubmitBox">
      <router-link to="/contents">
        <button class="emojiSubmitBtn">입력 완료</button></router-link
      >
    </aside>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  name: "InputName",
  setup() {
    const store = useInputStore();
    const { name } = storeToRefs(store);
    const nameInput = ref(null);

    function focusInput() {
      nameInput.value.focus();
    }

    function enterEvent() {
      // useRouter.push("/contents");
    }

    onMounted(() => {
      focusInput();
    });

    return { nameInput, name, focusInput, enterEvent };
  },
};
</script>

<style lang="scss">
.nameInput {
  width: 100%;
  height: 60px;
  text-align: center;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: inset -1px -1px 5px var(--shadow);

  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: var(--gray2);
  }
}
</style>
