<template>
  <!-- <h3>Create Emotion</h3> -->
  <InputView v-if="category == 'none'" />
  <!-- <LoadingAnimation /> -->
  <OutputView v-if="category !== 'none'" />
  <!-- <Anger /> -->
  <!-- <Fear /> -->
  <!-- <Anticipation /> -->
  <!-- <Sadness /> -->
  <!-- <Disgust /> -->
  <!-- <Joy /> -->
  <!-- <Surprise /> -->
  <!-- <Trust /> -->
</template>

<script>
import InputView from "./InputView.vue";
import OutputView from "./OutputView.vue";
import LoadingAnimation from "./LoadingAnimation.vue";
import TheCanvas from "./TheCanvas.vue";
import Anger from "@/components/homeview/sample/Anger-Cone.vue";
import Fear from "@/components/homeview/sample/Fear.vue";
import Anticipation from "@/components/homeview/sample/Anticipation.vue";
import Sadness from "@/components/homeview/sample/Sadness.vue";
import Disgust from "@/components/homeview/sample/Disgust.vue";
import Joy from "@/components/homeview/sample/Joy.vue";
import Surprise from "@/components/homeview/sample/Surprise.vue";
import Trust from "@/components/homeview/sample/Trust.vue";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";

export default {
  name: "CreateView",
  components: {
    InputView,
    OutputView,
    LoadingAnimation,
    TheCanvas,
    Anger,
    Fear,
    Anticipation,
    Sadness,
    Disgust,
    Joy,
    Surprise,
    Trust,
  },
  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity, create, step } =
      storeToRefs(store);
    const { prevStep, nextStep } = store;

    return {
      store,
      name,
      emoji,
      content,
      category,
      activity,
      create,
      prevStep,
      nextStep,
      step,
    };
  },
};
</script>
