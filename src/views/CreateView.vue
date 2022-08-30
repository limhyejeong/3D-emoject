<template>
  <h3>Create Emotion</h3>
  <InputView />
  <OutputView />
</template>

<script>
import InputView from "./InputView.vue";
import OutputView from "./OutputView.vue";

export default {
  name: "CreateView",
  components: { InputView, OutputView },
  data() {
    return {};
  },
  methods: {},
};
</script>
