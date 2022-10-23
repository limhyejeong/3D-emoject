<template>
  <section class="inputSection">
    <section v-if="step == 0" class="emojiInputSection">
      <h3 class="title">My Emotion is</h3>
      <div class="emojiInputBox">
        <input type="text" v-model="emoji" class="emojiInput" readonly />
        <button class="clearEmojiInput" @click="clearEmojiInput">clear</button>
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

    <section v-if="step == 1" class="nameInputSection">
      <h3 class="title">Name</h3>
      <input
        type="text"
        v-model="name"
        class="nameInput"
        placeholder="name"
        autofocus
      />
    </section>

    <section v-if="step == 1" class="contentsInputSection">
      <h3 class="title">Comment</h3>
      <textarea
        v-model="content"
        class="contentsInput"
        placeholder="contents"
      /><br />
    </section>
  </section>

  <aside class="stepBtns">
    <button @click="nextStep" v-if="step !== 1" class="nextBtn">
      <div></div>
    </button>
    <button v-if="step == 1" @click="getEmotionData" class="createBtn">
      Create
    </button>
    <button @click="prevStep" v-if="step !== 0" class="prevBtn">
      <div></div>
    </button>
  </aside>
</template>

<script>
import { ref } from "vue";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { emojiDoc } from "@/assets/data/emojiDoc";

export default {
  name: "InputView",
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity, create, step, color } =
      storeToRefs(store);
    const { prevStep, nextStep } = store;

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
      nextStep();
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
      emojiDoc,
      color,
      prevStep,
      nextStep,
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
  font-size: 2rem;
  font-weight: 700;
}

.inputSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1000px;

  section {
    width: 100%;
    border-radius: 10px;
    background: var(--section-color);
    box-shadow: 5px 5px 30px #000, inset 5px 5px 20px var(--article-color);

    input {
      width: 100%;
      border: none;
      padding: 20px;
      box-shadow: 5px 5px 10px #000, -5px -5px 10px var(--article-color);
    }
  }
}

.emojiInputSection {
  max-width: 1000px;
  padding: 50px;

  .emojiInputBox {
    display: flex;
    margin: 15px 0 30px;

    .emojiInput {
      font-size: 2rem;
      // max-width: 700px;
      text-align: center;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      height: 50px;
    }

    .clearEmojiInput {
      width: 100px;
      border: none;
      border-left: 1px solid #aaa;
      background: #eee;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      cursor: pointer;
      transition: 0.25s;
      font-size: 1rem;

      &:hover {
        background: #ccc;
      }
    }
  }
}

.emojiList {
  width: 100%;
  // height: 50vh;
  background: var(--article-color);
  font-size: 2.2rem;
  border-radius: 20px;
  // border: 1px solid #111;
  // box-shadow: inset -8px -8px 10px #171922;
  // box-shadow: inset -8px -8px 20px #1c1a24;

  span {
    cursor: pointer;
    transition: 0.2s;
    margin: 10px;

    &:hover {
      opacity: 0.3;
    }
  }
}

.nameInputSection {
  max-width: 500px;
  margin-bottom: 20px;
  padding: 30px;

  .nameInput {
    font-size: 1rem;
    border-radius: 50px;
    margin: 15px 0;
    height: 50px;
  }
}

.contentsInputSection {
  max-width: 500px;
  padding: 30px;

  .contentsInput {
    width: 100%;
    height: 200px;
    border: none;
    border-radius: 20px;
    padding: 20px;
    margin: 15px 0;
    box-shadow: 5px 5px 10px #000, -5px -5px 10px var(--article-color);
  }
}

.stepBtns {
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 30px;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 0 50px;

  button {
    width: 80px;
    height: 80px;
    padding: 20px;
    border: 1px solid var(--main-color);
    border-radius: 50%;
    color: var(--text-color);
    background: linear-gradient(var(--main-color), var(--shadow-color));
    // box-shadow: inset 0px 5px 5px var(--highlight-color),
    //   inset 0px -5px 5px var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      // opacity: 0.75;
      width: 18px;
      height: 18px;
      background-image: url(../assets/arrow.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    &.nextBtn {
      div {
        transform: translateX(2px);
      }
    }

    &.prevBtn {
      div {
        transform: rotate(180deg) translateX(2px);
      }
    }

    &.createBtn {
      width: 150px;
      font-weight: 500;
      font-size: 1rem;
      border-radius: 50px;
    }

    &:hover {
      // background: linear-gradient(var(--shadow-color), var(--main-color));
      // box-shadow: inset 0px 5px 5px var(--background-color),
      //   inset 0px -5px 5px var(--highlight-color);
      background: none;
      box-shadow: none;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      // opacity: 0.5;
    }
  }
}

.creating {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #1a1a23;
  z-index: 10000;
}
</style>
