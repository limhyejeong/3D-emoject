<template>
  <div class="test"></div>
  <h1 v-show="isClick">
    {{ seletedEmotion.content }}
    <button v-show="isClick" @click="closeInfo">close</button>
  </h1>

  <Renderer ref="renderer" antialias orbit-ctrl resize="window">
    <Stats />
    <Camera :position="{ x: 100, y: 100, z: 100 }" />

    <Raycaster ref="" @click="boxClick" />

    <Scene ref="scene" background="#fff">
      <PointLight :position="{ z: 100, y: 100, z: 100 }" />

      <Box
        v-for="els in etc"
        :ref="setItemRef"
        :rotation="{
          y: Math.PI / 4,
          z: Math.PI / 4,
        }"
        :key="els.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: Math.random() * 50,
          y: Math.random() * 50,
          z: Math.random() * 50,
        }"
      >
        <PhongMaterial />
      </Box>

      <Sphere
        v-for="joys in joy"
        :ref="setItemRef"
        :rotation="{
          y: Math.PI / 4,
          z: Math.PI / 4,
        }"
        :key="joys.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: Math.random() * 50,
          y: Math.random() * 50,
          z: Math.random() * 50,
        }"
      >
        <PhongMaterial />
      </Sphere>
    </Scene>
  </Renderer>
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUpdated } from "vue";
import {
  Renderer,
  Camera,
  Scene,
  PointLight,
  Box,
  PhongMaterial,
} from "troisjs";
import Stats from "troisjs/src/components/misc/Stats";
// import ViewInfo from "../components/ViewInfo.vue";

export default {
  name: "EmotionSpace",
  // props: ["emotionArray"],
  components: {
    Renderer,
    Camera,
    Scene,
    PointLight,
    Box,
    PhongMaterial,
    Stats,
  },
  setup() {
    const store = useHomeStore();
    const { joy, etc } = storeToRefs(store);
    const { fetchEmotions } = store;

    fetchEmotions();

    // console.log(joyEmotions, elseEmotions);

    const renderer = ref(null);
    renderer?.value?.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    let seletedEmotion = ref("");
    let isClick = ref(false);

    // emotionBox 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    // 오브제 클릭
    function boxClick(event) {
      // console.log(event.component.mesh.);
      // isClick.value = true;
      // seletedEmotion.value = data;
      // console.log(this.seletedEmotion);
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
        // console.log("go");
      });
    });

    onUpdated(() => {});

    return {
      seletedEmotion,
      boxClick,
      isClick,
      closeInfo,
      renderer,
      setItemRef,
      itemRefs,
      // fetchEmotions,
      joy,
      etc,
    };
  },
  data() {
    return {
      hover: false,
      // fetchEmotions : fetchEmotions,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
h1 {
  z-index: 10000;
}
</style>
