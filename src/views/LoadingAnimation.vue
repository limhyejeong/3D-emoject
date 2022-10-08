<template>
  <span class="loadingText">Creating..🍳</span>
  <Renderer ref="renderer" antialias orbitCtrl resize="window">
    <Camera ref="camera" :position="{ x: 0, y: 0, z: 15 }" />

    <Scene ref="scene" background="#1a1a23">
      <AmbientLight
        color="#ffffff"
        :position="{ x: 10, y: 10, z: 10 }"
        :intensity="1"
      />
      <PointLight
        color="#ffffff"
        :position="{ x: 2, y: 2, z: 2 }"
        :intensity="1"
      />

      <TorusKnot
        ref="torus"
        :tube="0.2"
        :tubularSegments="100"
        :p="3"
        :q="5"
        :position="{ x: 0, y: 0, z: 0 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
      >
        <PhongMaterial color="#747c95" />
      </TorusKnot>
    </Scene>
  </Renderer>
</template>

<script>
import { ref, onMounted } from "vue";
// import { gsap } from "gsap";

import {
  Renderer,
  Camera,
  Scene,
  AmbientLight,
  PointLight,
  Box,
  TorusKnot,
  PhongMaterial,
} from "troisjs";

export default {
  name: "LoadingAnimation",
  components: {
    Renderer,
    Camera,
    Scene,
    AmbientLight,
    PointLight,
    Box,
    TorusKnot,
    PhongMaterial,
  },
  setup() {
    // setTimeout(() => router.go("/output"), 2000);

    let renderer = ref(null);
    let torus = ref(null);

    onMounted(() => {
      renderer.value.onBeforeRender(() => {
        // torus.value.mesh.rotation.x += 0.1;
        // torus.value.mesh.rotation.y += 0.1;
        torus.value.mesh.rotation.z += 0.05;

        // gsap.to(torus.value.mesh.rotation, {
        //   // x: 6.5,
        //   // y: 6.5,
        //   z: 3.7,
        //   duration: 2,
        // });
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
  font-size: 1.5rem;
  font-weight: 600;
  position: absolute;
  top: 65vh;
}
</style>
