<template>
  <!-- <h3>Create Emotion</h3> -->
  <InputView />
  <TheCanvas />
  <!-- <OutputView /> -->
</template>

<script>
import InputView from "./InputView.vue";
import OutputView from "./OutputView three.vue";
import TheCanvas from "./TheCanvas.vue";

export default {
  name: "CreateView",
  components: { InputView, OutputView, TheCanvas },
};
</script>
