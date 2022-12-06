<template>
  <div class="inputDiv">
    <section class="inputSection">
      <h3 class="title">감정을 이모지로 표현한다면?</h3>
      <p class="description">
        기억에 남는 상황이나 특별한 감정, 특정한 대상을 떠올리면서 이모지를
        선택해주세요.<br />
        ex) 일상 속 느낀 특별한 감정, 과거에 대한 기억, 미래에 대한 희망이나
        불안, 가족이나 사랑하는 사람에 대한 감정 등
      </p>

      <div class="emojiInputBox">
        <input
          type="text"
          v-model="emoji"
          class="emojiInput"
          placeholder="2개에서 10개까지 선택할 수 있어요"
          readonly
        />
        <button class="clearEmojiInput" @click="clearEmojiInput">
          <img src="@/assets/img/plus.svg" alt="" />
        </button>
      </div>

      <div class="emojiList">
        <span
          v-for="emoji in EmojiDoc"
          :key="emoji.num"
          @click="emojiKeyboard"
          >{{ emoji.emoji }}</span
        >
      </div>
      <aside class="emojiSubmitBox">
        <button
          type="submit"
          @click="getEmotionData"
          class="emojiSubmitBtn btnLock"
        >
          선택 완료
        </button>
      </aside>
    </section>
  </div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { EmojiDoc } from "@/assets/data/EmojiDoc";
import router from "@/router/index";

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

    let selectedEmoji = [];

    // emoji 값이 있고 없음에 따라 버튼 색 변경
    watch(emoji, () => {
      if (emoji.value.length > 2) {
        document.querySelector(".emojiSubmitBtn").classList.remove("btnLock");
      } else {
        document.querySelector(".emojiSubmitBtn").classList.add("btnLock");
      }
    });

    // 이모지 클릭시 인풋란에 추가되는 함수
    function emojiKeyboard(event) {
      if (emoji.value.length >= 20) return;
      const emojiInput = document.querySelector(".emojiInput");
      selectedEmoji.push(event.target);
      emojiInput.value += event.target.textContent;
      emoji.value += event.target.textContent;
      event.target.classList.add("entered");
    }

    // 이모지 인풋 비우기 함수
    function clearEmojiInput() {
      const emojiInput = document.querySelector(".emojiInput");
      emojiInput.value = "";
      emoji.value = "";
      selectedEmoji.forEach((span) => {
        span.classList.remove("entered");
      });
      selectedEmoji = [];
    }

    // Activity(활성도) & Category(감정 종류) 얻는 함수
    function getEmotionData() {
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
        for (let i = 0; i < EmojiDoc.length; i++) {
          if (element == EmojiDoc[i].emoji) {
            // console.log(
            //   element + "는 " + EmojiDoc[i].num + "번째 이모지입니다."
            // );
            dataObject.anger += EmojiDoc[i].anger;
            dataObject.fear += EmojiDoc[i].fear;
            dataObject.sadness += EmojiDoc[i].sadness;
            dataObject.disgust += EmojiDoc[i].disgust;
            dataObject.surprise += EmojiDoc[i].surprise;
            dataObject.anticipation += EmojiDoc[i].anticipation;
            dataObject.trust += EmojiDoc[i].trust;
            dataObject.joy += EmojiDoc[i].joy;
            sumActivity += EmojiDoc[i].activity;

            // Color 구하기
            colorArr.push(EmojiDoc[i].color);
          }
        }
        // console.log(dataObject);
      });

      let sPick = Math.floor(Math.random() * colorArr.length);
      color.value = colorArr[sPick];
      // console.log(color.value);

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

      router.push("/name");
    }

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
      create,
      EmojiDoc,
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
  // width: 1130px;
  width: 1000px;
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
      color: var(--gray1);
    }
  }

  .clearEmojiInput {
    position: absolute;
    width: 25px;
    height: 25px;
    transform: rotate(45deg);
    right: 0;
    border: none;
    background: none;
    margin-right: 30px;
    opacity: 0.4;

    img {
      filter: invert(1);
    }

    &:hover {
      opacity: 0.7;
    }
  }
}

.emojiList {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 20px;
  grid-gap: 20px;
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
    // padding: 20px;
    font-size: 3rem;
    cursor: pointer;
    text-align: center;

    &:hover {
      opacity: 0.2;
    }

    &.entered {
      opacity: 0.1;
      pointer-events: none;
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

    &.btnLock {
      background: #555;
      pointer-events: none;
    }
  }
}

@media screen and (min-width: 100px) and (max-width: 860px) {
  .inputDiv {
    padding: 70px 0;
    .inputSection {
      width: 100%;
      padding: 0 20px;
    }
  }
  .title {
    font-size: 1.2rem;
  }
  p.description {
    font-size: 0.75rem;
    font-weight: 500;
  }
  .emojiInputBox {
    .emojiInput {
      font-size: 1.5rem;
      height: 45px;
      &::placeholder {
        font-size: 0.8rem;
      }
    }
    .clearEmojiInput {
      width: 20px;
      height: 20px;
    }
  }
  .emojiList {
    // max-height: 40vh;
    grid-template-columns: repeat(5, 1fr);
    padding: 10px;
    span {
      // padding: 15px;
      font-size: 2.3rem;
    }
  }
}

@media screen and (min-height: 100px) and (max-height: 700px) {
  .emojiList {
    max-height: 40vh;
  }
}
</style>
