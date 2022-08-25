<template>
  <Renderer ref="renderer" antialias orbit-ctrl resize="window">
    <Stats />
    <Camera :position="{ x: 100, y: 100, z: 200 }" />
    <Scene background="#fff">
      <PointLight :position="{ z: 50, y: 100, z: 100 }" />

      <InstancedMesh ref="imesh" :count="this.countValue">
        <SphereGeometry :radius="10" />
        <PhongMaterial color="#ffffff" />
      </InstancedMesh>

      <!-- <Box
        v-for="emotion in emotionArray"
        :key="emotion.id"
        :size="30"
        :position="{ x: emotion.num * 50, y: 0, z: 10 }"
      >
        <PhongMaterial />
      </Box> -->
    </Scene>
  </Renderer>
</template>

<script>
import Stats from "troisjs/src/components/misc/Stats";
import { Object3D, MathUtils } from "three";

export default {
  name: "UseImesh",
  props: ["emotionArray"],
  components: { Stats },
  mounted() {
    const renderer = this.$refs.renderer;
    const imesh = this.$refs.imesh.mesh;
    const dummy = new Object3D();
    const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

    console.log(this.countValue);

    for (let i = 0; i < this.countValue; i++) {
      dummy.position.set(rndFS(100), rndFS(100), rndFS(100));
      const scale = rnd(0.2, 1);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      imesh.setMatrixAt(i, dummy.matrix);
    }
    imesh.instanceMatrix.needsUpdate = true;

    // renderer.onInit(() => {
    //   renderer.renderFn = () => {
    //     renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    //     console.log(this.countValue);
    //   };
    // });

    renderer.onBeforeRender(() => {
      // console.log(this.countValue > 1);
      // console.log(this.emotionArray);
    });
  },

  methods: {},
};
</script>
