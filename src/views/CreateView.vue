<template>
  <!-- <h3>Create Emotion</h3> -->
  <InputView />
  <!-- <TheCanvas /> -->
  <!-- <OutputView /> -->
  <!-- <Anger /> -->
  <!-- <Anticipation /> -->
  <!-- <Sadness /> -->
  <!-- <Disgust /> -->
  <!-- <Joy /> -->
  <!-- <Fear /> -->
  <!-- <Surprise /> -->
  <Trust />
</template>

<script>
import InputView from "./InputView.vue";
import OutputView from "./OutputView.vue";
import TheCanvas from "./TheCanvas.vue";
import Anger from "@/components/homeview/Anger.vue";
import Anticipation from "@/components/homeview/Anticipation.vue";
import Sadness from "@/components/homeview/Sadness.vue";
import Disgust from "@/components/homeview/Disgust.vue";
import Joy from "@/components/homeview/Joy.vue";
import Fear from "@/components/homeview/Fear.vue";
import Surprise from "@/components/homeview/Surprise.vue";
import Trust from "@/components/homeview/Trust.vue";

export default {
  name: "CreateView",
  components: {
    InputView,
    OutputView,
    TheCanvas,
    Anger,
    Anticipation,
    Sadness,
    Disgust,
    Joy,
    Fear,
    Surprise,
    Trust,
  },
};
</script>
