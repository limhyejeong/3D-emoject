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
    background: #fff;
    color: #000;
    border: none;
    border-radius: 50%;
    padding: 15px 30px;
    margin-bottom: 30px;
    transition: 0.25s;
    font-weight: 700;
  }
  :hover {
    background: #aaa;
  }
}
</style>
