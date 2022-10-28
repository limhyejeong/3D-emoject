<template>
  <div class="createview">
    <InputView v-if="step <= 1" />
    <LoadingAnimation v-if="step == 3" />
    <OutputView v-if="step == 4" />
    <!-- <GltfSample /> -->
    <!-- <Anger /> -->
    <!-- <Fear /> -->
    <!-- <Anticipation /> -->
    <!-- <Sadness /> -->
    <!-- <Disgust /> -->
    <!-- <Joy /> -->
    <!-- <Surprise /> -->
    <!-- <Trust /> -->
  </div>
</template>

<script>
import InputView from "./InputEmoji.vue";
import OutputView from "./OutputView.vue";
import LoadingAnimation from "./LoadingAnimation.vue";
import TheCanvas from "./TheCanvas.vue";
import Anger from "@/components/homeview/sample/Anger-Cone.vue";
import Fear from "@/components/homeview/sample/Fear-Tetrahedron.vue";
import Anticipation from "@/components/homeview/sample/Anticipation-Dodecahedron.vue";
import Sadness from "@/components/homeview/sample/Sadness-Torus.vue";
import Disgust from "@/components/homeview/sample/Disgust-Octahedron.vue";
import Joy from "@/components/homeview/sample/Joy-Sphere.vue";
import Surprise from "@/components/homeview/sample/Surprise-Octahedron.vue";
import Trust from "@/components/homeview/sample/Trust-TorusKnot.vue";
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
