<template>
  <div class="homeview">
    <EmotionSpace />

    <router-link to="/emoji" class="moveCreate">
      <button class="moveCreateBtn">
        <img src="@/assets/plus.svg" />
      </button>
    </router-link>

    <router-link to="/about" class="moveAboutBtn"
      >이 프로젝트에 관하여</router-link
    >

    <aside class="moveSearchBtn">
      <!-- <router-link to="/search">검색</router-link> -->
    </aside>
  </div>
</template>

<script>
import EmotionSpace from "../components/homeview/EmotionSpace.vue";
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
    background: var(--black);
    color: var(--light);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: inset 2px 2px 4px var(--gray1), inset -3px -3px 10px #000,
      10px 10px 20px var(--shadow);
    img {
      width: 15px;
      height: 15px;
    }
  }
  &:hover .moveCreateBtn {
    box-shadow: inset 5px 5px 10px #000, inset -2px -2px 10px var(--gray1);
    img {
      opacity: 0.3;
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
    box-shadow: 5px 5px 20px var(--shadow);
    border-radius: 60px;
    z-index: 0;
    font-weight: 700;
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
  font-size: 0.9rem;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 0 50px 50px;
  text-decoration: underline;
}

.moveSearchBtn {
  font-size: 0.9rem;
  position: absolute;
  right: 0;
  top: 0;
  margin: 30px 50px 0 0;
  text-decoration: underline;
}
</style>
