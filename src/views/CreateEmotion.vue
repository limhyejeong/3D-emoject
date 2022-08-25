<template>
  <h3>Create Emotion</h3>
  <InputView />
  <OutputEmotion />
</template>

<script>
import InputView from "./InputView.vue";
import OutputEmotion from "./OutputEmotion.vue";

export default {
  name: "CreateEmotion",
  components: { InputView, OutputEmotion },
  data() {
    return {};
  },
  methods: {},
};
</script>
