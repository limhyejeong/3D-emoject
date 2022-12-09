<template>
  <div class="checkPassBack">
    <div class="checkPassModal outputInfo" v-show="isDelete">
      삭제를 위해 암호를 입력해주세요.
      <br />
      <input
        type="password"
        class="checkPassword"
        ref="checkDelPassword"
        autofocus
      />
      <button
        @click="
          deleteEmotion(
            checkDelPassword.value,
            this.selectedData.password,
            this.selectedData.id
          );
          checkDelPassword.value = '';
        "
        class="passDeleteBtn"
      >
        감정 삭제
      </button>
      <button
        @click="
          isDelete = false;
          checkDelPassword.value = '';
        "
        class="passCloseBtn"
      >
        닫기
      </button>
    </div>

    <div class="checkPassModal outputInfo" v-show="isSave">
      등록을 위해 암호를 입력해주세요.<br />
      <span>타인이 삭제하는 것을 방지하기 위함이에요. </span>
      <br />
      <input
        type="password"
        class="checkPassword"
        ref="checkSavePassword"
        required
        autofocus
      />
      <button
        @click="savePassword(checkSavePassword.value)"
        class="passSaveBtn"
      >
        감정 등록
      </button>
      <button
        @click="
          isSave = false;
          checkSavePassword.value = '';
        "
        class="passCloseBtn"
      >
        닫기
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useHomeStore } from "@/stores/home";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  name: "CheckPassword",
  props: ["selectedData"],
  setup() {
    const homeStore = useHomeStore();
    const { emotions, isDelete } = storeToRefs(homeStore);
    const { deleteEmotion } = homeStore;

    const inputStore = useInputStore();
    const { isSave } = storeToRefs(inputStore);
    const { addEmotion } = inputStore;

    let checkDelPassword = ref(null);
    let checkSavePassword = ref(null);

    function savePassword(password) {
      if (password == "") return;
      addEmotion(password);
    }

    return {
      emotions,
      isDelete,
      isSave,
      checkDelPassword,
      checkSavePassword,
      deleteEmotion,
      addEmotion,
      savePassword,
    };
  },
};
</script>

<style lang="scss">
.checkPassBack {
  position: fixed;
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
    padding: 10px;
    border: 1px solid var(--background);
  }
  .passDeleteBtn {
    background: linear-gradient(0deg, #e91e4b, #ff4a4a);
  }
  .passSaveBtn {
    color: var(--shadow);
    background: linear-gradient(0, var(--point), #ffc107);
  }
  .passCloseBtn {
    background: linear-gradient(0deg, #262626, #616161);
  }

  span {
    color: #777;
    font-size: 0.7rem;
    margin-top: 10px;
  }
}
</style>
