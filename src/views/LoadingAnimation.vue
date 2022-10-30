<template>
  <div>
    <span class="loadingText">Loading...</span>
    <Renderer ref="renderer" antialias resize="window">
      <Camera ref="camera" :position="{ x: 0, y: 0, z: 15 }" />

      <Scene ref="scene" background="#fff">
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
          :scale="{ x: 0.7, y: 0.7, z: 0.7 }"
          :tube="0.2"
          :tubularSegments="300"
          :radialSegments="50"
          :p="2"
          :q="7"
          :position="{ x: 0, y: 0, z: 0 }"
          :rotation="{ x: 0, y: 0, z: 0 }"
        >
          <!-- <LambertMaterial color="#5c47eb" /> -->
          <MatcapMaterial src="./assets/textures/matcap/은은.png" />
        </TorusKnot>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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
    let renderer = ref(null);
    let torus = ref(null);

    setTimeout(() => router.push("/output"), 500);

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
  font-size: 1.5rem;
  // color: var(--inactive-color);
  font-weight: 300;
  position: absolute;
  top: 60vh;
}
</style>
