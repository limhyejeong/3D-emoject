<template>
  <EmotionSpace />

  <aside class="moveCreateBtn">
    <router-link to="/create">Add +</router-link>
  </aside>

  <aside class="moveAboutBtn">
    <router-link to="/about">About</router-link>
  </aside>
</template>

<script>
import EmotionSpace from "../components/homeview/EmotionSpace.vue";
import { useInputStore } from "@/stores/input";

// import { useHomeStore } from "@/stores/home";
// import { storeToRefs } from "pinia";
// import emoColRef from "../firebase";
// import { getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "HomeView",
  components: {
    EmotionSpace,
  },
  setup() {
    const store = useInputStore();
    const { clearInput } = store;

    clearInput();

    return {
      clearInput,
    };
  },
};
</script>

<style lang="scss">
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
    // -webkit-backdrop-filter: blur(20px);
    // backdrop-filter: blur(20px);
    // box-shadow: inset 0px 0px 25px #aaa;
    color: var(--text-color);
    background: linear-gradient(var(--main-color), var(--shadow-color));
    // box-shadow: inset 0px 5px 5px var(--highlight-color),
    //   inset 0px -5px 5px var(--background-color);
    border: 1px solid var(--main-color);

    &:hover {
      // background: #000;
      // box-shadow: none;
      // border: 1px solid #555;
      // color: #555;
      // background: linear-gradient(var(--shadow-color), var(--main-color));
      // box-shadow: inset 0px 5px 5px var(--background-color),
      // inset 0px -5px 5px var(--highlight-color);
      // opacity: 0.5;
      background: none;
      box-shadow: none;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
  }
}

.moveAboutBtn {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 0 50px 30px;
  text-decoration: underline;
}
</style>
