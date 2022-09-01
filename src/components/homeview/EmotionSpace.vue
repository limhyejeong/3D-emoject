<template>
  <aside v-show="isClick" class="info">
    <!-- <div>{{ seletedEmotion.num }}<div> -->
    <div class="infoNum">{{ seletedEmotion.num }}th Emoject</div>
    <div class="infoName">{{ seletedEmotion.name }}</div>
    <div class="infoEmoji">{{ seletedEmotion.emoji }}</div>
    <p class="infoContent">{{ seletedEmotion.content }}</p>

    <button @click="closeInfo">close</button>
  </aside>

  <Renderer ref="renderer" antialias orbitCtrl resize="window">
    <Stats />
    <Camera
      ref="camera"
      :position="{ x: 100, y: 100, z: 100 }"
      :lookAt="{ x: 0, y: 0, z: 0 }"
    />

    <!-- <Raycaster ref="" @click="boxClick" /> -->

    <Scene ref="scene" background="#000">
      <PointLight :position="{ z: 200, y: 200, z: 200 }" />

      <Box
        v-for="els in etc"
        :ref="setItemRef"
        :key="els.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        @click="boxClick(els)"
      >
        <PhongMaterial />
      </Box>

      <!-- <Sphere
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
        @click="boxClick(joys)"
      >
        <PhongMaterial />
      </Sphere> -->
    </Scene>
  </Renderer>
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { ref, onUpdated, onMounted } from "vue";
import { gsap } from "gsap";
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
    const renderer = ref(null);
    const camera = ref(null);
    let seletedEmotion = ref("");
    let isClick = ref(false);
    // gsap.registerPlugin(on);

    // emotionBox 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    fetchEmotions();

    // 오브제 클릭
    function boxClick(data) {
      if (isClick.value == false) {
        isClick.value = true;
        seletedEmotion.value = data;
      }
    }

    // 설명 닫기
    function closeInfo() {
      isClick.value = false;
    }

    onMounted(() => {
      renderer.value.onBeforeRender(() => {
        gsap.to(camera.value.camera.position, {
          z: 200,
          duration: 1.5,
          onUpdate: function () {
            // console.log(camera.value.position);
          },
        });

        // itemRefs.forEach((item) => {
        //   item.mesh.rotation.x += 0.01;
        // });
      });
    });

    onUpdated(() => {});

    return {
      seletedEmotion,
      boxClick,
      isClick,
      closeInfo,
      renderer,
      camera,
      setItemRef,
      itemRefs,
      joy,
      etc,
    };
  },
  data() {
    return {
      hover: false,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.info {
  padding: 30px;
  background: #171a1f;
  color: #fff;
  border-radius: 10px;
  box-shadow: inset -12px -8px 20px #000;
  // box-shadow: inset 6px 4px 16px #888;
  z-index: 10000;

  .infoNum {
    font-size: 2rem;
    font-weight: 900;
  }

  .infoName {
    font-size: 0.9rem;
  }
}
</style>
