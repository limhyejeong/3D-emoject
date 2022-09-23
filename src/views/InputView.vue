<template>
  <h5>Input view</h5>
  <input type="text" v-if="step == 0" v-model="emoji" placeholder="이모지" />
  <input type="text" v-if="step == 1" v-model="name" placeholder="이름" />
  <textarea v-if="step == 2" v-model="content" placeholder="설명" /><br />

  <button @click="prevStep" v-if="0 < step && step < 3">이전</button>
  <button @click="nextStep" v-if="step < 2">다음</button>

  <button v-if="step == 2" @click="getEmotionData">감정 데이터 계산하기</button>
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
    function getEmotionData() {
      // nextStep();
      let inputEmoji = [...this.emoji]; // 입력된 이모지를 배열화
      let dataObject = {
        // data 처리용 오브젝트
        anger: 0,
        fear: 0,
        sadness: 0,
        disgust: 0,
        surprise: 0,
        anticipation: 0,
        trust: 0,
        joy: 0,
      };
      let sumActivity = 0; // 활성도 합계

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
            sumActivity += emojiDoc[i].activity;
          }
        }
      });

      // Category 구하기 (카테고리 합계 오브젝트에서 가장 높은 수를 중복값을 대비하여 배열로 생성)
      const getMax = (dataObject) => {
        return Object.keys(dataObject).filter((x) => {
          return (
            dataObject[x] == Math.max.apply(null, Object.values(dataObject))
          );
        });
      };
      category.value = getMax(dataObject)[0]; // 최대값 구하기
      activity.value = Math.floor(sumActivity / inputEmoji.length); // Actibity 구하기 (활성도 합계 / 이모지 수)
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
      getEmotionData,
    };
  },
};
</script>
