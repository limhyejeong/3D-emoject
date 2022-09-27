<template>
  <section class="inputSection">
    <section v-if="step == 0" class="emojiInputSection">
      <h3 class="title">My Emotion is</h3>
      <input type="text" v-model="emoji" class="emojiInput" />

      <div class="emojiList">
        <span @click="emojiKeyboard">😃</span>
        <span @click="emojiKeyboard">😄</span>
        <span @click="emojiKeyboard">😁</span>
        <span @click="emojiKeyboard">😆</span>
        <span @click="emojiKeyboard">😅</span>
        <span @click="emojiKeyboard">🤣</span>
        <span @click="emojiKeyboard">😂</span>
        <span @click="emojiKeyboard">🙂</span>
        <span @click="emojiKeyboard">🙃</span>
        <span @click="emojiKeyboard">🤢</span>
        <span @click="emojiKeyboard">🤧</span>
      </div>
    </section>

    <section v-if="step == 1" class="nameInputSection">
      <h3 class="title">My Name is</h3>
      <input type="text" v-model="name" class="nameInput" placeholder="name" />
    </section>

    <section v-if="step == 2" class="contentInputSection">
      <h3 class="title">Comment about your Emotion</h3>
      <textarea
        v-model="content"
        class="contentsInput"
        placeholder="contents"
      /><br />
    </section>
  </section>

  <aside class="stepBtns">
    <button @click="prevStep" v-if="step !== 0" class="prevStep">Prev</button>
    <button @click="nextStep" v-if="step !== 2" class="nextStep">next</button>
    <button v-if="step == 2" @click="getEmotionData">Create</button>
  </aside>
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

    // 폼 전환 변수(step) 및 함수
    let step = ref(0);
    function prevStep() {
      step.value--;
    }
    function nextStep() {
      step.value++;
    }

    // 이모지 클릭시 인풋란에 추가되는 함수
    function emojiKeyboard(event) {
      const emojiInput = document.querySelector(".emojiInput");
      let selectedEmoji = event.target.textContent;
      emojiInput.value += selectedEmoji;
      emoji.value += selectedEmoji;
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
      emojiKeyboard,
    };
  },
};
</script>

<style lang="scss">
.title {
  font-size: 2rem;
  font-weight: 700;
}
.inputSection {
  // display: flex;
  // width: 300vw;
  height: 100%;

  section {
    width: 100vw;
    // height: 100%;

    input {
      width: 300px;
      height: 50px;
      border: none;
      border-radius: 50px;
      padding: 20px;
      // background: #383d46;
      // color: #fff;
      // box-shadow: inset -8px -8px 10px #171922;
    }

    .emojiInput {
      font-size: 2rem;
      width: 100%;
    }

    .emojiList {
      width: 100%;
      height: 50vh;
      background: #666;
      font-size: 3rem;

      span {
        cursor: pointer;
      }
    }

    .nameInput {
      font-size: 1.5rem;
    }
    .contentsInput {
      width: 500px;
      height: 300px;
      border: none;
      border-radius: 20px;
      padding: 20px;
    }
  }
}
.stepBtns {
  position: absolute;
  width: 100%;
  bottom: 0;
  // border-top: 1px solid #eee;

  button {
    background: #363c46;
    // background: #8476f0;
    color: #fff;
    width: 80px;
    height: 80px;
    padding: 20px;
    border: none;
    border-radius: 50%;
    font-weight: 600;
    box-shadow: inset -8px -8px 10px #1c1a24;
    // box-shadow: inset -8px -8px 10px #1c2ab5;
    cursor: pointer;
    transition: 0.25s;
  }

  :hover {
    background: #1c1a24;
    box-shadow: inset 8px 8px 10px #363c46;
  }
}
</style>
