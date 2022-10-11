<template>
  <span class="loadingText">Loading...</span>
  <Renderer ref="renderer" antialias resize="window">
    <Camera ref="camera" :position="{ x: 0, y: 0, z: 15 }" />

    <Scene ref="scene" background="#1a1a23">
      <AmbientLight
        color="#ffffff"
        :position="{ x: 10, y: 10, z: 10 }"
        :intensity="1"
      />
      <PointLight
        color="hotpink"
        :position="{ x: 2, y: 2, z: 2 }"
        :intensity="1"
      />

      <TorusKnot
        ref="torus"
        :scale="{ x: 2, y: 2, z: 2 }"
        :tube="0.2"
        :tubularSegments="300"
        :radialSegments="50"
        :p="2"
        :q="5"
        :position="{ x: 0, y: 0, z: 0 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
      >
        <!-- <LambertMaterial color="#5c47eb" /> -->
        <MatcapMaterial name="312C34_A2AAB3_61656A_808494" />
      </TorusKnot>
    </Scene>
  </Renderer>
</template>

<script>
import { ref, onMounted } from "vue";
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
import router from "@/router/index";

import {
  Renderer,
  Camera,
  Scene,
  AmbientLight,
  PointLight,
  TorusKnot,
  MatcapMaterial,
} from "troisjs";

export default {
  name: "LoadingAnimation",
  components: {
    Renderer,
    Camera,
    Scene,
    AmbientLight,
    PointLight,
    TorusKnot,
    MatcapMaterial,
  },
  setup() {
    const store = useInputStore();
    const { step } = storeToRefs(store);

    setTimeout(() => router.go(step.value++), 2500);

    let renderer = ref(null);
    let torus = ref(null);

    onMounted(() => {
      renderer.value.onBeforeRender(() => {
        torus.value.mesh.rotation.z += 0.03;
      });
    });
    return {
      renderer,
      torus,
    };
  },
};
</script>

<style lang="scss">
.loadingText {
  font-size: 2rem;
  // color: var(--inactive-color);
  font-weight: 500;
  position: absolute;
  // top: 64vh;
}
</style>
