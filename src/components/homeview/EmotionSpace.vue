<template>
  <h1 v-show="isClick">
    {{ seletedEmotion.content }}
    <button v-show="isClick" @click="closeInfo">close</button>
  </h1>

  <Renderer ref="renderer" antialias orbit-ctrl resize="window">
    <Stats />
    <Camera :position="{ x: 100, y: 100, z: 100 }" />

    <!-- <Raycaster
      @pointerEnter="onPointerEvent"
      @pointerOver="onPointerOver"
      @pointerLeave="onPointerLeave"
      @click="onPointerClick"
    /> -->

    <Scene background="#fff">
      <PointLight :position="{ z: 100, y: 100, z: 100 }" />

      <Box
        v-for="emotion in emotionArray"
        :ref="setItemRef"
        :rotation="{ y: Math.PI / emotion.num, z: Math.PI / 4 }"
        :key="emotion.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{ x: emotion.num * 20, y: 0, z: 0 }"
        @click="boxClick(emotion)"
      >
        <PhongMaterial />
      </Box>

      <!-- <Box
        ref="emoBox"
        :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{ x: 0, y: 0, z: 0 }"
      >
        <PhongMaterial />
      </Box> -->
    </Scene>
  </Renderer>
</template>

<script>
import { onMounted, ref, onBeforeUpdate, onUpdated } from "vue";

import Stats from "troisjs/src/components/misc/Stats";
// import ViewInfo from "../components/ViewInfo.vue";

export default {
  name: "EmotionSpace",
  props: ["emotionArray"],
  setup() {
    const renderer = ref(null);
    renderer?.value?.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    let seletedEmotion = ref("");
    let isClick = ref(false);

    // emotionBox 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    // onBeforeUpdate(() => {
    //   itemRefs = [];
    // });
    // onUpdated(() => {
    //   console.log(itemRefs);
    // });

    // 오브제 클릭
    function boxClick(data) {
      isClick.value = true;
      seletedEmotion.value = data;
      console.log(this.seletedEmotion);
    }

    // 설명 닫기
    function closeInfo() {
      isClick.value = false;
    }

    onMounted(() => {
      renderer?.value?.onBeforeRender(() => {
        itemRefs.forEach((item) => {
          item.mesh.rotation.x += 0.01;
        });
        console.log("go");
      });
    });

    return {
      seletedEmotion,
      boxClick,
      isClick,
      closeInfo,
      renderer,
      setItemRef,
      itemRefs,
    };
  },
  data() {
    return {
      hover: false,
    };
  },
  components: { Stats },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
h1 {
  z-index: 10000;
}
</style>
