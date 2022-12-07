<template>
  <div class="checkPassBack">
    <div class="checkPassModal outputInfo">
      삭제를 위해 암호를 입력해주세요.<br />
      <input type="password" class="checkPassword" ref="checkPassword" />
      <button
        @click="
          deleteEmotion(checkPassword, selectedData.password, selectedData.id)
        "
        class="passDeleteBtn"
      >
        감정 삭제
      </button>
      <button @click="isDelete = false" class="passCloseBtn">닫기</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";

export default {
  name: "CheckPassword",
  props: ["selectedData"],
  setup() {
    const store = useHomeStore();
    const { emotions, isDelete } = storeToRefs(store);
    const { deleteEmotion } = store;
    let checkPassword = ref(null);

    return {
      emotions,
      isDelete,
      checkPassword,
      deleteEmotion,
    };
  },
};
</script>

<style lang="scss">
.checkPassBack {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  font-size: 0.8rem;

  .checkPassModal {
    padding: 30px;
    .checkPassword {
      width: 100%;
      height: 1.5rem;
      margin: 10px 0 20px;
      text-align: center;
      border: none;
      border-radius: 3px;
      font-family: sans-serif;
    }
  }

  button {
    width: 50%;
    font-weight: 500;
    border-radius: 5px;
    color: var(--black);
    border: 1px solid var(--background);
  }
  .passDeleteBtn {
    padding: 10px;
    background: linear-gradient(0deg, #e91e4b, #ff4a4a);
  }
  .passCloseBtn {
    padding: 10px;
    background: linear-gradient(0deg, #262626, #616161);
  }
}
</style>
