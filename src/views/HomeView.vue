<template>
  <EmotionSpace />

  <aside class="moveCreateBtn">
    <router-link to="/create">+ Create Emotion</router-link>
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
    // background: #fff;
    // color: #000;
    border: none;
    border-radius: 50px;
    padding: 20px 50px;
    margin-bottom: 30px;
    transition: 0.25s;
    font-size: 1.5rem;
    font-weight: 500;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    box-shadow: inset 0px 0px 25px #aaa;
    color: #eee;

    &:hover {
      box-shadow: none;
      border: 1px solid #363c46;
      color: #363c46;
    }
  }
}
</style>
