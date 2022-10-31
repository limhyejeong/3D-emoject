<template>
  <div>
    <span class="loadingText">Loading...</span>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router/index";

export default {
  name: "LoadingAnimation",
  setup() {
    setTimeout(() => router.push("/output"), 500);

    onMounted(() => {});
    return {};
  },
};
</script>

<style lang="scss">
.loadingText {
  font-size: 1.5rem;
  // color: var(--inactive-color);
  font-weight: 300;
  position: absolute;
  top: 60vh;
}
</style>
