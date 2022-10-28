<template>
  <div class="inputview">
    <section class="emojiInputSection">
      <h3 class="title">지금 제가 느끼는 감정은</h3>
      <div class="emojiInputBox">
        <input type="text" v-model="emoji" class="emojiInput" readonly />
        <button class="clearEmojiInput" @click="clearEmojiInput">
          모두 지우기
        </button>
      </div>

      <div class="emojiList">
        <span
          v-for="emoji in emojiDoc"
          :key="emoji.num"
          @click="emojiKeyboard"
          >{{ emoji.emoji }}</span
        >
      </div>
    </section>

    <router-link to="/name">
      <button @click="getEmotionData">다음</button></router-link
    >
  </div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { emojiDoc } from "@/assets/data/emojiDoc";

export default {
  name: "InputView",
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity, create, color } =
      storeToRefs(store);

    // 이모지 클릭시 인풋란에 추가되는 함수
    function emojiKeyboard(event) {
      const emojiInput = document.querySelector(".emojiInput");
      let selectedEmoji = event.target.textContent;
      emojiInput.value += selectedEmoji;
      emoji.value += selectedEmoji;
    }

    // 이모지 인풋 비우기 함수
    function clearEmojiInput() {
      const emojiInput = document.querySelector(".emojiInput");
      emojiInput.value = "";
      emoji.value = "";
    }

    // Activity(활성도) & Category(감정 종류) 얻는 함수
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

      // let colorArr = [];

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

            // Color 구하기
            // colorArr.push(emojiDoc[i].color);
            // let sPick = Math.floor(Math.random() * colorArr.length);
            // color.value = colorArr[sPick];
            // console.log(color.value);
          }
        }
        console.log(dataObject);
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
      emojiDoc,
      color,
      getEmotionData,
      emojiKeyboard,
      clearEmojiInput,
    };
  },
};
</script>

<style lang="scss">
.title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 300;
}
</style>
