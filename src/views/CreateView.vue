<template>
  <!-- <InputView v-if="step <= 1" /> -->
  <!-- <LoadingAnimation v-if="step == 2" /> -->
  <!-- <OutputView v-if="step == 3" /> -->
  <GltfSample />
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
import GltfSample from "@/components/homeview/sample/GltfSample.vue";
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
    GltfSample,
  },
  setup() {
    const store = useInputStore();
    const { step } = storeToRefs(store);
    const { prevStep, nextStep } = store;

    return {
      store,
      prevStep,
      nextStep,
      step,
    };
  },
};
</script>
