<template>
  <h1>Input view</h1>
  <form @submit.prevent="createObject">
    <input type="text" v-if="step == 0" v-model="emoji" placeholder="이모지" />
    <input type="text" v-if="step == 1" v-model="name" placeholder="이름" />
    <textarea v-if="step == 2" v-model="content" placeholder="설명" />
    <button v-if="step == 2">생성하기</button>
  </form>

  <button @click="prevStep" v-if="step !== 0">이전</button>
  <button @click="nextStep" v-if="step !== 2">다음</button>
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
    const { name, emoji, content, category, activity, create } =
      storeToRefs(store);

    // 폼 전환
    let step = ref(0);
    function prevStep() {
      step.value--;
    }
    function nextStep() {
      step.value++;
    }

    // Activity(활성도) & Category(감정 종류) 얻기
    function createObject() {
      let inputEmoji = [...this.emoji]; // 입력된 이모지를 배열화
      let dataObject = {
        anger: 0,
        fear: 0,
        sadness: 0,
        disgust: 0,
        surprise: 0,
        anticipation: 0,
        trust: 0,
        joy: 0,
        activity: 0,
      }; // data 처리용 오브젝트

      // 인풋된 이모지를 등록된 이모지에서 찾아서 데이터 불러오기
      inputEmoji.forEach((element) => {
        for (let i = 0; i < emojiDoc.length; i++) {
          if (element == emojiDoc[i].emoji) {
            console.log(
              element + "는 " + emojiDoc[i].num + "번째 이모지입니다."
            );
            dataObject.anger += emojiDoc[i].anger;
            dataObject.fear += emojiDoc[i].fear;
            dataObject.sadness += emojiDoc[i].sadness;
            dataObject.disgust += emojiDoc[i].disgust;
            dataObject.surprise += emojiDoc[i].surprise;
            dataObject.anticipation += emojiDoc[i].anticipation;
            dataObject.trust += emojiDoc[i].trust;
            dataObject.joy += emojiDoc[i].joy;
            dataObject.activity += emojiDoc[i].activity;
          }
        }
      });

      // Category 구하기
      const getMax = (dataObject) => {
        return Object.keys(dataObject).filter((x) => {
          return (
            dataObject[x] == Math.max.apply(null, Object.values(dataObject))
          );
        });
      };
      this.category = getMax(dataObject)[0]; // (중복 값 대비) 배열의 가장 앞에 있는 감정을 선택

      // Actibity 구하기
      this.activity = Math.floor(dataObject.activity / inputEmoji.length);
    }

    return {
      store,
      name,
      emoji,
      content,
      category,
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
