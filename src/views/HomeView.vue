<template>
  <!-- <TroisjsCom v-bind:countValue="this.count" v-if="this.count > 1" /> -->
  <EmotionSpace />
  <!-- <EmotionSpace v-bind:emotionArray="this.emotions" /> -->
</template>

<script>
import EmotionSpace from "../components/homeview/EmotionSpace.vue";
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
// import emoColRef from "../firebase";
// import { getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "HomeView",
  components: {
    EmotionSpace,
  },
  methods: {
    // async deleteEmotion(emotionId) {
    //   let emoRef = doc(emoColRef, emotionId);
    //   await deleteDoc(emoRef);
    //   alert("emotion deleted successully");
    //   this.$router.go();
    // },
  },
};
</script>

<style lang="scss">
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  // height: 100vh;
}
</style>
