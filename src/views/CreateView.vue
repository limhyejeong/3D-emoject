<template>
  <!-- <h3>Create Emotion</h3> -->
  <InputView />
  <!-- <TheCanvas /> -->
  <OutputView />
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
import TheCanvas from "./TheCanvas.vue";
import Anger from "@/components/homeview/sample/Anger.vue";
import Fear from "@/components/homeview/sample/Fear.vue";
import Anticipation from "@/components/homeview/sample/Anticipation.vue";
import Sadness from "@/components/homeview/sample/Sadness.vue";
import Disgust from "@/components/homeview/sample/Disgust.vue";
import Joy from "@/components/homeview/sample/Joy.vue";
import Surprise from "@/components/homeview/sample/Surprise.vue";
import Trust from "@/components/homeview/sample/Trust.vue";

export default {
  name: "CreateView",
  components: {
    InputView,
    OutputView,
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
};
</script>
