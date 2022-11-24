<template>
  <div class="inputDiv">
    <section class="inputSection">
      <h3 class="title">감정을 이모지로 표현한다면?</h3>
      <p class="description">
        기억에 남는 상황이나 특별한 감정, 특정한 대상을 떠올리면서 이모지를
        선택해주세요.<br />
        지금의 감정을 표현하는 것도 좋아요.
      </p>

      <div class="emojiInputBox">
        <input
          type="text"
          v-model="emoji"
          class="emojiInput"
          placeholder="2개에서 10개까지 선택할 수 있어요"
        />
        <button class="clearEmojiInput" @click="clearEmojiInput">
          <img src="@/assets/plus.svg" alt="" />
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

    <aside class="emojiSubmitBox">
      <router-link to="/name">
        <button @click="getEmotionData" class="emojiSubmitBtn">
          선택 완료
        </button></router-link
      >
    </aside>
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
    const {
      name,
      emoji,
      content,
      category,
      activity,
      create,
      categoryData,
      color,
    } = storeToRefs(store);

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

      let colorArr = [];

      // 인풋된 이모지를 등록된 이모지에서 찾아서 데이터 불러오기
      inputEmoji.forEach((element) => {
        for (let i = 0; i < emojiDoc.length; i++) {
          if (element == emojiDoc[i].emoji) {
            // console.log(
            //   element + "는 " + emojiDoc[i].num + "번째 이모지입니다."
            // );
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
            colorArr.push(emojiDoc[i].color);
          }
        }
        // console.log(dataObject);
      });

      let sPick = Math.floor(Math.random() * colorArr.length);
      color.value = colorArr[sPick];
      console.log(color.value);

      // Category 구하기 (카테고리 합계 오브젝트에서 가장 높은 수를 중복값을 대비하여 배열로 생성)
      const getMax = (dataObject) => {
        return Object.keys(dataObject).filter((x) => {
          return (
            dataObject[x] == Math.max.apply(null, Object.values(dataObject))
          );
        });
      };
      categoryData.value = dataObject;
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
.inputDiv {
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 130px 0;
}

.title {
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.15rem;
}

p.description {
  // font-size: 0.9rem;
  line-height: 1.5rem;
  font-weight: 300;
  padding: 10px 0 20px;
  color: var(--gray1);
}

.inputSection {
  width: 1130px;
}

.emojiInputBox {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .emojiInput {
    width: 100%;
    height: 60px;
    text-align: center;
    border-radius: 50px;
    border: none;
    outline: none;
    font-size: 2rem;
    box-shadow: inset -1px -1px 5px var(--shadow);

    &::placeholder {
      font-size: 1rem;
      font-weight: 500;
      color: var(--gray2);
    }
  }

  .clearEmojiInput {
    position: absolute;
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    right: 0;
    border: none;
    background: none;
    margin-right: 15px;
    opacity: 0.3;

    img {
      filter: invert(1);
    }

    &:hover {
      opacity: 0.7;
    }
  }
}

.emojiList {
  width: 100%;
  height: auto;
  max-height: 55vh;
  background: linear-gradient(135deg, var(--light), var(--background));
  box-shadow: -2px -2px 5px #535353, inset -2px -2px 5px #000,
    10px 10px 50px var(--shadow);

  overflow: scroll;
  border-radius: 20px;
  margin: 20px 0;
  padding: 20px;

  span {
    padding: 20px;
    font-size: 3rem;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      opacity: 0.2;
    }
  }
}

.emojiSubmitBox {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  // margin-bottom: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  .emojiSubmitBtn {
    width: 100vw;
    height: 80px;
    // background: var(--black);
    border: none;
    color: var(--light);
    font-weight: 600;
    letter-spacing: -0.1rem;
    font-size: 1.1rem;
    background: linear-gradient(0, var(--point), #ffc107);
    // box-shadow: inset 1px 1px 5px var(--light), inset -5px -5px 10px #000;
    // padding: 30px 0;
    // border-radius: 7px;
  }
}
</style>
