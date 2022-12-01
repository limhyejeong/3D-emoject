<template>
  <div class="homeview">
    <!-- <aside class="dragGuide">
      <span>드래그하거나 클릭해보세요!</span>
    </aside> -->

    <EmotionSpace />

    <router-link to="/emoji" class="moveCreate">
      <button class="moveCreateBtn">
        <img src="@/assets/img/plus.svg" />
      </button>
    </router-link>

    <router-link to="/about" class="moveAboutBtn">About Web Site</router-link>

    <aside class="moveSearchBtn">
      <!-- <router-link to="/search">검색</router-link> -->
    </aside>
  </div>
</template>

<script>
import EmotionSpace from "./EmotionSpace.vue";
import { useInputStore } from "@/stores/input";

export default {
  name: "HomeView",
  components: {
    EmotionSpace,
  },
  setup() {
    const { clearInput } = useInputStore();
    clearInput();
  },
};
</script>

<style lang="scss">
.homeview {
  width: 100%;
  height: 100%;
}

// .dragGuide {
//   width: 100%;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.75);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 10000;

//   span {
//     color: #fff;
//   }
// }

.moveCreate {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
  &:hover {
    margin-left: -30px;
  }

  .moveCreateBtn {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50px;
    // background: var(--point);
    background: linear-gradient(-45deg, var(--point), #ffc107);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    // box-shadow: inset -3px -3px 10px #000, 10px 10px 20px var(--shadow);
    box-shadow: 0px 0px 30px var(--light);

    img {
      width: 15px;
      height: 15px;
      filter: invert(1);
    }
  }
  &:hover .moveCreateBtn {
    // box-shadow: inset 5px 5px 10px #000;
    img {
      opacity: 0.5;
    }
  }

  &:before {
    content: "감정 생성";
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    left: 0;
    width: 70px;
    height: 60px;
    background: var(--background);
    box-shadow: 0px 0px 25px #333;
    border-radius: 60px;
    z-index: 0;
    font-weight: 500;
    color: var(--black);
    transition: 0.25s;
    justify-content: center;
    opacity: 0;
  }
  &:hover:before {
    width: 110px;
    padding-left: 50px;
    opacity: 1;
  }
}

.moveAboutBtn {
  font-family: "YdestreetL";
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: -0.03rem;
  position: absolute;
  left: 0;
  bottom: 0;
  // width: 100px;
  margin: 0 0 50px 50px;
  // text-decoration: underline;
  color: var(--black);
  transition: 0.2s;

  &:hover {
    opacity: 0.5;
  }
}

.moveSearchBtn {
  font-size: 0.9rem;
  position: absolute;
  right: 0;
  top: 0;
  margin: 30px 50px 0 0;
  text-decoration: underline;
}

// 반응형
@media screen and (min-width: 100px) and (max-width: 1500px) {
  // .emojiList {
  //   max-height: 44vh;
  //   span {
  //     font-size: 2.5rem;
  //   }
  // }
}
</style>
