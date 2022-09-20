<template>
  <!-- <h3>Create Emotion</h3> -->
  <InputView />
  <!-- <TheCanvas /> -->
  <!-- <OutputView /> -->
  <Anger />
  <!-- <Anticipation /> -->
  <!-- <Sadness /> -->
</template>

<script>
import InputView from "./InputView.vue";
import OutputView from "./OutputView.vue";
import TheCanvas from "./TheCanvas.vue";
import Anger from "@/components/homeview/Anger.vue";
import Anticipation from "@/components/homeview/Anticipation.vue";
import Sadness from "@/components/homeview/Sadness.vue";

export default {
  name: "CreateView",
  components: {
    InputView,
    OutputView,
    TheCanvas,
    Anger,
    Anticipation,
    Sadness,
  },
};
</script>
