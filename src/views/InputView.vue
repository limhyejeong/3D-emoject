<template>
  <h1>Input view</h1>
  <form @submit.prevent="createObject">
    <input type="text" v-if="step == 0" v-model="emoji" placeholder="이모지" />
    <input type="text" v-if="step == 1" v-model="name" placeholder="이름" />
    <button v-if="step == 1">생성하기</button>
  </form>

  <button @click="prevStep" v-if="step !== 0">이전</button>
  <button @click="nextStep" v-if="step !== 1">다음</button>
</template>

<script>
import { ref } from "vue";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { emojiDoc } from "@/assets/data/emojiDoc";

export default {
  name: "InputView",
  components: {},
  setup() {
    const store = useInputStore();
    const { name, emoji, activity, create } = storeToRefs(store);

    // 폼 전환
    let step = ref(0);
    function prevStep() {
      step.value--;
    }
    function nextStep() {
      step.value++;
    }

    function createObject() {
      // getActivity();
      // 값 변경
      // console.log(name, emoji);

      // 입력된 이모지를 배열화 😀😃🥹
      let emoArray = [...this.emoji];

      let avgActivity,
        sumActivity = 0;

      // 인풋된 이모지를 등록된 이모지에서 찾아서 데이터 불러오기
      emoArray.forEach((element) => {
        for (let i = 0; i < emojiDoc.length; i++) {
          if (element == emojiDoc[i].input) {
            console.log("등록됨, " + element + +emojiDoc[i].num);
            sumActivity += emojiDoc[i].activity;
          }
        }
      });

      // 평균 활성도
      avgActivity = Math.floor(sumActivity / emoArray.length);
      this.activity = avgActivity;
      // console.log(sumActivity, avgActivity);

      // store.$patch({
      //   name: this.name,
      //   emoji: this.emoji,
      //   activity: this.activity,
      // });
    }

    return {
      store,
      name,
      emoji,
      activity,
      create,
      step,
      prevStep,
      nextStep,
      createObject,
    };
  },
};
</script>
