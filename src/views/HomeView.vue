<template>
  <div class="homeview">
    <EmotionSpace />

    <aside class="moveCreateBtn">
      <router-link to="/create">감정 생성</router-link>
    </aside>

    <aside class="moveAboutBtn">
      <router-link to="/about">이 프로젝트에 관하여</router-link>
    </aside>

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
.moveCreateBtn {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 0;

  a {
    border-radius: 50px;
    // padding: 20px 50px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    transition: 0.25s;
    font-size: 1rem;
    font-weight: 500;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    color: var(--text-color);
    // color: var(--main-color);
    // background: var(--main-color);
    // background: linear-gradient(#ccc, #111);
    // background: linear-gradient(var(--main-color), var(--shadow-color));
    box-shadow: -3px -3px 10px var(--highlight-color),
      10px 10px 20px var(--shadow-color);
    // border: 1px solid var(--main-color);

    &:hover {
      box-shadow: 0px 0px 0px var(--highlight-color),
        0px 0px 0px var(--shadow-color),
        inset -5px -5px 5px var(--highlight-color),
        inset 5px 5px 10px var(--shadow-color);
    }
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
  bottom: 0;
  margin: 0 30px 50px 0;
  text-decoration: underline;
}
</style>
